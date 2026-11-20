# Design spec v1 (uiux -> frontend)

Pemilik: Agent 1 (uiux). Token hidup di `src/index.css` blok `@theme` dan sudah lolos `pnpm build`. Komponen memakai nama peran
(`text-muted`, `bg-surface`, `border-line-strong`), jangan hex mentah. Semua rasio kontras di bawah dihitung dengan rumus WCAG 2.x
(luminansi relatif sRGB), bukan perkiraan.

Referensi sistem: Untitled UI (skala spasi 4px, anatomi komponen, focus ring 2px + offset, pola label/field). Tidak ada komponen
berbayar yang disalin. Identitas visual tetap Prisma: krem `#E1E0CC` di atas hampir-hitam `#0B0C0A`, nama raksasa dengan tracking
rapat, grain, notch nav hitam, tombol pill dengan lingkaran panah.

---

## 1. Peta section

Urutan, tujuan, dan apa yang harus dirasakan/dilakukan pengunjung. Target pembaca: HR kontraktor/konsultan, owner proyek, mitra JV.

| # | id | Section | Latar | Tujuan | Pengunjung harus |
|---|----|---------|-------|--------|------------------|
| 0 | `#beranda` | Hero | foto/video + grain | Siapa, bidang apa, dua langkah berikut | Paham dalam 5 detik: "sarjana teknik sipil, gambar + lapangan". Klik "Lihat pengalaman" atau "Hubungi saya" |
| 1 | `#tentang` | Tentang | `background` | Cara berpikir, bukan daftar jabatan | Membaca 3 paragraf dan merasa orangnya konkret |
| 2 | `#pengalaman` | Pengalaman (timeline) | `background` | Bukti kerja, urut terbaru ke lama | Memindai 4 entri dalam 20 detik, berhenti di Patimban |
| 3 | `#sorotan` | Sorotan CDM | **`paper` (krem terbalik)** | Satu hal teknis dijelaskan ke orang awam | Paham apa itu CDM tanpa istilah. Satu-satunya section terang, jadi jadi jeda ritme |
| 4 | `#keahlian` | Keahlian | `background` | Software + kerja lapangan + bahasa | Mencocokkan dengan kebutuhan lowongan |
| 5 | `#organisasi` | Organisasi | `background` (padding lebih kecil) | Bukti kerja tim di luar kerja | Selesai dalam 5 detik, bukan section utama |
| 6 | `#kontak` | Kontak | `surface` | Satu ajakan jelas | Menekan email atau WhatsApp |
| 7 | - | Footer | `background` | Penutup tenang | Tidak ada aksi baru |

Catatan: nav di `content.ts` sudah memakai `#tentang #pengalaman #sorotan #keahlian #kontak`. `#organisasi` sengaja tidak masuk nav
(5 item sudah batas lebar di 360px, lihat bagian 4). Hero memakai `id="beranda"`, tidak masuk nav.

Ritme warna: gelap (hero) > gelap > gelap > **terang** > gelap > gelap > sedikit lebih terang (`surface`) > gelap.

---

## 2. Token

### 2.1 Warna (peran, nilai, kontras terhitung)

Gelap (default):

| Token | Hex | Pakai untuk | Kontras |
|---|---|---|---|
| `background` | `#0B0C0A` | halaman | - |
| `surface` | `#141510` | kartu, panel timeline, section kontak | - |
| `surface-2` | `#1C1D17` | chip, baris hover, input | - |
| `line` | `#252521` | hairline dekoratif | 1.27:1 (**hanya dekorasi**, tidak boleh jadi satu-satunya penanda) |
| `line-strong` | `#6B6B61` | border yang harus terlihat (chip, input, frame kosong) | 3.64:1 vs bg, 3.41:1 vs surface (lolos 3:1 non-teks) |
| `foreground` | `#E1E0CC` | judul, teks utama | 14.69:1 vs bg, 13.75 vs surface, 12.72 vs surface-2 |
| `muted` | `#A9A895` | isi paragraf | 8.14:1 vs bg, 7.62 vs surface, 7.05 vs surface-2 |
| `subtle` | `#A0A08B` | caption, label, meta | 7.37:1 vs bg, 6.90 vs surface, 6.38 vs surface-2 |
| `accent` | `#E0865A` (terakota) | marker timeline, link, angka kunci, hover | 7.21:1 vs bg, 6.75 vs surface, 6.24 vs surface-2 |
| `accent-hover` | `#EB9A73` | hover teks accent | 8.78:1 vs bg |
| `accent-press` | `#C77248` | active/pressed | teks `ink` di atasnya 5.53:1 |
| `focus` | `#E1E0CC` | focus ring | 14.69:1 vs bg, 12.91 vs foto gelap |

Terakota dipilih karena warna tanah/bata/besi berkarat: relevan untuk sipil dan tidak masuk daftar terlarang (tanpa ungu/biru).
Dipakai hemat: marker, link, satu angka per kartu. Bukan latar tombol.

Terang (`paper`, hanya section Sorotan):

| Token | Hex | Pakai untuk | Kontras |
|---|---|---|---|
| `paper` | `#E1E0CC` | latar section | - |
| `paper-2` | `#D6D5C2` | kartu fakta di atas paper | - |
| `ink` | `#0B0C0A` | judul, teks utama | 14.69:1 vs paper, 13.22 vs paper-2 |
| `ink-muted` | `#4B4A3C` | paragraf | 6.71:1 vs paper, 6.04 vs paper-2 |
| `ink-subtle` | `#4D4C3A` | caption | 6.53:1 vs paper, 5.87 vs paper-2 |
| `ink-line` | `#BFBEAD` | hairline dekoratif | 1.41:1 (dekorasi) |
| `ink-line-strong` | `#76766B` | border terlihat | 3.44:1 vs paper |
| `accent-ink` | `#833D1A` | teks/angka accent di atas paper | 5.94:1 vs paper, 5.35 vs paper-2 |

