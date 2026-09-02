#!/usr/bin/env bash
# Deploy Arenda City Next.js on supabase-arendacity server.
# Does NOT touch Supabase/Postgres — only builds and runs the web container.
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/arenda-city-web}"
REPO_URL="${REPO_URL:-https://github.com/EVERLIV/arenda-city-irk.git}"
BRANCH="${BRANCH:-master}"
DOMAIN="${DOMAIN:-arendacity.ru}"

echo "==> App directory: $APP_DIR"
mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [ -f Dockerfile ] && [ -f deploy/docker-compose.yml ]; then
  echo "==> Using existing application files."
elif [ -d .git ]; then
  echo "==> Pulling latest code..."
  git fetch origin
  git checkout "$BRANCH"
  git pull origin "$BRANCH"
else
  echo "==> Cloning repository..."
  git clone --branch "$BRANCH" "$REPO_URL" .
fi

if [ ! -f deploy/.env ]; then
  echo "ERROR: deploy/.env not found. Copy deploy/.env.production.example to deploy/.env and fill values."
  exit 1
fi

echo "==> Building and starting web container..."
cd deploy
docker compose build --pull
docker compose up -d --remove-orphans

echo "==> Container status:"
docker compose ps

if command -v nginx >/dev/null 2>&1; then
  NGINX_CONF="/etc/nginx/sites-available/arenda-city"
  if [ ! -f "$NGINX_CONF" ]; then
    echo "==> Installing nginx site config for $DOMAIN..."
    sed "s/DOMAIN/$DOMAIN/g" nginx/arenda-city.conf > /tmp/arenda-city.conf
    cp /tmp/arenda-city.conf "$NGINX_CONF"
    ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/arenda-city
    nginx -t && systemctl reload nginx
    echo "==> Nginx configured. Run certbot for SSL: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
  else
    echo "==> Nginx config already exists, skipping."
  fi
fi

echo "==> Done. Site should be on http://127.0.0.1:3000 (via nginx: $DOMAIN)"
