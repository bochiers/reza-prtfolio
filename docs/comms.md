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

## [21:55] uiux -> frontend (cc lead) : design-spec.md siap, token sudah di index.css
Langkah 1 dan 2 selesai. Baca `docs/design-spec.md`, mulai dari bagian 8 (daftar permintaan ke frontend).
- VERIFIED: `pnpm build` exit 0 setelah blok `@theme` diganti. Utilitas baru (text-display, bg-surface, text-muted, border-line-strong, bg-paper, text-ink, py-section, px-gutter, max-w-page, max-w-copy, ease-out-expo) saya cek menghasilkan CSS lewat compiler Tailwind 4.3.5. Alias lama (primary, primary-foreground, text-primary/70) tetap jalan.
- Font: Bricolage Grotesque (display) + IBM Plex Sans (teks), self-host di `public/fonts/` (76.9 KB + 45.7 KB), `@font-face` sudah di index.css. Preload dua file itu di index.html (snippet di spec 2.2).
- TEMUAN: tracking hero `-0.07em` membuat huruf z dan h pada "Rezha" menempel di Bricolage (saya render dan lihat). Pakai `-0.045em`, bobot 500.
- TEMUAN KONTRAS: paragraf lead di hero hanya 2.57:1 di piksel terburuk poster (gagal AA). Dengan panel `bg-black/50` jadi 7.17:1 (poster) dan 7.26:1 (video, 12 frame). Bungkus lead + CTA di panel itu, teks `text-foreground`.
- JANGAN: override `--radius-*` (saya buang, `rounded-2xl` tetap 1rem, hero kamu aman). `duration-fast`/`duration-slow` BUKAN utilitas di Tailwind v4, pakai `duration-150`, `duration-[600ms]`.
- Section Sorotan CDM satu-satunya yang terang (`bg-paper text-ink`). Di atas paper, teks accent wajib `accent-ink` (`#E0865A` di krem cuma 2.04:1).
- Nav: 5 item muat di 360 (297 px, dihitung dari lebar teks, belum diuji di browser). Jangan tambah item.
- Belum ada: foto proyek. Pakai frame kosong bagian 6 spec ("Dokumentasi proyek menyusul"), bukan gambar pengganti.
Next dari saya: docs/copy.md (langkah 3), lalu review build di 360/768/1440 saat kamu bilang section siap.

## [22:20] uiux -> frontend (cc lead) : docs/copy.md siap (langkah 3)
`docs/copy.md` berisi copy final per section, kunci mengikuti `src/data/content.ts`. Ganti isi content.ts dari situ.
Perubahan yang mempengaruhi kode:
- h1 tampil "Rezha", tapi sisipkan `<span class="sr-only">Rezha Herbi Saputra</span>` di dalam h1.
- Fact strip: label jadi "Tentang pelabuhannya" (bukan "proyeknya") plus caption sumber. Angka 654 ha milik pelabuhan, bukan pekerjaan Rezha.
- Judul h2 baru untuk Pengalaman, Keahlian, Organisasi (v1 tidak punya).
- Kontak: email tampil sebagai teks, WhatsApp jadi tombol, nomor dirakit saat klik (tidak ada di HTML). Alamat dan hobi baris sendiri.
- Footer: "© 2026 Rezha Herbi Saputra" dan tautan "Kembali ke atas".
Perubahan copy dari BRIEF v1 dan alasannya ada di bagian bawah copy.md. Empat hal butuh konfirmasi user, ikut ke laporan akhir lead:
1. Apakah Site Supervisor 2025 masih berjalan. 2. Kalimat "bisa bekerja dalam tim maupun sendiri" tidak ada di fakta BRIEF. 3. Kalimat sikap di Tentang atas nama Rezha. 4. Tahun footer.
Verifikasi: nol tanda pisah panjang, tidak ada kata terlarang BRIEF bagian 6. Fakta tidak berubah.
Langkah 4: kabari saya lewat comms saat section sudah dibangun dengan token baru. Saya review di 360/768/1440.

## [lead -> uiux, frontend] koreksi fakta
Kalimat "bisa bekerja dalam tim maupun sendiri, senang belajar hal baru" ADA di CV (About Me: "Can work in teams or work individually. Have interest in learning new experience."). Aman dipakai, tidak perlu konfirmasi user. Hobi menggambar dan memancing juga dari CV. Lanjutkan.

## [22:30] uiux -> lead, frontend : ack koreksi fakta, standby review
Koreksi lead diterima. Butir 2 di entri [22:20] gugur (kalimat "tim maupun sendiri" bersumber dari CV). docs/copy.md sudah saya perbarui. Sisa konfirmasi user: butir 1 (Site Supervisor 2025 masih berjalan?), 3 (kalimat sikap di Tentang), 4 (tahun footer).
Standby. Dev server 127.0.0.1:5173 hidup (HTTP 200). Saya mulai review di 360/768/1440 begitu frontend menulis entri Phase 1 di sini.

## [23:10] frontend -> uiux, lead : Phase 1 selesai, siap review di 360/768/1440
Semua section dibangun dari design-spec.md, `src/data/content.ts` diganti dari copy.md. Dev: http://127.0.0.1:5173/
- VERIFIED (dijalankan): `tsc -b` exit 0, `pnpm run lint` 0 warning/0 error (23 file), `pnpm run build` exit 0 (CSS 7.8 KB gzip, JS 132.6 KB gzip).
- VERIFIED di Chrome (Playwright) 360/768/1440: tanpa scroll horizontal, tanpa error konsol, Bricolage + Plex ter-load, ukuran h2 terukur 32/45/68 px (cocok spec), nav 296 px di 360 (muat), nomor telepon TIDAK ada di HTML/dist/index.html (hanya dirakit saat klik; klik membuka wa.me di tab baru), mailto benar, nav `aria-current` berpindah saat klik, reduced-motion: video tidak dipasang, nol elemen opacity 0, scroll-behavior auto.
- Hero: panel `bg-black/50` + teks `text-foreground`, gradient `to-black/80`, tracking `-0.045em` (token `text-display`). Zoom nama "Rezha": tidak ada huruf menempel (z-h paling rapat tapi masih ada celah).
- Sorotan: satu-satunya `bg-paper`, ring fokus jadi `ink` lewat `data-tone="paper"`. Fact strip berlabel "Tentang pelabuhannya" + caption sumber. Frame kosong foto proyek di Pengalaman (bawah Patimban) dan Sorotan.
- BUG yang saya temukan dan perbaiki: `cn()` (tailwind-merge) membaca `text-h2` sebagai warna lalu membuangnya bila bersebelahan dengan `text-foreground`, jadi h2 tampil 16 px. Saya daftarkan token font-size (display/h2/h3/lead/body/caption/label) di `src/lib/utils.ts`. Token baru dengan nama `text-*` harus ditambah ke daftar itu.
- Di luar spec, tolong dinilai: (1) foto pasfoto 112 px bulat ditaruh di Tentang (spec 6 menyebut Tentang/Kontak), (2) "Kembali ke atas" diberi padding vertikal agar target sentuh lebih besar.
- Belum diuji: hover/active/focus-visible per state secara visual (hanya kode sesuai tabel spec); video hero di jaringan lambat; 320 px.
- Catatan tim: `src/index.css` (uiux) dan `docs/*` masih uncommitted di working tree, tidak saya commit. `public/fonts/` juga belum ter-track: build produksi butuh file itu, tolong lead/uiux commit.
Next: menunggu review uiux, dan 4 butir konfirmasi user ikut laporan lead (poin 2 sudah dijawab lead: ada di CV).
