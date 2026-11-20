# syntax=docker/dockerfile:1

# ---- build stage: Vite -> /app/dist -------------------------------------
FROM node:22-alpine AS build
ARG PNPM_VERSION=10.30.2
WORKDIR /app

# package.json has no "packageManager" field, so pin pnpm here (lockfile v9).
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Dependency layer: only re-runs when the manifest or lockfile changes.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
# "build" = tsc -b && vite build
RUN pnpm build

# ---- runtime stage: nginx serving static files --------------------------
FROM nginx:1.27-alpine AS runtime

# Replace the stock config entirely (see nginx.conf for SPA fallback, cache,
# gzip, security headers, /healthz).
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html

# nginx master runs as root only to bind :80; worker processes run as the
# unprivileged "nginx" user (see `user nginx;` in nginx.conf).
EXPOSE 80

# No HEALTHCHECK on purpose: the one tried earlier reported "unhealthy"
# (timeout) under Docker Desktop and the cause was never diagnosed. Use the
# Dokploy-side health check against /healthz instead (docs/DEPLOY.md).

CMD ["nginx", "-g", "daemon off;"]