Aturan: `accent` (#E0865A) di atas krem hanya 2.04:1, jadi **dilarang** sebagai teks di `paper`. Pakai `accent-ink`.

Alias lama tetap hidup supaya kode Agent 2 tidak patah: `primary` = `foreground`, `primary-foreground` = `background`, `text-primary/70` dst tetap jalan.
Untuk teks baru pakai peran (`text-muted`), jangan `text-primary/60`. Alasannya: opacity di atas foto atau permukaan berbeda
menghasilkan kontras yang tidak bisa dijamin.

### 2.2 Font

Satu display + satu teks, self-host (sudah di `public/fonts/`, `@font-face` ada di `index.css`, `font-display: swap`).

- **Display: Bricolage Grotesque** (variabel, sumbu `opsz` + `wght` + `wdth`, SIL OFL). Dipakai h1/h2/h3 dan angka besar.
  Alasan: grotesque yang punya karakter (ink trap, proporsi sedikit padat) tapi tetap kokoh, cocok untuk tampilan "teknik" tanpa
  terlihat seperti template. Sumbu `opsz` otomatis memperhalus bentuk di ukuran raksasa, yang justru dibutuhkan hero 300px.
- **Teks: IBM Plex Sans** (variabel `wght`, SIL OFL). Dirancang IBM untuk dokumen teknis; bentuknya "dirakit", angka jelas dan
  tabular-nya enak untuk 654 ha / 2019 / 20 Des 2020. Bukan Inter.
- Self-host, bukan Google Fonts: CSP devops sudah mengizinkan `'self'`, tidak ada request pihak ketiga, tidak ada FOUT lintas origin.
  Bobot file: 76.9 KB + 45.7 KB (latin saja; teks Indonesia dan Inggris muat di subset latin).
- Preload (Agent 2, di `index.html`):
  `<link rel="preload" href="/fonts/bricolage-grotesque-latin-opsz-normal.woff2" as="font" type="font/woff2" crossorigin>`
  `<link rel="preload" href="/fonts/ibm-plex-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>`

**Temuan uji render (dilihat langsung, bukan asumsi):** tracking hero `-0.07em` (nilai di komponen Prisma) membuat huruf **z dan h menempel**
pada "Rezha" di Bricolage. Tracking `-0.05em` hanya lolos tipis pada bobot 500. Nilai spec: **`-0.045em`, bobot 500**. Ini menggantikan `tracking-[-0.07em]` di `hero.tsx`.

### 2.3 Skala tipografi

Gunakan utilitas bawaan dari token: `text-display`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-caption`, `text-label`
(font-size + line-height + letter-spacing ikut). Nilai di bawah dihitung dari `clamp()` pada tiga lebar.

| Peran | Font | Bobot | clamp | 360 / 768 / 1440 | Line-height | Tracking |
|---|---|---|---|---|---|---|
| display (nama hero) | Bricolage | 500 | `clamp(5.75rem, 22vw, 19rem)` | 92 / 169 / 304 px | 0.85 | -0.045em |
| h2 (judul section) | Bricolage | 500 | `clamp(2rem, 1.2rem + 3.4vw, 4.25rem)` | 32 / 45 / 68 px | 1.05 | -0.035em |
| h3 (peran di timeline, judul kartu) | Bricolage | 500 | `clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem)` | 20 / 24 / 28 px | 1.2 | -0.02em |
| lead (paragraf pembuka) | Plex | 400 | `clamp(1.0625rem, 1rem + 0.4vw, 1.3125rem)` | 17 / 19 / 21 px | 1.5 | 0 |
| body | Plex | 400 | `1rem` | 16 px | 1.65 | 0 |
| caption | Plex | 400 | `0.875rem` | 14 px | 1.45 | 0 |
| label (eyebrow, label section) | Plex | 500, UPPERCASE | `0.8125rem` | 13 px | 1.3 | 0.16em |

Aturan: lebar baris paragraf maksimal `max-w-copy` (40rem, sekitar 62 karakter). Judul pakai `text-balance`. Angka di fact strip dan tahun
pakai `font-variant-numeric: tabular-nums`. Kata "Rezha" selebar 2.36 em, jadi di 1440 lebarnya sekitar 718 px, muat di `col-span-8`.

### 2.4 Spasi (basis 4px, Untitled UI)

`--spacing: 0.25rem`, utilitas Tailwind standar. Langkah yang dipakai: 1 (4) · 2 (8) · 3 (12) · 4 (16) · 5 (20) · 6 (24) · 8 (32) · 10 (40) · 12 (48) · 16 (64) · 20 (80) · 24 (96).

- Jarak antar-section: `py-section` = `clamp(5rem, 4rem + 5vw, 9rem)` (80 px di 360, 98 di 768, 144 di 1440).
- Gutter halaman: `px-gutter` = `clamp(1rem, 0.5rem + 2.2vw, 2.5rem)` (16 / 24 / 40 px).
- Label ke judul: 16. Judul ke isi: 40 (mobile) / 56 (md+). Antar-entri timeline: 40 / 56.
- Padding kartu: 20 (mobile) / 32 (md+).

### 2.5 Layout

- Grid 12 kolom, `gap-4` (16) di mobile, `gap-6` (24) di md+. Kontainer `mx-auto max-w-page` (1280) dengan `px-gutter`.
- Teks panjang: `max-w-copy`. Jangan memakai nama `prose` untuk container (bentrok dengan `max-w-prose` Tailwind; token sudah dinamai `copy`).
- Breakpoint (default Tailwind): sm 640 · md 768 · lg 1024 · xl 1280. Desain mobile-first, uji di 360, 768, 1440.
- Pola kolom per section (lg+): Tentang: judul `col-span-5`, isi `col-span-6 col-start-7`. Pengalaman: tahun `col-span-3`, isi `col-span-8`.
  Sorotan: penjelasan `col-span-7`, kartu fakta `col-span-4 col-start-9`. Keahlian: tiga kolom sama. Kontak: judul kiri `col-span-6`, tautan kanan `col-span-5 col-start-8`.
  Di bawah lg semuanya satu kolom, urutan DOM = urutan baca.

### 2.6 Radius dan elevasi

- Radius: **default Tailwind dipertahankan** (`rounded-2xl` = 1rem). Sengaja tidak di-override, karena hero Agent 2 memakai `rounded-2xl` dan `rounded-[2rem]`.
  Pakai: chip/tag `rounded-full`, kartu `rounded-2xl`, frame hero `rounded-2xl md:rounded-[2rem]`, input/field `rounded-xl`.
- Elevasi: UI gelap tidak memakai bayangan untuk kedalaman. Kedalaman = langkah tone (`background` > `surface` > `surface-2`) + border.
  `shadow-raised` (border 1px + highlight atas, untuk kartu) dan `shadow-float` (hanya untuk elemen melayang seperti menu, jika ada).

### 2.7 Motion

| Token | Nilai | Dipakai |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | semua gerak masuk (sama dengan word pull-up Prisma) |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | transisi warna/border |
| `--duration-fast` | 150 ms | warna, border, opacity saat hover |
| `--duration-base` | 250 ms | `gap` pada pill, scale lingkaran panah |
| `--duration-slow` | 600 ms | word pull-up, reveal section |

Catatan teknis: Tailwind v4 tidak punya namespace `--duration-*`, jadi `duration-fast` tidak menjadi utilitas. Pakai `duration-150`,
`duration-250`, `duration-[600ms]`, atau `style`/`var(--duration-fast)`. `ease-out-expo` dan `ease-standard` **menjadi** utilitas (`ease-out-expo`).

Yang bergerak: (1) nama hero, word pull-up 600 ms, jeda 80 ms antar kata; (2) lead + CTA hero naik 20 px + fade, jeda 500/700 ms;
(3) tiap section: judul dan blok naik 16 px + fade saat masuk viewport, sekali (`once: true`), 600 ms, stagger maksimal 3 anak x 80 ms;
(4) hover pill. ~~Tidak ada parallax~~ (diganti bagian 10: parallax per section + efek mouse). Tetap tidak ada scroll-jacking dan tidak ada gerak berulang tanpa henti selain loop CDM.

`prefers-reduced-motion: reduce`: tidak ada word pull-up (nama langsung tampil), tidak ada reveal (konten langsung tampil, **jangan** disembunyikan
dengan opacity 0), video **tidak dipasang** (poster saja), `scroll-behavior: auto`, hover pill tetap berubah warna tetapi tanpa gerak `gap`/scale.

---

## 3. Hero (SPEC LENGKAP — ganti video + poster lama)

Keputusan user (comms): video 16 MB cloudfront dibuang. Poster awan + laptop dibuang. Hero diganti **animasi SVG + CSS buatan sendiri**
bertema teknik sipil: rangka gedung 4 lantai di atas kolom CDM dengan dimensi dan elevasi. Tidak ada media eksternal, tidak ada `<video>`,
tidak ada hotlink. Gaya tetap Prisma: krem #E1E0CC di atas near-black, nama raksasa tracking rapat, grain, notch nav, pill CTA.

**Prototipe hidup**: `docs/prototypes/hero-blueprint.html` (v7). Buka file ini sebagai sumber visual + animasi acuan. Spec di bawah adalah
perjanjian kontrak; prototipe adalah referensi rendernya. Jika ada beda, spec yang menang.

### 3.1 Struktur komponen

Ganti `src/components/hero.tsx` jadi komponen baru (hapus import `PrismaHero`, hapus pemasangan `<video>`, hapus `hero-poster.jpg`).

```
<section id="beranda" className="relative isolate overflow-hidden rounded-2xl md:rounded-[2rem] bg-background min-h-[calc(100svh-1rem)] flex flex-col justify-end">
  <HeroGridBg />                       {/* background grid 40px, mask radial */}
  <HeroBlueprint />                    {/* SVG rangka + CDM + dimensi, lihat 3.3 */}
  <HeroNoise aria-hidden="true" />     {/* film grain overlay */}
  <div className="relative z-10 px-gutter pb-2 pt-2">
    <div className="grid grid-cols-12 gap-4 md:gap-6 items-end">
      <div className="col-span-12 lg:col-span-8">
        <p className="text-label text-foreground mb-3">Teknik Sipil · Tangerang</p>
        <h1 className="font-display text-display"><span aria-hidden="true">Rezha</span><span className="sr-only">Rezha Herbi Saputra</span></h1>
      </div>
      <div className="col-span-12 lg:col-span-4 pb-4 lg:pb-8">
        <div className="rounded-2xl bg-black/50 p-5 backdrop-blur-sm flex flex-col gap-5">
          <p className="text-lead text-foreground">Sarjana Teknik Sipil yang bekerja di dua sisi proyek...</p>
          <div className="flex flex-wrap gap-3">
            <PillLink href="#pengalaman" variant="primary">Lihat pengalaman</PillLink>
            <PillLink href="#kontak" variant="secondary">Hubungi saya</PillLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

Catatan: hero adalah section pertama. `id="beranda"`, tag `<section>` + `<h1>` tunggal. Layer urutan (z): grid-bg (0) < blueprint SVG (0, absolute) < noise (1, pointer-events-none) < content (10).

### 3.2 HeroGridBg (grid 40 px)

Elemen `<div aria-hidden="true" className="absolute inset-0 pointer-events-none" />` dengan inline style:
```
backgroundImage: "linear-gradient(rgba(225,224,204,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(225,224,204,.07) 1px, transparent 1px)"
backgroundSize: "40px 40px"
WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 60% 35%, #000 30%, transparent 100%)"
maskImage:       "radial-gradient(ellipse 85% 75% at 60% 35%, #000 30%, transparent 100%)"
```
Grid tidak dianimasikan. Opacity 0.07 memberikan "lembar gambar" tanpa mendominasi. Mask radial membuat grid memudar ke sudut.

### 3.3 Blueprint SVG — geometri NYATA

Satu `<svg>` berisi struktur + tanah + dimensi + label elevasi + kolom CDM. Koordinat di bawah SUDAH diuji di prototipe v7.

**ViewBox dua mode** (dipilih via `useMediaQuery('(min-width: 1024px)')` atau rendering CSS):
- lg+ (≥1024 px): `viewBox="200 0 920 560"`, `preserveAspectRatio="xMidYMid meet"`
- di bawah lg: `viewBox="320 0 560 520"`, elemen `[data-hide="sm"]` disembunyikan via `@media (max-width:1023.98px) { [data-hide="sm"] { display:none } }`

**Penempatan SVG** (wrapper `<div>`):
- Mobile/tablet (< lg): wrapper dalam aliran flex, `flex-1 min-h-[260px]`, margin `mt-[5.5rem] mb-6`; SVG `position:absolute inset-0 w-full h-full overflow-visible`.
- lg+: wrapper `absolute top-12 right-6 w-[calc(100%-1.5rem-20%)] aspect-[920/560] z-0`. SVG seperti di atas. Konten teks (nama + panel lead) di atasnya pakai `z-10`; panel scrim 50% akan menutupi bagian SVG di belakangnya — ini dipilih lead sebagai komposisi.

**Elemen SVG — koordinat dan token** (semua stroke pakai `var(--color-foreground)` atau `var(--color-accent)`; jangan hex mentah):

| id | peran | d / posisi | stroke | stroke-opacity | stroke-width | dasharray |
|---|---|---|---|---|---|---|
| mask fade-X | mask gradient untuk tanah + grid | linearGradient x1=220 x2=1100, stops 0→.16→.84→1 (gelap→terang→terang→gelap) | — | — | — | — |
| strata rects | lapisan tanah (visual) | 3 `<rect>` x=220 w=880 di y=384 h=66 fill foreground/.035; y=450 h=45 foreground/.07; y=495 h=60 fill linear-gradient y foreground .07→0 | — | — | — | — |
| ground | garis tanah | `M220 370 H1100` | foreground | 0.95 | 2 | — |
| ground-hatch | arsir tanah 45° | 63 goresan `M{x} 370 l-9 11` x=232..1086 step 14 | foreground | 0.35 | 1 | — |
| strata-1 | lapisan tanah atas (lempung) | gelombang halus q10 -4 20 0 (period 40 px), di y=405 | foreground | 0.35 | 1.25 | — |
| strata-2 | pasir | sama di y=450 | foreground | 0.35 | 1.25 | — |
| strata-3 | lapisan keras | sama di y=495 | foreground | 0.6 | 1.75 | — |
| axes | sumbu kolom vertikal | `M360 70 V370 M480 70 V370 M600 70 V370 M720 70 V370 M840 70 V370` | foreground | 0.32 | 1 | `2 8` |
| cdm-1..5 | kolom CDM (accent) | `M{xL} 384 V490 H{xR} V384` di xL=348,468,588,708,828 (lebar 24) | accent | 1 | 2 | — |
| cdm-fill-1..5 | isi kolom CDM | `<rect>` 24×106 fill accent/.24, origin top, `scaleY(0)` di-animate ke 1 (lihat 3.5) | — | — | — | — |
| auger-1..5 | mata bor turun (segitiga) | `M{xL} 481 H{xR} L{xMid} 497 Z` fill accent | — | — | — | — |
| caps | pile cap | 5 kotak atas kolom: `M{x-32} 370 V384 H{x+32} V370 Z` di tiap grid | foreground | 0.9 | 1.75 | — |
| col-1 → col-4 | kolom per lantai (0→1,1→2,2→3,3→4) | 5 kolom vertikal panjang 70 px per lantai (y=370→300→230→160→90) | foreground | 1 | 2.5 | — |
| beam-1 → beam-4 | balok ganda per lantai | 2 garis horizontal `M346 {y} H854 M346 {y+8} H854` di y=300,230,160,90 | foreground | 1 | 2.5 | — |
| brace-1 → brace-4 | bracing silang (hanya bay ujung) | per lantai: `M360 {yB} L480 {yT} M480 {yB} L360 {yT} M720 {yB} L840 {yT} M840 {yB} L720 {yT}` | foreground | 0.75 | 1.25 | — |
| dim-top | dimensi total L di atas | `M346 26 H854` + tick 10 px di 5 kolom + extension `M360 16 V38 M840 16 V38` | accent | 0.95 | 1.5 | — |
| lbl-L | label dimensi "L = 24,00 m" | `<text>` di (600, 16) text-anchor middle, fill accent, font-size 15 px, text-stroke background 5 px (`paint-order:stroke`) | — | — | — | — |
| bubble-1..5 | grid label A..E | `<g>`: `<circle cx={x} cy=58 r=11 fill=background stroke=foreground stroke-opacity=.75 stroke-width=1.25>` + `<text>` huruf A..E font-size 12 px | — | — | — | — |
| dim-h | dimensi vertikal H kanan | `M900 90 V370` + tick + extension `M854 90 H908 M854 370 H908`, data-hide="sm" | accent | 0.95 | 1.5 | — |
| lbl-H | label "H = 14,00 m" | di (916, 234) text-anchor start, fill accent, font-size 15 | — | — | — | — |
| lvl-lines | garis level kiri | `M326 90 H342 M326 160 H342 M326 230 H342 M326 300 H342 M326 370 H342`, data-hide="sm" | foreground | 0.5 | 1 | — |
| lvl-0..4 | label elevasi | `<text>` text-anchor end x=320 di y=85,155,225,295,365: `+14,00` `+10,50` `+7,00` `+3,50` `±0,00` font 12 px, data-hide="sm" | — | — | — | — |
| cdm-leader | garis petunjuk ke kolom CDM | `M854 400 L918 350 H1050`, data-hide="sm" | accent | 0.95 | 1.25 | — |
| lbl-cdm-1/2 | 2 baris label petunjuk | `Kolom CDM Ø1,2 m` dan `L = 6,00 m (−6,00)` di (926, 344) dan (926, 364), data-hide="sm" | accent | 1 | — | — |
| soil-1/2/3 | label lapisan tanah kanan | `Lempung lunak` (1092,436), `Pasir` (1092,480), `Lapisan keras` (1092,520), text-anchor end, data-hide="sm" | foreground/.7 | — | — | — |
| title-box | kop gambar kanan-atas | `M912 14 H1100 V62 H912 Z M912 38 H1100`, data-hide="sm" | foreground | 0.55 | 1 | — |
| title-1/2 | isi kop | `POTONGAN A–A` + `Ilustrasi konsep, tanpa skala` di (922, 30) dan (922, 54), data-hide="sm" | foreground/.95 dan .75 | — | — | — |

