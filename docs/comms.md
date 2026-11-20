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

## [23:20] lead -> uiux, frontend : catatan review lead (gabungkan dengan review uiux)
Dicek di browser 1440: semua section render setelah scroll (opacity OK), tanpa overflow-x. Skip link tersembunyi dengan benar.
Fix yang lead minta (uiux putuskan detail visualnya, frontend eksekusi):
1. Placeholder foto proyek terlalu dominan, muncul 2x (Pengalaman + Sorotan). Jadikan SATU, versi ringkas (tinggi kecil), cukup di Sorotan. Hapus dari timeline 2023 supaya ritme timeline rata.
2. Entri 2023: tahun + node harus sejajar dengan judul role seperti entri lain (eyebrow "Pelabuhan Patimban" jangan menggeser baseline tahun).
3. Teks sekunder (company, lokasi, caption, label kecil) kontrasnya naikkan ke >= 4.5:1.
4. Label nav dan eyebrow hero: kontras/ukuran sedikit naik.
5. Kolom timeline hanya ~80% lebar: manfaatkan grid 12 kolom atau rapikan supaya tidak berat sebelah.
Setelah itu frontend: commit, lalu tulis "dist stable" di comms dan bangunkan devops (w1:pA) untuk verifikasi akhir via pnpm build + pnpm preview (TANPA docker).
uiux: commit src/index.css, docs/design-spec.md, docs/copy.md, public/fonts/ milikmu sekarang.

## [lead -> all] jawaban user
Site Supervisor 2025: MASIH BERJALAN (user konfirmasi). Copy "Sekarang saya Site Supervisor" benar. Tidak perlu ditandai ke user lagi.

## [23:50] uiux -> frontend (cc lead) : REVIEW Phase 1 di 360/768/1440 + daftar fix final
Diukur di Chrome (Playwright) lewat script, bukan dilihat saja. 0 error konsol, tanpa scroll horizontal di 3 lebar, Bricolage + Plex ter-load, h1 92/169/304 px sesuai spec. Hasil: DITERIMA DENGAN CATATAN. 8 fix di bawah, urut prioritas.

SUDAH SAYA KERJAKAN (jangan diubah, ini token milik uiux, sudah commit b89f849 + perubahan baru di working tree):
- `--color-subtle` #94937F -> #A0A08B (7.37:1 bg, 6.90 surface, 6.38 surface-2). `--color-ink-subtle` #5A5946 -> #4D4C3A (6.53:1 paper, 5.87 paper-2).
  Sebelumnya teks di Sorotan 4.80 s/d 5.33 (lolos tipis), sekarang terendah di seluruh halaman = 5.35:1 (accent-ink di paper-2). Fix lead no.3 beres lewat token.
- `--text-caption` 13 -> 14 px, `--text-label` 12 -> 13 px. Fix lead no.4 sebagian beres lewat token. Build + lint exit 0.
Perubahan ini ada di working tree (src/index.css, docs/design-spec.md), saya commit sendiri. Jangan menimpa kedua file itu.

FIX UNTUK FRONTEND
1. [lead 1, prioritas tertinggi] Placeholder foto proyek jadi SATU, ringkas, di Sorotan saja.
   - `src/sections/experience.tsx`: hapus `{featured && <MediaPlaceholder .../>}` dan import-nya jika tak terpakai.
   - `src/components/ui/media-placeholder.tsx`: ganti `aspect-[16/10] ... md:aspect-[4/3]` dengan `aspect-[16/9]`, `p-6` -> `p-5`. Judul di dalamnya `text-h3` -> `text-base font-display` (16 px). Sekarang judul placeholder sebesar judul role (28 px), itu sebab ia terasa dominan.
   - `src/sections/spotlight.tsx`: kolom kanan `lg:col-span-5` tetap, tapi sejajarkan atas dengan paragraf (`lg:items-start`) dan biarkan tinggi mengikuti 16:9. Di 1440 sekarang 519x389 px (4:3) vs paragraf 140 px tinggi, jadi kolom kiri kosong ~250 px. Target tinggi <= 292 px di 1440 (16:9 pada 519 px).
2. [lead 2] Tahun + node sejajar judul role di entri 2023. Akar masalah: `featuredLabel` ("Pelabuhan Patimban") ada DI ATAS `<h3>` di kolom kanan, sedangkan tahun dan node berpatokan ke atas baris. Terukur di 768: tahun top 2416, h3 top 2472 (selisih 56 px); entri lain selisih 28-32 px.
   Solusi: pindahkan `featuredLabel` ke bawah baris org/place (jadi chip kecil di bawah `place`), BUKAN di atas h3. Atau, jika tetap di atas, beri kolom tahun `lg:pt-[calc(1lh+0.5rem)]` dan node `top-[calc(...)]`. Pilih yang pertama, lebih sederhana: h3 jadi baris pertama di semua entri, maka sejajar otomatis.
   Di 360: tahun ada di baris sendiri di atas h3 (OK), tapi eyebrow oranye menempel 4 px di bawah tahun. Dengan solusi di atas masalah ini hilang.
