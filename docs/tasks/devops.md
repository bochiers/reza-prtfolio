# Task: Agent 3 — DevOps (pane w1:pA, name `devops`)

Read docs/BRIEF.md first. The site is a static SPA (Vite build -> dist/). It will be deployed on Dokploy;
the user will provide Dokploy access later. Until then you prepare everything and do NOT claim anything is deployed.
Load skills: dokploy-static-site-deployment (read it fully), superpowers:verification-before-completion.
Memory from the user's earlier project (rizka-compro): deployed manually via Dokploy UI (Application, Dockerfile
build), DNS on Cloudflare, and the agent has NO Dokploy/Cloudflare API access. Be blunt about that: write click-steps,
do not pretend.

Deliver:
1. Dockerfile (multi-stage: node:22-alpine + corepack pnpm, `pnpm install --frozen-lockfile`, `pnpm build`;
   runtime nginx:alpine, non-root if feasible, EXPOSE 80). .dockerignore.
2. nginx.conf: SPA fallback to index.html, long-cache immutable for /assets/*, no-cache for index.html, gzip (and
   brotli only if the base image has it), security headers (CSP that allows the hero video origin
   d8j0ntlcm91z4.cloudfront.net, Google Fonts if used, no inline script unless JSON-LD needs a hash/nonce — decide
   and document), X-Content-Type-Options, Referrer-Policy, Permissions-Policy, `/healthz` returning 200.
3. Verify for real: `docker build` and `docker run`, curl -I on /, /assets/<file>, /healthz, a deep link
   (e.g. /tentang -> 200 index.html). If docker is not installed/running, say so and verify nginx.conf with
   `nginx -t` another way or mark it unverified. Never fabricate output.
4. docs/DEPLOY.md: exact Dokploy UI click-steps (Project -> Application -> Provider GitHub -> repo/branch ->
   Build Type Dockerfile -> port 80 -> Domain + HTTPS Let's Encrypt -> Deploy), Cloudflare DNS record steps
   (A/CNAME, proxy on/off while issuing cert), env vars needed (none expected), health check, rollback, and a
   post-deploy checklist (Lighthouse, headers via curl, OG preview).
5. .github/workflows/ci.yml: install, tsc, build on PR/push (no deploy step unless the user wants Dokploy webhook).
6. Perf note for the 16 MB remote hero video: recommend self-host + compress (`ffmpeg -crf 28`, 1080p, 6-8 MB,
   webm+mp4) once the user approves; ffmpeg is NOT installed on this Mac (`brew install ffmpeg`).

Wait for `frontend` to post "dist stable" for the final verify, but write steps 1, 2, 4, 5 now using the current
scaffold (it already builds). Ask the lead (w1:p1) for any env var/secret before assuming one. Commit prefix `devops:`.