Catatan teks:
- Angka Indonesia pakai koma desimal (`24,00`, `14,00`, `10,50`, `6,00`). Tanda minus Unicode `−` (U+2212), bukan `-`.
- Semua `<text>` pakai `font-family: var(--font-sans)` (IBM Plex), `font-variant-numeric: tabular-nums`, `paint-order: stroke` dengan `stroke: var(--color-background)` `stroke-width: 5` untuk halo ringan supaya angka tidak lebur di grid.
- Tidak ada emoji, tidak ada ikon vector pihak ketiga.

### 3.4 Panel lead + grain

Panel lead: `rounded-2xl bg-black/50 p-5 backdrop-blur-sm`. Teks lead `text-foreground` (bukan `/70`). Kontras terukur 7.17:1 di piksel terburuk atas poster/awan — scrim ini wajib tetap ada walau background sekarang adalah SVG gelap (konsisten semua breakpoint, dan panel memberi batas visual antara lead dan blueprint).

Grain: utilitas `.noise-overlay` yang sudah ada di `index.css` (SVG turbulence 200x200, opacity .7, mix-blend-mode overlay). Pakai `<div aria-hidden="true" className="noise-overlay absolute inset-0 pointer-events-none" />` setelah SVG blueprint, sebelum `.content`.

### 3.5 Timeline animasi (framer-motion)

Satu `motion.svg` sebagai parent. Varian pakai `whileInView={{ opacity:1 }}` sekali (`viewport={{ once:true }}`). Delay di tabel adalah `delay` pada varian anak (bukan stagger otomatis), karena urutan non-seragam.

Ease dan durasi (dari token):
- `ease: [0.16, 1, 0.3, 1]` (= `--ease-out-expo`) untuk semua garis struktur dan dimensi.
- `ease: [0.2, 0, 0, 1]` (= `--ease-standard`) hanya untuk fade label.
- Duration: lihat per-grup.

Semua garis pakai `strokeDasharray / strokeDashoffset` → animasi `pathLength` 0→1. Siapkan util varian:

```ts
const draw = (d: number, t = 1.1) => ({
  hidden: { pathLength: 0, opacity: 1 },
  show:   { pathLength: 1, transition: { delay: d, duration: t, ease: [0.16,1,0.3,1] } },
});
const fade = (d: number, t = 0.6) => ({
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { delay: d, duration: t, ease: [0.2,0,0,1] } },
});
```

Urutan (dalam detik sejak hero mount):

| t (s) | elemen | varian | durasi |
|---|---|---|---|
| 0.25 | `ground` (garis tanah) | draw | 1.1 |
| 0.50 | `strata-1` | draw | 1.2 |
| 0.68 | `strata-2` | draw | 1.2 |
| 0.86 | `strata-3` | draw | 1.2 |
| 0.90 | `ground-hatch` | fade | 0.8 |
| 1.60 | `soil-1` (Lempung lunak) | fade | 0.5 |
| 1.75 | `soil-2` (Pasir) | fade | 0.5 |
| 1.90 | `soil-3` (Lapisan keras) | fade | 0.5 |
| 0.10 | `axes` (sumbu kolom) | fade | 0.8 |
| 1.30 | `cdm-1` | draw | 1.1 |
| 1.44 | `cdm-2` | draw | 1.1 |
| 1.58 | `cdm-3` | draw | 1.1 |
| 1.72 | `cdm-4` | draw | 1.1 |
| 1.86 | `cdm-5` | draw | 1.1 |
| 2.80 | `caps` (pile cap) | draw | 0.7 |
| 3.10 | `col-1` (kolom lantai 1) | draw | 0.55 |
| 3.35 | `beam-1` | draw | 0.7 |
| 3.52 | `col-2` | draw | 0.55 |
| 3.77 | `beam-2` | draw | 0.7 |
| 3.94 | `col-3` | draw | 0.55 |
| 4.19 | `beam-3` | draw | 0.7 |
| 4.36 | `col-4` | draw | 0.55 |
| 4.61 | `beam-4` | draw | 0.7 |
| 4.90 | `brace-1` | draw | 0.7 |
| 5.05 | `brace-2` | draw | 0.7 |
| 5.20 | `brace-3` | draw | 0.7 |
| 5.35 | `brace-4` | draw | 0.7 |
| 5.40 | `dim-top` | draw | 0.9 |
| 5.30-5.54 | `bubble-1..5` (stagger 0.06 s) | fade | 0.5 |
| 5.60 | `lvl-lines` | draw | 0.8 |
| 5.70 | `dim-h` | draw | 0.9 |
| 6.00 | `lbl-L` + `cdm-leader` | draw/fade | 0.7 |
| 6.00-6.20 | `lvl-0..4` (stagger 0.05 s) | fade | 0.5 |
| 6.30 | `lbl-H` | fade | 0.5 |
| 6.40 | `title-box` | draw | 0.8 |
| 6.50 | `lbl-cdm-1` | fade | 0.5 |
| 6.60 | `lbl-cdm-2` | fade | 0.5 |
| 6.90 | `title-1` (POTONGAN A–A) | fade | 0.5 |
| 7.00 | `title-2` (Ilustrasi konsep) | fade | 0.5 |

**Loop kolom CDM** (opsional, tidak memblokir rilis; hidupkan setelah urutan di atas tuntas):
- `cdm-fill-1..5` `scaleY` 0→1→1→1→0 (keyframes 0, 0.5, 0.88, 1), origin top, durasi 9 s, delay 4.60/4.95/5.30/5.65/6.00 s, infinite, `ease: [0.45,0,0.55,1]`.
- `auger-1..5` turun dari `translateY(-106px)` ke 0 lalu naik lagi, opacity 0 di akhir, sinkron dengan fill. Varian keyframes `translateY: [-106, -106, 0, -106, -106]` dan `opacity: [1,1,1,1,0]` pada offset `[0, 0, 0.5, 0.8, 0.88]`.
- Reduced-motion: loop DIMATIKAN, kolom CDM tampil penuh terisi statis.

Lead + CTA (teks hero):
- Nama "Rezha" pakai komponen WordsPullUp dari `prisma-hero.tsx` (sudah ada), per huruf stagger 80 ms, durasi 600 ms, delay mulai 0 s.
- Eyebrow fade (opacity + translateY 10 px) delay 400 ms, durasi 600 ms.
- Panel lead + CTA fade (opacity + translateY 20 px) delay 500 ms (panel) dan 700 ms (grup CTA), durasi 600 ms, ease-out-expo.

### 3.6 Nav notch

Pembetulan dari review lead v3 no.4: nav HARUS terlihat sebagai notch yang menggantung dari tepi atas viewport, bukan pill melayang.

```
fixed top-0 left-1/2 -translate-x-1/2 z-50
bg-black border border-t-0 border-foreground/15
rounded-b-2xl md:rounded-b-3xl
px-4 md:px-8
flex gap-3 md:gap-12 whitespace-nowrap
```

Tinggi anchor: `py-3` di bawah md (target sentuh ≈ 44 px), `py-2.5` di md+. Ukuran teks: lihat bagian 4 (12 px mobile, 14 px md+). Prototipe v7 sudah ikut pola ini (`border-radius: 0 0 1rem 1rem`, `top:0`).

### 3.7 prefers-reduced-motion (WAJIB)

Satu gerbang di komponen: `const reduced = useReducedMotion()`. Perilaku:
- Tidak mount `WordsPullUp` → render nama statis sebagai teks biasa.
- Semua varian `draw`/`fade` diganti dengan `initial={false}` dan tidak ada animasi; elemen tampil penuh (`opacity:1`, `pathLength:1`).
- Loop CDM (fill + auger) **tidak dimount sama sekali**: kolom tampil terisi penuh (fill opacity .24, mata bor disembunyikan).
- Panel lead + CTA: `initial={false}` tanpa gerak; tetap tampil.
- `scroll-behavior: auto` (sudah di-handle global di `index.css` via media query nanti; jika belum, uiux tambah).

Penting: JANGAN memakai `opacity:0` lalu "mungkin" diubah — reduced-motion harus menampilkan konten, tidak menyembunyikannya.

### 3.8 Kontras — hero

| Pasangan | Rasio terukur | Syarat | Keterangan |
|---|---|---|---|
| eyebrow `foreground` di atas background near-black | 14.69:1 | 4.5 | lolos |
| nama display `foreground` di atas background | 14.69:1 | 3.0 (teks besar) | lolos |
| lead `foreground` di atas panel `bg-black/50` di depan background gelap | ≥ 12.5:1 | 4.5 | lolos (scrim 50% di atas near-black = hampir hitam) |
| pill primary: teks `background` di atas `foreground` | 14.69:1 | 4.5 | lolos |
| pill secondary: teks `foreground` di atas scrim panel | ≥ 12.5:1 | 4.5 | lolos |
| garis dimensi `accent` di atas background | 7.21:1 | 3.0 | lolos (UI non-teks) |
| label dimensi `accent` di background | 7.21:1 | 4.5 | lolos |
| grid lines foreground/.07 di background | ~1.3:1 | dekorasi | OK, bukan penanda |
| kolom struktur `foreground` stroke-width 2.5 | 14.69:1 | 3.0 | lolos |

