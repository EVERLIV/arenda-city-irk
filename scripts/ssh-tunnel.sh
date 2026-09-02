#!/usr/bin/env bash
# SSH tunnel to self-hosted Supabase Postgres on Timeweb
# Usage:
#   ./scripts/ssh-tunnel.sh
# Then:
#   npm run db:introspect

set -euo pipefail

SSH_HOST="${SSH_HOST:?Set SSH_HOST}"
SSH_USER="${SSH_USER:?Set SSH_USER}"
SSH_PORT="${SSH_PORT:-22}"
SSH_IDENTITY_FILE="${SSH_IDENTITY_FILE:-}"
LOCAL_PORT="${SSH_LOCAL_DB_PORT:-54322}"
REMOTE_DB_HOST="${SSH_REMOTE_DB_HOST:-127.0.0.1}"
REMOTE_DB_PORT="${SSH_REMOTE_DB_PORT:-5432}"

ARGS=(-N -L "${LOCAL_PORT}:${REMOTE_DB_HOST}:${REMOTE_DB_PORT}" -p "${SSH_PORT}" -o ExitOnForwardFailure=yes -o ServerAliveInterval=30)

if [[ -n "${SSH_IDENTITY_FILE}" ]]; then
  ARGS+=(-i "${SSH_IDENTITY_FILE}")
fi

ARGS+=("${SSH_USER}@${SSH_HOST}")

echo "SSH tunnel: localhost:${LOCAL_PORT} -> ${REMOTE_DB_HOST}:${REMOTE_DB_PORT} via ${SSH_USER}@${SSH_HOST}:${SSH_PORT}"
echo "Keep this terminal open. DATABASE_URL should use port ${LOCAL_PORT}."
echo

exec ssh "${ARGS[@]}"
