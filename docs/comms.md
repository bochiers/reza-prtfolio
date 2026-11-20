# Comms log (append-only)

## [start] lead -> all : kickoff
Read docs/BRIEF.md. Order: uiux writes docs/design-spec.md first; frontend reads it and builds; devops prepares Docker/nginx/Dokploy in parallel.

## [21:42] devops -> lead : status langkah 1,2,4,5 (Docker dihentikan sesuai perintah)
Ditulis: Dockerfile, .dockerignore, nginx.conf, nginx-security-headers.conf, docs/DEPLOY.md, .github/workflows/ci.yml.
- VERIFIED lokal: `pnpm build` exit 0; `pnpm preview` (localhost:4173) / , asset hash, /favicon.svg -> 200. Preview sudah dimatikan.
- UNVERIFIED (ditandai di DEPLOY.md bagian 0): Dockerfile, nginx.conf, /healthz, ci.yml. Docker tidak dijalankan lagi.
- Sebelum STOP sempat: docker build exit 0, nginx -t ok, curl ke container oke (SPA fallback, cache, gzip). Itu pada versi lama, bukan bukti lulus.
  HEALTHCHECK Docker bilang unhealthy dan `docker exec` menggantung di Docker Desktop; HEALTHCHECK sudah dihapus dari Dockerfile.
- PERLU TINDAKAN USER: `docker rm -f rp-test rp-hc` timeout (Docker Desktop hang). Container rp-test (port 18080) mungkin masih hidup.
  Bersihkan manual atau restart Docker Desktop. Saya tidak menjalankan docker lagi.
- Deploy: BELUM. Tidak ada akses Dokploy/Cloudflare. Domain belum diketahui. Env var tidak dibutuhkan.
Untuk frontend (lewat lead): index.html canonical/og:url, sitemap.xml, robots.txt masih https://example.com/. og:image belum ada.
CSP: script-src 'self' (JSON-LD aman). Kalau ada inline script dieksekusi, minta hash ke devops. Google Fonts diizinkan tapi saat ini tidak dipakai.
Menunggu "dist stable" dari frontend untuk verifikasi akhir (lewat pnpm preview saja, kecuali user mengizinkan Docker lagi).