**Bebas dari masalah hero lama**: eyebrow tidak lagi gagal di 1024–1440 karena tidak ada poster terang; latar gelap konsisten.

### 3.9 Perf + kebersihan

- `grep -c cloudfront dist/assets/*.js dist/index.html` harus = 0 (hapus semua referensi di `hero.tsx` dan jika perlu di `prisma-hero.tsx` komponen sampel; lebih baik hapus `prisma-hero.tsx` jika tak dipakai lagi, atau di-strip URL-nya).
- `poster hero-poster.jpg` boleh dihapus dari `src/assets/` (tidak dipakai lagi).
- Tidak ada `<video>` sama sekali di hero baru.
- SVG inline total ≤ 8 KB (prototipe v7 ≈ 7.2 KB sebelum gzip). Sudah termasuk mask dan 5 kolom CDM.
- framer-motion `LazyMotion` opsional; muat normal karena hero adalah above-the-fold.

### 3.10 Slot foto Unsplash (keputusan user poin 4)

File lokal `public/img/construction-1920.webp` + `construction-960.webp` (srcset; asli Unsplash 7,9 MB sudah dipindah ke luar repo) (gedung bertingkat sedang dibangun) SUDAH ada di tree. Hero tidak memakai foto ini — hero sekarang adalah SVG. Foto ini dipakai di **Sorotan** sebagai latar banding visual (bukan pengganti blueprint hero):
- Ditempatkan di kolom kanan `#sorotan` (menggantikan `MediaPlaceholder`), `aspect-[16/9]`, `rounded-2xl`, `object-cover`.
- Overlay gelap `bg-black/30` + border `border-line-strong/40` supaya tetap serasi di section `paper`. Jika section `paper` membuat foto terlalu terang, pindahkan foto ke section `#tentang` (uiux boleh pilih — lihat 6).
- Kredit di footer: `Foto: Ben Koorengevel / Unsplash`.
- Fallback: jika file hilang (404), tampilkan `MediaPlaceholder` versi ringkas yang sudah ada.

---

## 4. Navigasi notch

- Perilaku: `fixed top-0 left-1/2 -translate-x-1/2`, latar `#000000` (lebih hitam dari `background` sehingga tetap terbaca sebagai "takik" di atas foto
  dan di atas section krem), `rounded-b-2xl md:rounded-b-3xl`.
- Lima item: Tentang, Pengalaman, Sorotan, Keahlian, Kontak. Lebar teks Plex 400 dihitung (canvas, font asli):
  11 px = 217 px, 12 px = 236 px, 14 px = 276 px untuk kelima kata.
- **360 px:** 11 px (kata 217) + 4 celah `gap-3` (48) + `px-4` (32) = **297 px**. Muat dengan sisa 63 px. Teks 11 px di nav dianggap batas bawah;
  jangan turun lagi. Review v1 (diukur di browser): 12 px menghasilkan nav 316 px, muat di 320 (sisa 2 px per sisi), 13 px = 336 px dan MELUBER di 320. Batas atas di mobile = 12 px. Jangan tambah item keenam: 6 item di 360 px melewati batas.
- **768 px+:** 14 px (276) + 4 celah `gap-12` (192) + `px-8` (64) = 532 px. Aman.
- Target sentuh: `py-2` di anchor memberi tinggi sekitar 32 px (lolos WCAG 2.5.8 minimum 24). Naikkan ke `py-3` di bawah md bila tidak mengubah layout.
- Warna: item `text-foreground/80` di atas `#000` = 9.92:1 (lolos), hover/aktif `text-foreground` (15.74:1). Itu satu-satunya tempat `/80` diizinkan karena latarnya solid hitam.
- Indikator section aktif: garis bawah 2 px `accent` di bawah item (`aria-current="location"` pada link aktif), dari `IntersectionObserver`.
  Tanpa JS, tidak ada indikator, tidak ada yang rusak.

| State | Tampilan |
|---|---|
| default | `text-foreground/80`, tanpa garis |
| hover | `text-foreground`, transisi 150 ms |
| focus-visible | ring 2 px `focus` + offset 3 px (`:focus-visible` global sudah ada di `frontend.css`), radius 4 px |
| active (ditekan) | tetap `text-foreground`, garis bawah 2 px `accent` muncul (feedback tanpa ganti warna teks) |
| current section | `text-foreground` + garis bawah 2 px `accent`, `aria-current="location"` |
| disabled | tidak ada (semua link selalu aktif) |

---

## 5. Komponen

Semua status. Fokus selalu ring 2 px `focus` (`#E1E0CC`), offset 3 px, tidak pernah `outline: none`. Di atas `paper`, ring-nya `ink`.

### 5.1 Pill button (`PillLink` / `PillButton`)

Anatomi: label + lingkaran panah 36 px (40 px di sm+), padding `py-1 pl-5 pr-1`, `rounded-full`, tinggi total 44 px (48 px di sm+).

| State | Primary (`bg-foreground`, teks `background`) | Secondary (border `line-strong`, teks `foreground`) |
|---|---|---|
| default | krem solid, lingkaran `background` + panah krem | transparan, border 1 px `line-strong` (3.64:1), lingkaran krem + panah `background` |
| hover | `gap` 8 > 12 px, lingkaran scale 1.1 (250 ms, `ease-out-expo`) | sama, border menjadi `foreground` |
| focus-visible | ring 2 px krem, offset 3 px | sama |
| active | lingkaran scale 0.96, latar `#CFCEBA` (teks `background` di atasnya 12.31:1) | border `foreground`, latar `surface-2` |
| disabled | `opacity-45`, `cursor-not-allowed`, `aria-disabled`, tanpa hover. Kontras tidak dipersyaratkan untuk disabled, tetapi tetap terbaca | sama |
| loading (hanya WhatsApp/kirim jika dipakai) | label tetap, lingkaran memutar ikon `Loader` 1 putaran/800 ms; reduced-motion: ganti jadi teks "Membuka..." |

Teks tombol primary: `#0B0C0A` di atas `#E1E0CC` = 14.69:1. Teks secondary di atas foto hero: wajib di dalam panel scrim (bagian 3).

### 5.2 Nav item: lihat bagian 4.

### 5.3 Label section

Pola: `01` (angka, `text-subtle`, tabular) + garis 24 px `line-strong` + nama (`text-label`, uppercase, `text-subtle`). Contoh: `02 ── PENGALAMAN`.
Warna `subtle` 7.37:1. Di `paper`: `ink-subtle` 6.53:1. Statis, bukan interaktif: tidak ada hover/active. Tag HTML `<p>`, bukan heading.
Angka mengikuti urutan peta section (Tentang 01, Pengalaman 02, Sorotan 03, Keahlian 04, Organisasi 05, Kontak 06).

### 5.4 Timeline entry

Satu entri = satu `<article>` di dalam `<ol>` (urutan terbaru ke lama, itu memang urutan bermakna).

- Mobile (di bawah lg): rel vertikal 1 px `line-strong` di kiri (`left-[7px]`), marker lingkaran 15 px di rel (`border 1px line-strong`, isi `background`),
  isi menjorok `pl-8`. Tahun di atas peran.
- lg+: kolom kiri (`col-span-3`) berisi tahun `text-h3` di `foreground`, `tabular-nums`, `sticky top-24`; kolom kanan (`col-span-8`) berisi peran, perusahaan, tempat, isi.
  Rel tetap 1 px di antara kolom, marker di titik awal kolom kanan.
- Isi: peran `text-h3` `foreground` > perusahaan `text-body` `muted` (+ tempat `text-caption` `subtle` pada baris sendiri) > isi `text-body` `muted` `max-w-copy`.
- Entri Patimban (2023) diberi tanda "proyek utama": marker terisi `accent` dan label kecil `text-label` `accent` "Pelabuhan Patimban". Satu-satunya aksen warna di timeline.

| State | Tampilan |
|---|---|
| default | marker kosong (border `line-strong`), teks seperti di atas |
| hover | **tidak ada.** Entri bukan elemen interaktif; hover yang menyiratkan klik menipu. Kursor tetap default |
| focus | tidak fokus (tidak ada kontrol). Jika ada link di dalamnya (mis. tautan JV), link itu mendapat ring standar |
| active / disabled | tidak berlaku |
| reveal masuk | fade + naik 16 px, 600 ms, sekali. Reduced-motion: langsung tampil |

### 5.5 Fact chip (strip "Tentang proyeknya")

Dipakai di Sorotan CDM. **Harus** berlabel "Tentang proyeknya" supaya angka tidak terbaca sebagai capaian pribadi Rezha (aturan BRIEF).

- Anatomi: kartu `paper-2` `rounded-2xl` `p-5`, angka `text-h3` Bricolage `accent-ink` (`tabular-nums`), label `text-caption` `ink-muted`.
  Di bawah strip, satu baris sumber `text-caption` `ink-subtle`: "Sumber: Wikipedia, Patimban Deep Sea Port".
- Tiga chip: `654 ha` area pelabuhan · `~145 km` dari Jakarta · `20 Des 2020` fase 1 diresmikan. Mobile: tumpuk satu kolom. md+: tiga kolom setara.
- Kontras: `accent-ink` di `paper-2` 5.35:1, `ink-muted` di `paper-2` 6.04:1.

| State | Tampilan |
|---|---|
| default | seperti di atas |
| hover / active / disabled | **tidak ada** (statis). Alasan sama dengan timeline |
| focus | tidak fokus |

### 5.6 Skill group

Tiga kelompok: "Desain & hitungan", "Lapangan", "Bahasa". Bukan tiga ikon berjejer (dilarang BRIEF). Pakai tiga kolom bertepi atas `border-t line-strong`
dengan judul `text-h3` lalu daftar teks polos.

- Software (AutoCAD, SketchUp, SAP2000, Photoshop): chip `rounded-full`, border `line-strong`, teks `foreground` 14 px, `surface-2` saat hover.
  Chip bukan tombol; hover hanya penanda baca, tanpa kursor pointer.
- Lapangan: daftar vertikal teks `muted` dengan penanda garis pendek 12 px `accent` di kiri tiap baris (bukan bullet disc).
- Bahasa: "Indonesia", "English". **Tanpa label tingkat** (fakta tidak memberi tingkat).

| State | Tampilan |
|---|---|
| default | chip border `line-strong`, latar transparan |
| hover | latar `surface-2`, border `foreground` (150 ms). Murni visual |
| focus | chip tidak fokus. Jika Agent 2 menjadikannya fokus (tidak disarankan), ring standar |
| active / disabled | tidak berlaku |

### 5.7 Contact link

Tiga bentuk, urut prioritas: **Email** (`mailto:rezhahs@gmail.com`), **WhatsApp** (tombol; nomor dirakit hanya saat klik, sesuai BRIEF pertanyaan 2), alamat (teks polos, bukan link).

- Email dan WhatsApp: baris besar selebar penuh kolom. Teks `text-h3` Bricolage `foreground`, panah kanan-atas di ujung, `border-b line-strong`, tinggi minimal 64 px (target sentuh besar).
  Email diberi tautan teks sebenarnya (bukan "klik di sini").

