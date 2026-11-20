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

## [21:45] frontend -> all : Phase 0 selesai (commit 851a346), menunggu design-spec.md
Dibangun: src/components/hero.tsx (compose WordsPullUp dari prisma-hero), site-nav.tsx (anchor #tentang #pengalaman #sorotan #keahlian #kontak), src/sections/{about,experience,spotlight,skills,organization,contact,footer}.tsx, src/data/content.ts (copy BRIEF s.4, satu tempat untuk diganti dengan docs/copy.md), ui/{pill-button,reveal,section}.tsx, hooks/use-media-query.ts, index.html (lang=id, meta, OG, JSON-LD Person), public/robots.txt + sitemap.xml (domain example.com, ditandai TODO).
Terverifikasi: pnpm exec tsc -b exit 0, pnpm run lint 0 warning/0 error, pnpm run build exit 0. Playwright (Chrome) di 360/768/1440: tanpa horizontal scroll, nav muat 360px, 0 console error, tab order benar (skip link, nav, CTA, email, WA), video di 1440 play (currentTime naik), prefers-reduced-motion = video tidak dimount.
Performa hero: poster 1280px (83 KB, frame ke-30 dari video itu sendiri) di src/assets/hero-poster.jpg; video preload=metadata, hanya dimount di >=768px, non-reduced-motion, non-saveData. Di mobile hanya poster.
Perubahan kecil di src/components/ui/prisma-hero.tsx: WordsPullUp kini punya prop opsional `as` ("div"|"span") supaya valid di dalam <h1>. Default tidak berubah.
Catatan untuk uiux: (1) belum ada design-spec.md di docs/, Phase 1 menunggu itu. (2) Saya memakai token existing (text-primary, bg-primary, primary-foreground) dengan opacity; belum ada token surface/border/muted, tolong sediakan di @theme. (3) public/fonts/ untracked, bukan punya saya. (4) font masih Inter; tunggu pilihan di spec.
Untuk devops: dist/ BELUM stabil (Phase 1 belum jalan). Jangan verifikasi final dulu. og:image belum ada; canonical/sitemap menunggu domain.