3. [lead 5] Timeline berat sebelah. Terukur 1440: tahun x=80, konten mulai x=438 (diukur). Teks berhenti sekitar x=1075 dan sisi kanan kosong sekitar 285 px (perkiraan dari screenshot). Kolom tahun `lg:col-span-3` (~265 px) terlalu lebar untuk teks 4 digit, jadi tahun terpisah ~330 px dari isinya.
   - Kolom tahun `lg:col-span-2`, konten `lg:col-span-9 lg:col-start-3`. Rail `lg:left-[calc(16.667%+13px)]`, node `lg:left-[calc(16.667%+6px)]` (ganti 25% -> 16.667%).
   - `max-w-copy` pada paragraf tetap (jangan dilebarkan, 62ch sudah batas baca). Ruang sisa diisi oleh kolom konten yang lebih lebar untuk h3 + meta, itu cukup.
   - Terapkan juga pada `organization.tsx` (`lg:col-span-3` -> `lg:col-span-2`, `lg:col-span-8 lg:col-start-4` -> `lg:col-span-9 lg:col-start-3`) agar kolom mulai di x yang sama dengan Pengalaman. Sekarang konten Organisasi mulai x~410 dan tak sejajar apa pun.
4. [HERO, kontras, berat] Eyebrow "Teknik Sipil · Tangerang" gagal di piksel terburuk poster: 3.91:1 (360) dan 3.58:1 (768); 1440 aman (11.65). Alasan: di 360/768 teks jatuh di atas area terang poster, bukan area gelap seperti di 1440. Diukur dari screenshot dengan teks disembunyikan.
   Fix: di `src/components/hero.tsx`, tambahkan scrim bawah di bawah gradient yang ada, BUKAN panel. Persis setelah `<div ... bg-gradient-to-b from-black/40 via-black/10 to-black/80 />`:
   `<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-transparent to-80% md:hidden" />`
   Saya uji nilai ini (`rgba(0,0,0,.8) 0%, .55 50%, 0 80%`): eyebrow jadi 7.82:1 (360) dan 10.22:1 (768), 1440 naik ke 14.56. Kelas final pakai `lg:hidden` (bukan `md:hidden`): 768 juga gagal. Saya uji nilai gradient ini di 360/768/1440; rentang 1024-1279 belum saya ukur, cek sekali.
   Jangan tambahkan `text-shadow` sebagai pengganti, tidak dihitung dalam kontras.
5. [lead 4] Nav: label 11 px di 360 kecil. Naikkan ke 12 px di mobile (`text-[11px]` -> `text-xs` saja, buang `sm:text-xs`). Terukur: nav jadi 316 px, muat di 360 (sisa 22 px/sisi) DAN di 320 (sisa 2 px/sisi). JANGAN 13 px: 336 px, meluber di 320. Di md+ biarkan `text-sm` (14 px). Warna `text-foreground/80` -> `text-foreground/90` (kontras tidak masalah, 9.94:1, ini soal keterbacaan di atas poster).
6. Hierarki Organisasi: "2017–2018" (h3 28 px display) lebih menonjol dari role. Ubah periode jadi `text-body tabular-nums text-subtle` (14-16 px, bukan display), role tetap `text-h3`. Tahun di Pengalaman boleh tetap display, di sana ia penanda utama.
7. Kontak: dua baris tautan (email, WhatsApp) tak beda hierarki. Email jadi utama (`text-h3`), WhatsApp tombol pill (`PillLink`) di bawahnya, panah ↗ naik jadi 16 px (sekarang ~12 px dan redup). Baris pertama tanpa garis atas: tambahkan `border-t` agar daftar tertutup di kedua sisi. Meta alamat/hobi sudah naik ke 7.37:1 lewat token baru, tidak perlu disentuh.
8. Keahlian: tiga kolom tinggi beda jauh (Desain 1 baris pill, Lapangan 5 baris, Bahasa 2 baris) dan tiga perlakuan list. Satukan: Bahasa pakai pill juga (sama dengan Desain). Lapangan tetap daftar teks karena kalimat panjang. Itu cukup; jangan paksa tinggi sama.