| State | Tampilan |
|---|---|
| default | teks `foreground`, garis bawah 1 px `line-strong`, panah `subtle` |
| hover | garis bawah berubah `accent`, teks tetap `foreground`, panah bergeser 4 px ke kanan-atas (150 ms; reduced-motion: tanpa geser) |
| focus-visible | ring 2 px `focus`, offset 3 px mengelilingi seluruh baris |
| active | garis bawah `accent-press`, panah kembali ke posisi 0 px |
| disabled | tidak ada. Jika WhatsApp belum dikonfigurasi, jangan tampilkan barisnya (jangan tampilkan tombol mati) |
| setelah klik email | tidak ada perubahan; browser membuka mail client |

Teks `foreground` di `surface` (#141510) 13.75:1. Alamat: `text-caption` `subtle` + hobi satu kalimat di bawahnya.

---

## 6. Empty state "foto proyek belum ada"

Dipakai di Pengalaman (satu bingkai di bawah entri Patimban) dan Sorotan (di samping penjelasan CDM). Jujur, bukan foto palsu, bukan stok.

- Bingkai `aspect-[4/3]` (mobile 16/10), `rounded-2xl`, `border border-dashed line-strong`, latar `surface`.
- Isi latar: pola kertas milimeter, murni CSS (tanpa gambar): dua `linear-gradient` garis 1 px `line` tiap 24 px, `aria-hidden`.
  Tidak ada ilustrasi alat berat, topi proyek, atau tangan. Pola ini menyebut dirinya sendiri: lembar gambar yang belum diisi.
- Teks di tengah: judul `text-h3` `foreground` **"Dokumentasi proyek menyusul"**; di bawahnya `text-caption` `subtle`
  "Belum ada foto di halaman ini." (satu kalimat, tanpa janji tanggal). Pojok kiri atas: label `text-label` `subtle` "Foto proyek".
- Semantik: `<figure>` dengan `<figcaption>` berisi teks yang sama; elemen pola tidak punya alt (dekoratif). Bukan `role="img"` supaya teks terbaca pembaca layar.
- State: statis (tidak interaktif). Tidak ada hover.
- Kontras: judul 13.75:1, caption `subtle` di `surface` 5.89:1, garis putus-putus `line-strong` di `surface` 3.41:1 (lolos 3:1).
- Di `paper`: latar `paper-2`, garis putus `ink-line-strong`, teks `ink` / `ink-subtle` (5.87:1 di paper-2).
- Aturan keras: bingkai ini **harus** diganti foto asli begitu user memberi file, dan tidak boleh diisi gambar yang tampak seperti hasil kerja Rezha.

Foto pasfoto 199x270 px: maksimal 160 px lebar (BRIEF). ~~Pasang di Tentang/Kontak sebagai lingkaran 96-128 px~~ (diganti bagian 10: foto utama `reza-cutout.webp` di hero, avatar bulat dihapus dari Tentang). Jangan di-upscale.

---

## 7. Checklist aksesibilitas (angka dihitung)

Semua dihitung dengan rumus WCAG. Teks normal butuh 4.5:1, teks besar (>= 24 px atau >= 18.66 px bold) dan komponen UI butuh 3:1.

| Pasangan | Rasio | Syarat | Hasil |
|---|---|---|---|
| `foreground` / `background` | 14.69 | 4.5 | lolos (AAA) |
| `foreground` / `surface` | 13.75 | 4.5 | lolos |
| `muted` / `background` | 8.14 | 4.5 | lolos (AAA) |
| `muted` / `surface-2` | 7.05 | 4.5 | lolos (AAA) |
| `subtle` / `background` | 7.37 | 4.5 | lolos |
| `subtle` / `surface-2` | 6.38 | 4.5 | lolos |
| `accent` / `background` | 7.21 | 4.5 | lolos |
| `accent` / `surface-2` | 6.24 | 4.5 | lolos |
| `accent-hover` / `background` | 8.78 | 4.5 | lolos |
| `ink` / `paper` | 14.69 | 4.5 | lolos |
| `ink-muted` / `paper-2` | 6.04 | 4.5 | lolos |
| `ink-subtle` / `paper-2` | 5.87 | 4.5 | lolos |
| `accent-ink` / `paper` | 5.94 | 4.5 | lolos |
| `accent` / `paper` | 2.04 | 4.5 | **gagal, dilarang dipakai sebagai teks di paper** |
| `line-strong` / `background` | 3.64 | 3.0 (UI) | lolos |
| `line-strong` / `surface` | 3.41 | 3.0 (UI) | lolos |
| `ink-line-strong` / `paper` | 3.44 | 3.0 (UI) | lolos |
| `line` / `background` | 1.27 | - | dekoratif saja, bukan penanda state |
| focus `#E1E0CC` / `background` | 14.69 | 3.0 | lolos |
| focus / foto gelap `#1B1B1B` | 12.91 | 3.0 | lolos |
| nav `foreground/80` / `#000` | 9.92 | 4.5 | lolos |
| teks tombol primary: `background` / `foreground` | 14.69 | 4.5 | lolos |
| lead hero di atas poster, **tanpa scrim** (piksel terburuk) | 2.57 | 4.5 | **gagal** |
| lead hero dengan scrim `bg-black/50` (piksel terburuk) | 7.17 (poster), 7.26 (video) | 4.5 | lolos, wajib |
| nama display di atas poster (persentil 95) | 7.62 | 3.0 | lolos; ~1-2% piksel < 3:1, diterima (lihat bagian 3) |

Daftar periksa implementasi:
- [ ] `<html lang="id">` (sudah ada). Satu `<h1>` (nama), `<h2>` per section, `<h3>` untuk peran/kartu, tanpa loncat level.
- [ ] Link lewati-ke-konten (`skip-link`, sudah ada) menuju `#tentang` atau `<main>`.
- [ ] `:focus-visible` ring 2 px `focus` offset 3 px di semua elemen interaktif, termasuk di atas `paper` (ganti ke `ink`). Tidak ada `outline: none` tanpa pengganti.
- [ ] `prefers-reduced-motion`: bagian 2.7. Diuji dengan emulasi di DevTools.
- [ ] Video hero: `aria-hidden`, `muted`, tanpa suara, tanpa kontrol; tidak dipasang di reduced-motion, saveData, atau < 768 px.
- [ ] Gambar bermakna punya `alt` nyata (foto pasfoto). Gambar dekoratif `alt=""` (poster hero, pola kertas milimeter).
- [ ] Warna bukan satu-satunya penanda: link di paragraf bergaris bawah; section aktif di nav punya garis bawah, bukan hanya warna.
- [ ] Target sentuh >= 44 px untuk pill dan baris kontak; nav >= 32 px (minimum WCAG 2.5.8 = 24).
- [ ] Zoom 200% dan reflow di 320 px lebar tanpa scroll horizontal. Nav 297 px (dihitung dari lebar teks terukur) muat di 360 dan di 320 (sisa 23 px). Perhitungan, belum diuji di browser.
- [ ] Teks kontak dan email asli di DOM, bukan di dalam gambar. Nomor telepon tidak ada di HTML statis (dirakit saat klik).
- [ ] Tidak ada konten yang hanya muncul saat hover.

---

## 8. Yang diminta ke frontend (ringkas)

Baru (Phase 2 — hero baru + fix review tertunda):

1. **Ganti `hero.tsx` sepenuhnya** sesuai bagian 3. Hapus semua referensi `cloudfront`, `hero-poster.jpg`, `<video>`. Pakai SVG inline + framer-motion. `prisma-hero.tsx`: boleh dihapus kalau tidak ada yang mengimpornya lagi (periksa `grep -r "prisma-hero" src/`); kalau masih dipakai hanya untuk `WordsPullUp`, pindahkan hook kecil itu ke `components/ui/words-pull-up.tsx` dan buang sisanya.
2. **Fix 6 (uiux [23:50])** — Organisasi: periode "2017–2018" ganti dari `text-h3` display ke `text-body tabular-nums text-subtle`. Peran tetap `text-h3`. Tahun di Pengalaman tetap display (penanda utama).
3. **Fix 7 (uiux [23:50])** — Kontak: Email jadi baris utama (`text-h3`), WhatsApp jadi PillLink tersendiri di bawahnya (bukan baris sejajar). Panah ↗ di baris email naik ke 16 px. Baris pertama (email) tambahkan `border-t line-strong` agar daftar tertutup di kedua sisi.
4. **Fix 8 (uiux [23:50])** — Keahlian: Bahasa pakai pill `rounded-full border line-strong` seperti "Desain & hitungan". Lapangan tetap daftar teks dengan penanda garis pendek `accent` di kiri.
5. **Foto Unsplash**: masukkan `public/img/construction-1920.webp` (srcset 960w/1920w) ke `#sorotan` sesuai bagian 3.10 — gantikan `MediaPlaceholder` di kolom kanan Sorotan. Caption kecil `text-caption text-ink-subtle`: `Foto: Ben Koorengevel / Unsplash`. Alt: `Gedung bertingkat dalam masa konstruksi`.
6. Pastikan `id="beranda"` di `<section>` hero. `#organisasi` section tetap seperti sekarang.
7. Verifikasi akhir sebelum "dist stable":
   - `grep -c cloudfront dist/assets/*.js dist/index.html` = 0
   - `grep -c "<video" dist/assets/*.js dist/index.html` = 0 pada hero (jika `prisma-hero.tsx` masih ada tapi tidak dipakai, build akan tetap bersih karena tree-shake)
   - Playwright 360/768/1440: nol error konsol, no horizontal scroll, Bricolage + Plex loaded, hero SVG di DOM dengan ≥ 30 path (kolom + beam + brace + strata + dim), CDM accent color `#e0865a` ada di ≥ 5 elemen.
   - reduced-motion: semua motion mati, SVG tampil penuh terisi.

Yang sudah selesai dari Phase 1 (tidak perlu disentuh):
- Token warna, font self-host, skala tipografi, scale spasi (ada di `src/index.css @theme`).
- Panel scrim lead, tracking `-0.045em`, `text-display`.
- Section Sorotan `bg-paper text-ink`, peran `ink-*`, `accent-ink`.
- `id="beranda"` dan `#organisasi` ada.
- Frame kosong `MediaPlaceholder` (tetap sebagai fallback foto Unsplash).
- Nav 12 px mobile, 14 px md+. (v7 nav notch sudah di-spec di 3.6 — frontend terapkan juga.)
- `duration-150`, `duration-250`, `duration-[600ms]` (bukan `duration-fast/slow`).

## 9. Batas pengetahuan

- Kontras teks di atas video dihitung dari 12 frame dalam 10 detik; hasil identik di semua frame untuk area lead, jadi dianggap stabil, tetapi bukan jaminan untuk setiap
  piksel di setiap codec/ukuran layar. Panel scrim 50% memberi margin lebar (7.17:1 vs syarat 4.5).
- Warna dan font belum dilihat dalam build penuh; peninjauan visual di 360/768/1440 dilakukan di langkah 4 setelah Agent 2 menyelesaikan section.
- Foto proyek, gambar kerja, render SketchUp: belum ada. Frame kosong adalah pengganti jujur, bukan pengganti permanen.


---

## 10. Hero portrait + motion system v2 (uiux -> frontend)

Tugas dari user via lead: foto `reza-cutout` jadi **foto profil utama** (bukan avatar bulat di Tentang), overlay berlapis non-lingkaran, parallax scroll di
semua section, efek mouse modern. Implementasi pakai framer-motion + primitive yang sudah dibuat frontend (commit 74285a9): `ParallaxLayer`,
`useParallax`, `usePointerMotion`, `Magnetic`, `CursorSpotlight`. **Tanpa dependency baru.** Tidak ada GSAP: ScrollTrigger tidak dibutuhkan, semua cukup
`useScroll` + transform.

**Prototipe hidup (acuan visual, bukan kode produksi):** `docs/prototypes/hero-portrait-v2.html`. Buka lewat server statis dari root repo
(`python3 -m http.server`, lalu `/docs/prototypes/hero-portrait-v2.html`). Semua angka di bawah diambil dari render prototipe itu di 360/390/768/1024/1280/1440/1920,
bukan perkiraan. Jika spec dan prototipe beda, spec menang. Mouse effect di prototipe memakai nilai yang sama dengan tabel 10.4.

**Menggantikan** (bagian lama tetap ada sebagai jejak): bagian 2.7 kalimat "Tidak ada parallax", bagian 6 kalimat foto pasfoto lingkaran di Tentang
(`reza-avatar.webp` tidak dipakai lagi di Tentang), bagian 3.1 posisi blueprint lg+ (kini 10.1.3).

### 10.0 Aset dan fakta (kontrak)

| Aset | Ukuran | Dipakai | Catatan |
|---|---|---|---|
| `/img/reza-cutout.webp` | 900x1355, RGBA, 142 KB | hero, srcset 900w | rasio 1 : 1,5056. Alpha menyentuh tepi kiri/kanan/bawah (bahu dan lengan terpotong frame foto), jadi **wajib di-mask** (10.2) |
| `/img/reza-cutout-600.webp` | 600x903, RGBA, 79 KB | hero, srcset 600w | |
| `/img/reza-avatar.webp` | 320x320 | tidak ada lagi di UI | hapus dari repo kalau tidak ada pemakai lain (hemat 16 KB) |

Markup gambar hero (satu-satunya `<img>` besar di atas lipatan):

```html
<img src="/img/reza-cutout.webp"
     srcset="/img/reza-cutout-600.webp 600w, /img/reza-cutout.webp 900w"
     sizes="(min-width:1024px) min(30vw,600px), (min-width:768px) 40vw, 60vw"
     width="900" height="1355" loading="eager" fetchpriority="high" decoding="async"
     alt="Foto Rezha Herbi Saputra, memakai helm safety dan life vest">
```

Tambahan di `index.html` (frontend): `<link rel="preload" as="image" href="/img/reza-cutout.webp" imagesrcset="/img/reza-cutout-600.webp 600w, /img/reza-cutout.webp 900w" imagesizes="(min-width:1024px) min(30vw,600px), (min-width:768px) 40vw, 60vw" fetchpriority="high">`.
Ruang gambar dipesan lewat `aspect-ratio` + `width/height` (CLS 0).

Fakta foto yang **boleh** ditulis: orang memakai helm safety putih dan life vest (terlihat jelas di foto). **Tidak boleh**: menyebut lokasi atau proyek foto diambil
(tidak diketahui), membaca tulisan/logo di helm (tidak terbaca jelas), klaim sertifikat K3. Chip "K3" hanya melabeli alat pelindung diri yang tampak. Semua teks chip
hanya fakta dari BRIEF/CV (10.6), tidak ada angka baru.

### 10.1 Komposisi hero

#### 10.1.1 Layer (z-index lokal di `<section>` hero: `relative isolate overflow-clip`)

| z | Layer | Isi | Parallax scroll | Mouse depth (px di tepi viewport, x,y) |
|---|---|---|---|---|
| 0 | `HeroGridBg` | grid 40 px (bagian 3.2) | speed 0,08, max 30 | -6, -4 |
| 1 | Blueprint | SVG rangka + CDM (3.3), viewBox baru 10.1.3 | speed 0,14, max 48 | -10, -6 |
| 2 | Spotlight | `CursorSpotlight scope="parent" size=560`, accent 0,14 | tidak ada | mengikuti kursor |
| 3 | **Stage** (stacking context sendiri) | frame arch + cutout + strip tanah + chip | speed -0,05, max 24 (ke depan, sedikit lebih cepat dari halaman) | tilt (10.4), chip +8, +4 |
| 6 | Grain | `.noise-overlay` opacity 0,7 overlay (sudah ada) | - | - |
| 10 | Konten | eyebrow, `h1`, panel lead + CTA | **tidak ada** (teks tidak pernah diparalaks) | - |
| 50 | Nav notch | fixed | - | - |

Di dalam Stage (z lokal): frame 0 < cutout 1 < strip tanah 5 < datum/bracket 12 < chip 13. Stage dipaksa membuat stacking context (`position:absolute; z-index:3`),
jadi chip otomatis di bawah grain (6) dan konten (10): tidak ada chip yang menutupi teks.

**Aturan scroll parallax hero:** foto, frame, strip tanah, dan chip bergerak sebagai **satu grup** (satu transform di Stage). Titik jangkar chip
ke foto tidak boleh bergeser relatif. Hanya grid dan blueprint punya transform sendiri.
**Permintaan ke frontend:** hero harus nol di `scrollY = 0`. `useParallax` sekarang nol saat elemen di tengah viewport. Tambah opsi `zeroAt: "start"` untuk hero
(offset `["start start","end start"]`, `y = p * travel * speed`), supaya komposisi tidak bergeser sebelum pengunjung menggulung.

#### 10.1.2 Ukuran Stage

Variabel CSS di hero: `--W` (lebar stage = lebar foto) dan `--inset` (jarak ke tepi kanan). Tinggi foto = `W x 1,5056`. Tinggi Stage = foto + 3 rem (strip tanah).

| Viewport | `--W` | `--inset` | Hasil terukur |
|---|---|---|---|
| < 768 | `clamp(200px, 60vw, 300px)` | - (di tengah) | 360 -> 216 px, 390 -> 234 px |
| 768-1023 | `clamp(280px, 40vw, 360px)` | - (di tengah) | 768 -> 307 px |
| >= 1024 | `clamp(320px, min(30vw, (100svh - 9rem) / 1.5056), 600px)` | `clamp(16px, 4vw, 72px)` | 1024 -> 320, 1280x720 -> 383, 1440x900 -> 432, 1920x1080 -> 576 |

Suku `(100svh - 9rem)/1.5056` mencegah foto lebih tinggi dari layar di laptop pendek. Lantai `W` = 320 px di lg+: pada layar pendek (mis. 1024x600) foto sedikit melewati tepi bawah hero (dipotong `overflow-clip`), nav z-50 tetap di atas helm.

#### 10.1.3 Layout (ASCII)

Desktop >= 1024 (contoh 1440x900; koordinat dari render):

```
 hero 1416x884, rounded-[2rem]
 +----------------------------------------------------------------------------------------+
 |                               [ nav notch z50 ]                                        |
 | z0 grid 40px (mask elips)                                              .-----.         |
 |  +-- z1 BLUEPRINT --------------------------------+                  /  ^    \        |
 |  | L = 24,00 m   (A)(B)(C)(D)(E)                  |   z2 glow       |  helm   |--[K3 Helm safety]
 |  |  +--+--+--+--+  rangka 4 lantai,                |   (ikut kursor) +---------+         |
 |  |  +--+--+--+--+  ujung kanan masuk ke balik     |               .-'  ARCH z3 '-.      |
 |  |  |  |  |  |  |  bahu orang                      |              /   (frame +      \     |
 |  |  ~~~~ tanah + kolom CDM (accent) ~~~~           |  [K3 Life vest]--*  cutout)     \    |
 |  +-------------------------------------------------+              |                 |    |
 |   TEKNIK SIPIL . TANGERANG                           [2025 Site Supervisor]--o  (>=1600) |
 |   R e z h a   <- display 304px, z10 (teks, tanpa parallax)  [2023 Marine CDM]--o        |
 |   +- panel lead z10 --+                              |_________|__ +/-0,00 ___|_|      |
 |   | lead + 2 pill      |                             /////// strip tanah (hatch) ///     |
 |   +--------------------+                                                                 |
 +----------------------------------------------------------------------------------------+
```

Koordinat 1440x900 (px dari kiri-atas viewport): stage x 938-1370, y 198-896; chip Helm x 1193-1327; teks "Rezha" berhenti x ~745; panel x 52-596, y 689-872; nol overlap
antara chip dan teks/panel. Blueprint (lg+): `left:1.5rem; right: calc(var(--inset) + var(--W) * .34); top:3.5rem; bottom:30%`, dengan `mask-image: linear-gradient(90deg,#000 0,#000 80%,transparent 100%)`;
SVG `viewBox="200 0 700 560"`, `preserveAspectRatio="xMaxYMid meet"` (ujung kanan menempel ke foto, lihat 10.2). Elemen blueprint di sisi kanan
(`dim-h`, `lbl-H`, `cdm-leader`, `lbl-cdm-1/2`, `soil-1/2/3`, `title-box`, `title-1/2`: x > 900) **dibuang** di v2 (tandai `data-hide="side"`). Teks kecil
"Ilustrasi konsep, tanpa skala" (12 px, `subtle`) pindah ke bawah kiri kotak blueprint, lg+ saja.

Tablet 768-1023 dan mobile < 768 (satu kolom, stage di aliran, `padding-top: 4.5rem` pada hero):

```
 +-----------------------+
 |  [ nav notch ]        |
 |  z1 blueprint (bpbox: left0 right0 top 4.5rem,
 |     tinggi = W x 1,5056 x .82, opacity .85,
 |     mask 90deg: transparent > #000 14% > #000 86% > transparent)
 |        .-----.        |
 |  [K3 Helm]-/ helm \   |   stage di tengah (margin 0 auto)
 |     .-'  ARCH   '-.   |   chip: hanya Helm + Life vest, tanpa sub-label
 |  [K3 Life vest]-* ... |   tanpa chip peran, tanpa tilt/spotlight
 |  +/-0,00 ///strip///  |
 |  TEKNIK SIPIL . TANGERANG
 |  Rezha
 |  +- panel lead -----+ |
 +-----------------------+
```

Blueprint di bawah lg memakai `viewBox="320 0 560 520"` dan `preserveAspectRatio="xMidYMid meet"` (seperti 3.3). Urutan DOM = urutan baca: nav, stage, eyebrow, `h1`, panel.
Hasil terukur: 390x844 stage y 80-480, eyebrow dan `h1` y 517-595, panel y 611-848, scrollWidth = 390 (tanpa scroll horizontal) di semua viewport yang diuji.
Tablet (768): seni di tengah, teks rata kiri. Ini **diterima**, belum dioptimalkan (teks boleh dipusatkan lewat `md:max-w-xl md:mx-auto`, tidak diuji).

### 10.2 Spec overlay per layer

| Layer | Bentuk (clip / mask) | Warna (token) | Blend / catatan |
|---|---|---|---|
| **Frame arch** | `border-radius: 999px 999px 0 0` (setengah kapsul, bukan lingkaran), `top = W x 0,21`, tanpa sisi bawah. Border 1 px `line-strong` (3,64:1 vs background). Garis dalam: inset 10 px, 1 px `accent` alpha 0,55 | isi: `linear-gradient(180deg, surface-2 / 0,78 -> background / 0,62)` + `radial-gradient(ellipse 70% 55% at 50% 38%, accent / 0,12, transparent 70%)`. Mobile/tablet: gradient diperingan (0,42 -> 0,30) supaya blueprint di belakang tetap terbaca | `::after` kisi 24 px `foreground` alpha 0,06, mask `linear-gradient(#000 40%, transparent 95%)` |
| **Cutout** | wadah `overflow:hidden` setinggi foto, `bottom: 3rem`. **Mask komposit**: `linear-gradient(90deg, transparent 0, #000 14%, #000 86%, transparent 100%)` ∩ `linear-gradient(180deg, #000 80%, transparent 100%)` (`mask-composite: intersect` + `-webkit-mask-composite: source-in`). Ini yang menyembunyikan potongan keras bahu kiri/kanan dan paha di tepi bawah | `filter: sepia(.14) saturate(.92) contrast(1.03)` statis, menyamakan foto yang dingin dengan palet krem/terakota | tanpa `mix-blend-mode` pada foto (menghindari halo di tepi alpha). Helm menembus puncak arch (puncak helm ~ 3% tinggi foto, arch mulai 21% lebar) = efek pop-out |
| **Strip tanah** | kotak 3 rem, melebar 1,5 rem keluar kiri-kanan. Garis atas 1 px `foreground` alpha 0,75 (datum `±0,00`) | isi `rgb(11 12 10 / .55 -> .92)` vertikal; arsir 135 derajat, 1 px tiap 9 px, `foreground` alpha 0,4, di-mask memudar ke bawah | menutup kaki foto yang memudar: orang "berdiri" di garis tanah |
| **Datum + bracket** | label `±0,00` 12 px `foreground`, `right: 1.25rem`, di bawah garis. Dua bracket L 18 px, 1,5 px, `foreground` alpha 0,8 di ujung garis | - | label bertumpuk 5,0:1 terhadap arsir terburuk |
| **Chip + leader** | kotak `rounded-lg` (8 px), border 1 px `line-strong`, latar `background` alpha 0,92. Leader 1 px `accent` alpha 0,95; titik 7 px dengan halo 3 px `background` alpha 0,7 | teks `foreground` 14 px / bobot 500; tag `accent` 12 px / 600 / border 1 px `accent`; sub-label `subtle` 12 px | **dot terisi** = alat di tubuh (K3). **dot kosong** (border 1,5 px `accent`, isi `background`) = riwayat kerja, ditaruh di tepi arch, bukan di tubuh |
| **Blueprint** | seperti 10.1.3, tepi kanan di-fade 20 % | token 3.3 tidak berubah | `preserveAspectRatio xMaxYMid` membuat rangka berakhir di balik bahu orang, memberi kedalaman (rangka belakang, orang tengah, chip depan) |
| **Panel lead** | tetap `rounded-2xl backdrop-blur-sm` | **naik dari `bg-black/50` ke `bg-black/70`**: garis blueprint krem yang lewat di belakang panel memberi kontras teks 4,08:1 (gagal) pada /50, 7,82:1 pada /70 | scrim wajib, bagian 3.4 diperbarui |
| **Grain** | `.noise-overlay` seluruh hero | tidak berubah | tetap di atas foto: menyatukan foto dengan latar |

Jangkar chip (persentase kotak foto, origin kiri-atas; sama untuk semua viewport):

| Chip | Dot | Sisi chip | Lead | Tampil |
|---|---|---|---|---|
| K3 Helm safety | (52 %, 11 %) di sisi helm | kanan | 30 px (26 px < 1024) | semua |
| K3 Life vest | (40 %, 62 %) di dada/vest | kiri | >= 1440: `W x 0,40 + 28px` (chip keluar dari arch, tidak menutupi lengan). 1180-1439: `W x 0,40 - 16px`, tanpa sub-label. < 1024: 26 px | disembunyikan di 1024-1179 (menabrak "Rezha" dan panel) |
| 2025 Site Supervisor | (1 %, 37 %) di tepi arch | kiri | 30 px | >= 1600 saja |
| 2023 Marine CDM | (1 %, 47 %) di tepi arch | kiri | 30 px | >= 1600 saja |

Alasan batas 1600: di 1440 kedua chip peran berjarak < 20 px dari ujung "a" pada "Rezha" (terukur). Di 1600+ jaraknya aman.

**Kontras terhitung (WCAG 2.x):** chip (latar `background` / 0,92 di atas piksel putih terburuk = `#1F1F1E`): teks `foreground` 12,36:1; `accent` 6,07:1; `subtle` 6,20:1.
Di atas piksel khaki baju: 13,63 / 6,69 / 6,84. Semuanya >= 4,5. Border chip `line-strong` terhadap background 3,64:1 (lolos 3:1 non-teks). Chip `aria-hidden` (duplikasi alt foto dan Pengalaman), ukuran 12 px diperbolehkan karena dekoratif.

### 10.3 Parallax scroll per section

Semantik kolom mengikuti `useParallax`/`ParallaxLayer`: `speed` positif = layer duduk di belakang (bergeser lebih lambat dari halaman), negatif = di depan (lebih cepat).
`y = clamp((p - 0,5) x (innerHeight + tinggiElemen) x speed, ±maxPx)`, nol saat elemen di tengah viewport (kecuali hero: 10.1.1). **Mobile = < 1024 px**: nilai `max` dibagi dua,
hanya layer bertanda `M` yang dipasang, sisanya tidak dirender.

Aturan wajib semua section:
1. Section wajib `relative isolate overflow-clip`, **bukan `overflow-hidden`** (`overflow:hidden` mematikan `position:sticky` pada tahun di Pengalaman). `clip` memotong layer yang bocor ke section tetangga tanpa membuat scroll container.
2. Layer dekoratif: `aria-hidden`, `pointer-events-none`, `z-0`; konten section `relative z-10`.
3. **Teks, tombol, kartu fakta tidak pernah diparalaks.** Hanya layer dekoratif dan satu foto (Sorotan).
4. Layer dekoratif yang bisa berada di belakang teks: warna alpha <= 0,12 (`foreground` di atas `background`/`surface`; `ink` di atas `paper`). Terhitung: garis `foreground` 0,12 di `background` -> `muted` 6,39:1, `subtle` 5,78:1; 0,12 di `surface` -> `muted` 5,75, `subtle` 5,21; `ink` 0,12 di `paper-2` -> `ink-muted` 4,72:1. Semua >= 4,5.
5. Maks 3 layer bergerak per section (6 aktif di viewport). Hanya `transform`. `will-change` hanya saat dekat viewport (sudah di `ParallaxLayer`).
6. `smooth` (spring) aktif untuk layer dekoratif; **mati** untuk foto Sorotan (tanpa gerak bergoyang di dalam bingkai).

Motif dekoratif (semua SVG/CSS buatan sendiri, tanpa aset baru, warna dari token):
`ghost-numeral` = nomor section (`01`..`06`) font display, `fill: transparent`, `-webkit-text-stroke: 1px foreground / 0,12`, ukuran `clamp(10rem, 28vw, 24rem)`;
`dim-line` = garis dimensi vertikal 1 px dengan tick 10 px (`accent` / 0,5, tanpa angka);
`grid-patch` = kisi 24 px alpha 0,06 dengan mask radial;
`axis-bubbles` = lingkaran 22 px berhuruf A-E seperti blueprint (`foreground` / 0,12);
`strata` = tiga garis gelombang dari blueprint (`foreground` / 0,12);
`pile-columns` = lima kolom CDM outline (di paper: `ink-line-strong`; di gelap: `accent` / 0,5);
`hatch-band` = arsir 135 derajat;
`arch-rings` = tiga arch konsentris (gema frame hero).

| Section | Layer | Motif | Speed | Arah | Max px (desk / M) | M |
|---|---|---|---|---|---|---|
| **Hero** `#beranda` | grid | `HeroGridBg` | 0,08 | belakang | 30 / 15 | ya |
| | blueprint | SVG rangka | 0,14 | belakang | 48 / 24 | ya |
| | stage (foto+frame+chip, satu grup) | - | -0,05 | depan | 24 / 12 | ya |
| **Tentang** `#tentang` | ghost `01`, kanan atas | ghost-numeral | 0,20 | belakang | 90 / 45 | ya |
| | garis dimensi di gutter kiri sejajar judul | dim-line | -0,06 | depan | 36 / - | tidak |
| | kisi di belakang paragraf | grid-patch | 0,10 | belakang | 50 / - | tidak |
| **Pengalaman** `#pengalaman` | ghost `02` | ghost-numeral | 0,20 | belakang | 90 / 45 | ya |
| | tiga garis gelombang di tepi kanan | strata | 0,12 | belakang | 60 / - | tidak |
| | kolom CDM kecil di samping entri Patimban (satu-satunya aksen terakota di bagian ini) | pile-columns (satu kolom) | -0,10 | depan | 30 / - | tidak |
| **Sorotan** `#sorotan` (paper) | foto konstruksi *di dalam* bingkai: gambar `h-[118%]`, `translateY` + `scale(1.08)`, `smooth=false` | foto | 0,12 | belakang | 36 / 18 | ya |
| | lima kolom CDM outline di belakang kartu fakta | pile-columns | 0,15 | belakang | 60 / - | tidak |
| | ghost `03` (stroke `ink` / 0,08) | ghost-numeral | 0,20 | belakang | 90 / 45 | ya |
| **Keahlian** `#keahlian` | ghost `04` | ghost-numeral | 0,20 | belakang | 90 / 45 | ya |
| | baris gelembung sumbu A-E | axis-bubbles | 0,12 | belakang | 50 / - | tidak |
| | pita arsir di dasar section | hatch-band | -0,08 | depan | 30 / - | tidak |
| **Organisasi** `#organisasi` (compact) | ghost `05`, skala 0,6 | ghost-numeral | 0,16 | belakang | 50 / 25 | ya |
| | garis sumbu putus-putus horizontal | dim-line (horizontal) | 0,10 | belakang | 40 / - | tidak |
| **Kontak** `#kontak` (surface) | arch konsentris kanan-bawah | arch-rings (`line-strong` / 0,35) | 0,16 | belakang | 80 / 40 | ya |
| | ghost `06` | ghost-numeral | 0,20 | belakang | 90 / 45 | ya |
| **Footer** | tidak ada | - | - | - | - | - |

Footer sengaja tanpa parallax: BRIEF meminta penutup yang tenang.
Parallax foto Sorotan: kotak foto tetap `aspect-[16/9] overflow-hidden rounded-2xl`; gambar di dalam setinggi 118 % supaya tidak ada celah di tepi saat bergeser (36 px max pada tinggi ~ 300 px = 12 %, muat).
Foto Sorotan memakai srcset `construction-960.webp 960w, construction-1920.webp 1920w` yang sudah ada, `decoding="async"`, `loading="lazy"`.
Section `paper`: spotlight dan layer memakai `ink` / `accent-ink`, tidak pernah `accent` (2,04:1 di krem, bagian 2.1).

### 10.4 Mouse effects

Gerbang semua efek: `(hover: hover) and (pointer: fine)` **dan** bukan `prefers-reduced-motion` **dan** bukan `saveData` (`usePointerCapable`). Tablet sentuh, ponsel, dan stylus-only otomatis tanpa efek (`pointer: coarse`).
Pointer dibagi satu loop rAF bersama (sudah ada di `use-pointer-motion.ts`): `x, y` -1..1 relatif viewport, smoothing konstanta waktu 0,09 s, kembali ke 0 saat kursor keluar jendela.

| Efek | Nilai | Dipasang di | Dimatikan |
|---|---|---|---|
| **Tilt stage** | `rotateY = x x 5 derajat`, `rotateX = -y x 3,5 derajat`; `perspective: 1100px` di Stage, `transform-origin: 50% 100%` (berpusat di kaki, orang "bergoyang" dari tanah); smoothing `lerp 0,12` per frame (prototipe) = setara spring `{ stiffness 120, damping 20, mass 0,5 }` di framer-motion (teredam penuh, tanpa memantul). Nilai `x`/`y` dari `usePointerMotion` sudah dihaluskan 0,09 s, jangan dihaluskan dua kali di atas 0,12 untuk layer yang sama. Gerak z maksimum: ±19 px (tilt Y), ±43 px (tilt X) di tepi kartu, perubahan skala visual <= 4 % | hero >= 768 px | < 768, coarse, reduced |
| **Geser foto di dalam kartu** | `translateX = x x 8 px`, `scale(1,03)` (parallax kedalaman internal; skala menutup tepi mask) | foto cutout | sama |
| **Depth layer** | grid -6/-4 px, blueprint -10/-6 px, chip +8/+4 px (berlawanan arah untuk layer belakang, searah untuk layer depan). Lewat `ParallaxLayer depth / depthY` | hero | sama |
| **Spotlight** | `CursorSpotlight scope="parent"`, diameter 560 px, gradien `radial-gradient(circle closest-side, var(--spotlight-color), transparent)`. Opacity spring `{120, 24, 0,4}`. Hanya terlihat saat kursor di dalam parent | hero (z2, di bawah foto, jadi blueprint "tersorot" dan orang tidak) | coarse, reduced, saveData |
| | warna `--spotlight-color`: hero `rgb(224 134 90 / 0.14)`; section gelap (`background`): `rgb(225 224 204 / 0.06)`, 480 px; Kontak (`surface`): `rgb(224 134 90 / 0.12)`, 480 px; **Sorotan (paper): `rgb(131 61 26 / 0.10)`**, 480 px | | |
| **Magnetic** | `Magnetic radius=120 strength=0,35`; tarikan = `strength x (1 - (jarak/radius)^2) x presence x selisih`; maks ±16 px (di jarak ~ 69 px dari pusat), kembali ke 0 di luar radius; spring `{260, 20, 0,4}`. Bungkus `PillLink` hero (2 tombol) dan tombol WhatsApp di Kontak | `PillLink` saja | coarse, reduced (render `<span>` biasa) |
| **Tidak dipasang** | tilt kartu fakta, kartu pengalaman, chip skill, nav, baris email, foto Sorotan | - | - |

Alasan tilt hanya di stage: satu titik fokus gerak, tanpa distraksi di bagian baca. Nav, baris kontak, dan chip skill tidak magnetik: target klik yang bergerak sebelum diklik menyulitkan (WCAG 2.5.8) dan mengganggu pengguna keyboard/switch.
Fokus keyboard: wrapper magnetic tidak bergerak saat fokus, ring fokus (2 px `focus`, offset 3 px) tetap di tombol.

Kontras bawah spotlight (alpha tertinggi di pusat, terburuk): hero `accent` 0,14 di atas `background` -> `foreground` 12,3:1, `muted` 6,8:1, `subtle` 6,2:1. Kontak: `accent` 0,12 di `surface` -> `subtle` 5,80:1.
Paper: `accent-ink` 0,10 di `paper` -> `ink-muted` 5,82:1, `ink-subtle` 5,66:1; di `paper-2` 5,26 dan 5,12. Batas atas alpha: 0,15 (dark) / 0,10 (paper). Jangan naikkan tanpa menghitung ulang.

Performa: 1 loop rAF, nol `setState` per mousemove, hanya `transform`/`opacity`, `filter` foto statis (tidak dianimasikan), `backdrop-filter` panel statis. Target 60 fps.
Safari: pasang mask sebagai kelas CSS di `frontend.css` (`.hero-cut`, dua properti `-webkit-` dan standar), bukan nilai arbitrary Tailwind, supaya `mask-composite` tidak hilang.

### 10.5 Fallback prefers-reduced-motion dan input sentuh

| Elemen | Normal | `prefers-reduced-motion: reduce` |
|---|---|---|
| Entrance stage | frame: `clip-path inset(100% 0 0 0)` -> `inset(0)` 700 ms `ease-out-expo` delay 0,3 s; foto naik 24 px + fade 700 ms delay 0,5 s; chip fade + scale 0,95 -> 1, delay 0,9 / 1,0 / 1,1 / 1,2 s | `initial={false}`: semua tampil penuh seketika. **Jangan** pakai `opacity:0` awal |
| Parallax scroll semua layer | seperti 10.3 | `y = 0`, layer tetap tampil di posisi netral (sudah di `useParallax` + `ParallaxLayer`) |
| Tilt, depth, spotlight, magnetic | seperti 10.4 | tidak dirender / `<span>` polos |
| Blueprint | menggambar sendiri 7 s + loop CDM | tampil jadi, tanpa loop (bagian 3.7) |
| Hover warna / border / opacity | 150 ms | tetap (bantu pemahaman). Gerak `gap`/scale pill dihilangkan |

Layar sentuh (`pointer: coarse`): scroll parallax tetap (layer bertanda `M`, nilai separuh), tanpa tilt, spotlight, magnetic, dan depth. Tidak ada elemen yang hanya muncul saat hover. Efek `:active scale(0.97)` pada tombol tetap.
`MotionConfig reducedMotion="user"` di `App.tsx` sudah ada. Tambahkan juga `@media (prefers-reduced-motion: reduce)` di CSS untuk `.hero-*` supaya efek tetap mati sebelum hidrasi JS.

### 10.6 Copy label chip (final)

| Chip | Tag | Judul (14 px / 500) | Sub-label (12 px / 400, `subtle`) | Sumber |
|---|---|---|---|---|
| Helm | `K3` | Helm safety | Alat pelindung diri | terlihat di foto |
| Vest | `K3` | Life vest | Alat pelindung diri | terlihat di foto |
| Peran 1 (>= 1600) | `2025` | Site Supervisor | PT Tukangbangun Indonesia | CV, BRIEF bagian 3 |
| Peran 2 (>= 1600) | `2023` | Marine CDM | Project Engineer, Patimban Paket 5 | CV, BRIEF bagian 3 |
| Datum | - | `±0,00` | - | gambar konsep (sama dengan blueprint) |
| Catatan blueprint (lg+) | - | Ilustrasi konsep, tanpa skala | - | sudah ada di v1 |

Di bawah 1024: sub-label dihapus, chip memakai 13 px. Tidak ada angka baru, tidak ada kata "bersertifikat", "ahli", "senior". Chip `aria-hidden="true"`.
Alt foto menjadi `Foto Rezha Herbi Saputra, memakai helm safety dan life vest` (ganti `person.photoAlt` untuk hero; `content.ts` perlu satu kunci `hero.portraitAlt`). `aria-label` blueprint tidak berubah.

### 10.7 Perubahan lain yang dibutuhkan

1. **Tentang:** hapus `<img src="/img/reza-avatar.webp">` (bagian 6, baris foto pasfoto). Kolom kiri hanya label + judul; dekorasi lewat 10.3.
2. **`Section`:** tambah `relative isolate overflow-clip` dan slot dekorasi (mis. prop `decor`), konten dibungkus `relative z-10`.
3. **`useParallax`:** opsi `zeroAt: "start"` (10.1.1).
4. **`.hero-cut` / `.hero-frame` / `.hero-ground`:** kelas CSS di `src/styles/frontend.css` (mask komposit, arsir, kisi frame). Nilai di 10.2.
5. **Panel lead:** `bg-black/70` (bukan /50).
6. **`public/img`:** buang `.DS_Store`; hapus `reza-avatar.webp` jika tak terpakai. Total sekarang 864 KB (batas 1,2 MB).
7. **`.gitignore`:** pastikan `.DS_Store` diabaikan.

### 10.8 Verifikasi (frontend, sebelum "stabil")

- Playwright 360 / 390 / 768 / 1024 / 1280 / 1440 / 1920: `scrollWidth === innerWidth`, nol error konsol, foto `naturalWidth > 0`, chip tidak berpotongan dengan `h1`/panel (bounding box), 1024-1179 chip Vest `display:none`.
- Emulasi `prefers-reduced-motion: reduce`: transform semua layer = `none`, tidak ada elemen `.cursor-spotlight`, blueprint penuh.
- Emulasi sentuh (`pointer: coarse`): tidak ada listener `pointermove` aktif, tanpa tilt.
- Tab fokus melewati dua pill hero dalam urutan DOM; ring fokus terlihat saat magnetic aktif.
- Lighthouse mobile: LCP bukan foto lebih dari 2,5 s; CLS 0 (foto punya `width/height`).
- Sticky tahun di Pengalaman masih menempel (periksa `overflow: clip`, bukan `hidden`).

### 10.9 Batas pengetahuan dan keputusan terbuka

- Prototipe diuji di Chrome headless + Chrome terkendali, bukan perangkat sentuh nyata. Layout tablet 768 (seni di tengah, teks rata kiri) dan jarak kosong di sebelah "Rezha" belum dioptimalkan; gerak mouse diuji lewat event sintetis (tilt dan spotlight bergerak sesuai nilai), bukan tangan manusia.
- Di mobile, helm menutupi "L =" pada label dimensi blueprint (angka "24,00 m" tetap terbaca). Diterima; jika mengganggu, turunkan blueprint 8 px.
- Tepi alpha cutout (rambut/helm) bisa menampilkan pinggiran terang saat zoom 200 %+. Jika terlihat di build asli, minta lead membuat ulang cutout dengan kontraksi mask 1 px.
- Chip peran (2025, 2023) hanya >= 1600 px. Pertanyaan terbuka BRIEF 5.1 (apakah 2025 masih berjalan) tidak memengaruhi chip karena hanya menulis tahun.
- Kalimat "K3" pada chip adalah label alat, bukan klaim sertifikasi. Jika user ingin memakai "K3" sebagai klaim, itu butuh fakta baru dari CV.
