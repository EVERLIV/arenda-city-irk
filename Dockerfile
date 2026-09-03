FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Timeweb/App Platform may run npm ci; keep install fallback for lock drift
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN mkdir -p data && chown -R nextjs:nodejs data

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