JAWABAN DUA PERTANYAAN FRONTEND (di luar spec)
a) Foto pasfoto bulat 112 px di Tentang: BOLEH, tapi belum meyakinkan. Latar biru jenuh adalah satu-satunya warna jenuh di halaman, dan lingkaran sendirian tanpa konteks terbaca seperti avatar komentar. Fix: grayscale halus agar masuk palet (`grayscale contrast-[1.05]`), ukuran `h-32 w-32` (128 px), tambah caption di kanannya `Rezha Herbi Saputra` (text-body, foreground) + `Site Supervisor · Tangerang` (text-caption, subtle), pakai `flex items-center gap-4`. Lingkaran `-ml-px` agar tepi optik sejajar judul. Jika user tak mau foto formal di sini, hapus seluruhnya, tidak ada yang rusak.
b) "Kembali ke atas" padding vertikal: BENAR, pertahankan.

HASIL YANG SUDAH BERES, TIDAK PERLU DISENTUH
- Fokus: semua elemen interaktif punya outline 2 px foreground, offset 3 px. Tab order benar.
- Tracking hero -0.045em: huruf TIDAK menempel (flood-fill piksel: 5 komponen = 5 huruf, celah z-h terkecil 2 px di 304 px). -0.055em dan lebih rapat menyatukan huruf. Jangan dirapatkan.
- Target sentuh: tidak ada elemen interaktif < 24 px.
- Lead panel hero: kontras aman (7.17:1, panel bg-black/50 sesuai spec).

BELUM DIUJI (jujur): hover/active per state secara visual; video hero di jaringan lambat; 320 px selain nav (nav sudah diukur).
Setelah fix 1-5 selesai tulis di sini, saya ukur ulang di 360/768/1440. Fix 6-8 tidak memblokir "dist stable" tapi saya ingin dilihat sebelum rilis.

## [lead -> uiux, frontend, devops] KEPUTUSAN USER (override spec/brief yang bertentangan)
1. Site Supervisor 2025 masih berjalan. (sudah di atas)
2. Nomor WA BOLEH tampil publik. Tombol WhatsApp = link langsung wa.me/628567003162 -> https://wa.me/628567003162 (tanpa perakitan JS, tanpa 'Membuka WhatsApp...'), target _blank rel="noopener noreferrer", teks tampil "0856 700 3162". Boleh tambah ?text=Halo%20Rezha,%20saya%20lihat%20portofolio%20Anda. Perbarui JSON-LD telephone bila perlu.
3. HERO DIGANTI. Video hotlink 16 MB dibuang total (tidak ada video eksternal, tidak perlu ffmpeg). Ganti dengan animasi buatan sendiri bertema teknik sipil, gaya tetap sama dengan sample Prisma: nama raksasa tracking rapat, WordsPullUp, grain, nav notch, pill CTA, krem #E1E0CC di atas near-black.
   Konsep (uiux boleh ubah, harus tetap civil): "gambar kerja yang digambar sendiri". Latar gelap dengan grid blueprint tipis; garis SVG struktur (rangka gedung bertingkat / bentang jembatan / rangka batang) digambar bertahap lewat stroke-dashoffset + framer-motion pathLength; garis dimensi dengan label (mis. L = 24.00 m, +12.50) muncul belakangan; kolom/pile tiang turun perlahan seperti CDM (tiang pancang/auger masuk ke lapisan tanah bergaris). Loop halus, ringan (SVG/CSS saja, tanpa video, tanpa lib berat), aksen oranye token yang sudah ada. prefers-reduced-motion: tampil sebagai gambar statis penuh. Teks lead di atas panel bg-black/50 tetap, kontras AA.
   Poster/hero-poster.jpg lama (awan + orang laptop) dihapus dari hero.
4. FOTO UNSPLASH dari user: https://unsplash.com/photos/a-high-rise-building-is-under-construction-qIymVWdmkW0 (gedung bertingkat sedang dibangun). Unsplash memblok unduhan otomatis, jadi lead minta user menaruh file di public/img/construction-highrise.jpg. SAMPAI file itu ada: jangan hotlink, jangan tebak URL images.unsplash.com. frontend siapkan slot (section Sorotan atau latar Tentang, uiux tentukan) yang otomatis memakai /img/construction-highrise.jpg bila ada dan fallback ke frame kosong bila belum. Kredit foto di footer ("Foto: <nama fotografer> / Unsplash") diisi saat file masuk, nama fotografer jangan ditebak.
5. devops: CSP tidak lagi perlu cloudfront.net (hapus). Tidak ada media eksternal. Tetap TANPA docker.
Urutan: uiux update design-spec bagian hero + sketsa animasi (1 pesan comms), wake frontend; frontend implementasi + 5 fix review sebelumnya; lalu 'dist stable'.
