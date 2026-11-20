# Deploy ke Dokploy

Status per 20 Nov 2026: **BELUM ADA DEPLOY.** Agent devops tidak punya akses Dokploy maupun Cloudflare (tidak ada
API/token/MCP). Semua langkah di bawah dikerjakan manual oleh user lewat UI. Domain belum ditentukan.

## 0. Status verifikasi (jujur)

| Item | Status | Bukti |
|---|---|---|
| `pnpm build` (tsc -b + vite build) | VERIFIED | exit 0, dibuat ulang 21:3x, output `dist/` |
| `pnpm preview`: `/`, asset hash, `/favicon.svg` | VERIFIED | HTTP 200 dengan tipe MIME benar |
| Isi `dist/index.html`: asal eksternal, inline script, JSON-LD | VERIFIED | hanya 1 inline `<script type="application/ld+json">` (valid JSON, `@type: Person`), 0 `<style>`/`style=`, tanpa Google Fonts |
| `Dockerfile` | **UNVERIFIED** | Lihat di bawah |
| `nginx.conf` + `nginx-security-headers.conf` | **UNVERIFIED** | Lihat di bawah |
| Health check `/healthz` | **UNVERIFIED** | Lihat di bawah |
| `.github/workflows/ci.yml` | **UNVERIFIED** | Belum pernah jalan di GitHub; hanya perintahnya (`pnpm lint`, `pnpm build`) yang sudah dicoba lokal |

Catatan tentang "UNVERIFIED" untuk Docker: atas perintah user, semua perintah Docker dihentikan, jadi file
Dockerfile/nginx tidak dianggap lulus verifikasi. Yang sempat terjadi sebelum dihentikan, hanya sebagai informasi
dan **bukan bukti lulus**:
- `docker build` sempat selesai (exit 0) dan `nginx -t` di dalam container bilang syntax ok. Itu pada versi
  Dockerfile sebelum `HEALTHCHECK` dihapus dan sebelum frontend menambah poster/robots/sitemap.
- `curl` ke container sempat menunjukkan: `/` 200 + header keamanan, asset hash `Cache-Control: immutable`, `/healthz`
  200, `/tentang` dan path dalam 200 (SPA fallback), `/assets/missing.js` 404, gzip aktif.
- `HEALTHCHECK` bawaan Dockerfile melaporkan `unhealthy` (timeout 3s), dan `docker exec` apa pun menggantung di
  Docker Desktop mesin ini. Penyebabnya tidak sempat didiagnosis (kemungkinan masalah exec Docker Desktop, bukan
  nginx, karena curl dari host jalan). `HEALTHCHECK` lalu dihapus dari Dockerfile.
- Container `rp-test` dan `rp-hc` yang saya buat: perintah `docker rm -f` sempat timeout karena Docker Desktop
  menggantung. **Cek manual dan bersihkan:** `docker ps -a | grep rp-` lalu `docker rm -f rp-test rp-hc`
  (kalau tidak mau repot, restart Docker Desktop).

Cara memverifikasi sendiri sebelum deploy (opsional, di mesin yang Docker-nya sehat):
```
docker build -t reza-portfolio:test .
docker run --rm -p 8080:80 reza-portfolio:test
curl -I localhost:8080/            # 200, Cache-Control: no-cache
curl -I localhost:8080/healthz     # 200
curl -I localhost:8080/tentang     # 200 (SPA fallback)
curl -I localhost:8080/assets/x.js # 404
```

## 1. Prasyarat

- Repo sudah ada di GitHub dan branch `main` sudah dipush (agent tidak melakukan `git push`).
- Dockerfile, nginx.conf, nginx-security-headers.conf ada di root repo (sudah).
- Domain yang akan dipakai: **BELUM DIKETAHUI.** Tanya user. Jangan pakai domain tebakan.
- Env var: **tidak ada yang dibutuhkan.** Situs statis, tidak ada secret, tidak ada `VITE_*` yang dibaca saat build.
  Kalau frontend menambah `import.meta.env.VITE_*`, itu tertanam saat build dan harus dikirim sebagai Build Args.

## 2. Dokploy: buat aplikasi (klik demi klik)

1. Login ke panel Dokploy.
2. **Projects** -> **Create Project** (atau pilih project yang ada), nama misalnya `Portfolio`.
3. Di dalam project: **Create Service** -> **Application**. Nama: `reza-portfolio`. **Create**.
4. Tab **General** -> **Provider**:
   - Pilih **GitHub** (kalau belum ada, hubungkan GitHub App dulu di Settings -> Git).
   - Repository: pilih repo portfolio. Branch: `main`. Build Path: `/`.
   - **Save**.
5. Tab **General** -> **Build Type**:
   - Pilih **Dockerfile**.
   - Dockerfile Path: `Dockerfile`. Docker Context Path: `.`. Docker Build Stage: kosongkan.
   - **Save** (wajib; kalau lupa, Dokploy tetap pakai Nixpacks).
6. Tab **Environment**: biarkan kosong.
7. Tab **Domains** -> **Add Domain**:
   - Host: domain yang sudah ditentukan user.
   - Path: `/`. **Container Port: `80`**. HTTPS: **ON**. Certificate: **Let's Encrypt**.
   - Create.
   - Jangan isi Advanced -> Ports.
8. Kembali ke **General** -> klik **Deploy**. Pantau di tab **Deployments** -> View log sampai status `done`.
9. Kalau domain diubah setelah deploy, klik **Deploy** lagi supaya router Traefik diperbarui.

Catatan: jangan pakai Build Type Static atau Nixpacks. Dockerfile sudah mengatur nginx (fallback SPA, cache, header).

## 3. Cloudflare DNS

Zona domain ada di Cloudflare (sesuai pola proyek rizka-compro). Cek dulu domainnya memang ada di Cloudflare.

1. Cloudflare dashboard -> pilih zona -> **DNS** -> **Records** -> **Add record**.
2. Subdomain (mis. `portfolio.domain.com`): Type **A**, Name `portfolio`, IPv4 = IP publik server Dokploy
   (lihat di Dokploy -> Settings -> Server, atau IP VPS). Apex domain: Name `@`, tipe A yang sama.
   Boleh juga CNAME ke hostname server yang sudah punya A record.
3. **Proxy status: DNS only (awan abu-abu) selama sertifikat belum terbit.** Awan oranye membuat tantangan
   HTTP-01 Let's Encrypt gagal.
4. Tunggu DNS menyebar, cek: `dig +short <domain>` harus menampilkan IP server (bukan 104.21.x / 172.67.x).
5. Setelah `https://<domain>` valid (sertifikat Let's Encrypt terbit), baru boleh nyalakan awan oranye.
   SSL/TLS mode Cloudflare harus **Full (strict)**, **jangan Flexible** (menyebabkan redirect loop).
6. Port 80 dan 443 di firewall VPS harus terbuka.

## 4. Health check dan verifikasi cepat setelah deploy

Endpoint: `GET /healthz` -> `200 ok`, tanpa cache, tanpa access log.

Dokploy Application tidak punya kolom health check HTTP yang selalu tersedia di semua versi. Cek manual:
```
curl -s -m 45 -o /dev/null -w '%{http_code}\n' https://<domain>/healthz
curl -sI -m 45 https://<domain>/
curl -sI -m 45 https://<domain>/tentang          # 200 (fallback SPA)
curl -sI -m 45 https://<domain>/assets/x.js      # 404
```
Gunakan `-m 45`: 504 dari Traefik muncul sekitar 30 detik, timeout lebih pendek menyembunyikannya.
Kalau memakai versi Dokploy dengan kolom health check (Advanced -> Cluster / Swarm -> Health Check), pakai
`wget -q -O /dev/null http://127.0.0.1/healthz`.

Kalau 504 / 502:
1. Domains -> Container Port harus `80`.
2. Deployments -> status terakhir `done`, bukan `error`.
3. Logs runtime: nginx harus menyala tanpa error.
4. DNS dan awan oranye (lihat bagian 3).

## 5. Rollback

- Cara cepat: tab **Deployments** -> pilih deployment lama yang berstatus `done` -> **Rollback** (tersedia bila
  fitur Rollback aktif di Advanced -> Rollbacks).
- Cara lewat git: `git revert <sha>` di `main`, push, lalu Deploy ulang.
- Hindari **Restart**: memakai image lama dan tidak mengambil commit baru.

## 6. Keamanan header dan keputusan CSP

Semua header ada di `nginx-security-headers.conf` dan di-include di tiap `location` (nginx membuang `add_header`
dari server block begitu sebuah location punya `add_header` sendiri, maka disatukan di snippet).

- `script-src 'self'`: tanpa `unsafe-inline`. Inline `<script type="application/ld+json">` di `index.html` adalah
  blok data, bukan script yang dieksekusi, jadi tidak diblokir CSP. **Bila frontend menambah inline script yang
  dieksekusi, tambahkan hash `sha256-...` ke `script-src`, jangan `unsafe-inline`.** Minta lewat comms.
- `style-src 'self' 'unsafe-inline'`: framer-motion menulis atribut `style` saat runtime (diperlukan).
- `media-src 'self' https://d8j0ntlcm91z4.cloudfront.net`: video hero masih hotlink ke pihak ketiga. Hapus origin ini
  setelah video di-self-host.
- `fonts.googleapis.com` dan `fonts.gstatic.com` diizinkan, tapi **saat ini tidak dipakai**: `src/index.css` hanya
  menyebut "Inter" tanpa `@font-face` atau `<link>`, jadi di perangkat tanpa Inter terpasang akan jatuh ke
  font sistem. Kalau font tetap lokal, hapus dua origin itu dari CSP. Tanya frontend/uiux.
- `img-src` mengizinkan `https://images.unsplash.com` dan `data:` (noise SVG di CSS memakai data URI). Hapus Unsplash
  kalau tidak dipakai.
- `X-Frame-Options: DENY` dan `frame-ancestors 'none'`: situs tidak boleh di-embed.
- Header lain: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy` (kamera, mikrofon, geolokasi, dll. dimatikan).
- Tidak ada HSTS di nginx. Biarkan Cloudflare/Traefik yang mengaturnya setelah HTTPS stabil, supaya salah konfigurasi
  tidak mengunci domain.
- Brotli tidak tersedia di image `nginx:alpine`; hanya gzip yang aktif.

## 7. Checklist setelah deploy

- [ ] `curl -sI https://<domain>/` -> 200, ada CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- [ ] `curl -sI https://<domain>/assets/<file>.js` -> `Cache-Control: public, max-age=31536000, immutable`.
- [ ] `/healthz` -> 200; `/tentang` -> 200; `/assets/nope.js` -> 404.
- [ ] Buka situs di browser dengan DevTools Console terbuka: **tidak ada pelanggaran CSP** (video hero, poster, font).
- [ ] Hero video memutar dari cloudfront (cek tab Network).
- [ ] Lighthouse mobile (Chrome DevTools -> Lighthouse, mode Mobile, Incognito): target performa >= 90, aksesibilitas
      >= 95. Video hero 16 MB adalah risiko utama.
- [ ] Pratinjau OG: tempel URL ke https://opengraph.xyz atau Facebook Sharing Debugger / LinkedIn Post Inspector.
      Perlu `og:image` berupa URL absolut dan `og:url`/`canonical` berisi domain asli.
- [ ] **`index.html` saat ini memakai `https://example.com/` untuk `canonical` dan `og:url`** (juga di
      `public/sitemap.xml` dan `public/robots.txt`). Domain asli harus diganti oleh agent `frontend` sebelum go-live.
      Belum ada tag `og:image` (ada TODO di index.html); tanpa itu pratinjau OG tidak punya gambar.
- [ ] Setelah HTTPS stabil: nyalakan awan oranye Cloudflare (Full strict) dan ulangi curl di atas.

## 8. Catatan performa: video hero 16 MB (hotlink pihak ketiga)

Video hero diambil dari `d8j0ntlcm91z4.cloudfront.net`, milik pihak ketiga (URL bisa mati atau diblokir kapan saja,
dan 16 MB memukul skor mobile). Rekomendasi setelah user menyetujui video itu dipakai:

1. Self-host: taruh di `public/video/` (nginx menyajikannya dengan cache 1 hari).
2. Kompres: ffmpeg **belum terpasang** di Mac ini (`brew install ffmpeg`), lalu contoh:
   ```
   ffmpeg -i hero.mp4 -vf "scale=-2:1080" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart hero.mp4.out.mp4
   ffmpeg -i hero.mp4 -vf "scale=-2:1080" -c:v libvpx-vp9 -crf 34 -b:v 0 -an hero.webm
   ```
   Target 6-8 MB per berkas, tanpa audio. Sajikan `<source>` webm lebih dulu, lalu mp4.
3. Pertahankan poster (sudah ada `hero-poster-*.jpg`), `preload="metadata"`, dan jangan autoplay pada
   `prefers-reduced-motion` / `saveData`.
4. Setelah self-host: hapus `https://d8j0ntlcm91z4.cloudfront.net` dari `media-src` di
   `nginx-security-headers.conf`.
