# Portfolio Rezha Herbi Saputra — Shared Brief

Source of truth for all 3 agents. Read fully before touching anything.

## 1. Goal
Public portfolio website for a civil engineer (Teknik Sipil). Audience: recruiters / HR at contractors and
consultants, project owners, JV partners (incl. Japanese-JV projects). Must feel like an engineer who builds
real things, not a template. Indonesian copy first.

## 2. Stack (already scaffolded, `pnpm build` passes)
- Vite 8 + React 19 + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`, tokens in `src/index.css` `@theme`)
- shadcn structure: `components.json`, alias `@/` -> `src/`, UI primitives in `src/components/ui/`, `cn()` in `src/lib/utils.ts`
- framer-motion, lucide-react
- Hero component given by the user lives at `src/components/ui/prisma-hero.tsx` (+ `demo.tsx`). It is the
  visual style reference: cream `#E1E0CC` on near-black, giant tight-tracked name, word-pull-up animation,
  full-bleed video with grain + gradient, black notch navbar, pill CTA with circle arrow.
- Package manager: pnpm. Node 22.

## 3. Facts (ONLY these. Never invent numbers, dates, clients, project sizes)
Name: Rezha Herbi Saputra — Civil Engineering. Phone 0856 700 3162, rezhahs@gmail.com, Perum Harkit, Tangerang.
Education: S1 Teknik Sipil, Kelas Internasional, Universitas Muhammadiyah Surakarta (graduation year not given).
Skills: AutoCAD, SketchUp, SAP2000, Photoshop. Languages: Indonesia, English (no level given — do not claim "fluent").
Hobbies: drawing, fishing.
Experience (CV gives a single year each, no end dates):
- 2019 Quantity Surveyor, PT Adhi Karya – Hutama Karya JV. Practical work (kerja praktek), gedung Universitas
  Sultan Ageng Tirtayasa (UNTIRTA), Sindangsari, Banten. Menghitung volume pekerjaan.
- 2020 Drafter, CV Parama Tjipta (freelance). Gambar 2D/3D rumah tinggal; model 3D di SketchUp untuk menghitung RAB.
- 2023 Project Engineer, Chosuk Development Indonesia. Pelabuhan Patimban Paket 5, Subang — Marine Cement Deep
  Mixing (CDM), perbaikan tanah untuk terminal mobil. Di bawah JV TOA – Waskita – Wakachiku – Hutama – Abipraya.
  Tugas: merencanakan, mengoordinasi, mengawasi, mengevaluasi pekerjaan harian CDM; menyusun & mereview daily
  summary, gambar kerja, record of works, anchor, survei; laporan ke manajer dan staf.
- 2025 Site Supervisor, PT Tukangbangun Indonesia. Proyek rumah: rencana & koordinasi harian, daily summary,
  gambar kerja, record of works, material, tenaga kerja, laporan ke manajer.
- 2017–2018 Himpunan mahasiswa Teknik Sipil (CV tertulis "Civil Engineering Student Association"), Kepala Divisi
  Internal Eksternal, untuk mahasiswa kelas internasional UMS.
Photo: only a 199x270 px passport-style JPEG (blue studio backdrop) extracted from the CV. Too low-res for a
large hero portrait — use small (<=160px), or ask the user for a better photo. Never upscale-and-pretend.

### Public context (researched, safe to cite as background — NOT as Rezha's personal achievements)
- Deep cement mixing: ground-improvement technique; cement binder injected into soil and mixed in place. Result:
  higher strength, lower permeability, lower compressibility, reduced liquefaction risk. First field tests in
  Japan, 1970. (Wikipedia: Deep cement mixing)
- Patimban Deep Sea Port, Subang, West Java: 654 ha total (300 ha container + vehicle terminals, 354 ha back-up);
  ~70 km from Karawang industrial estate, ~145 km from Jakarta; first phase inaugurated 20 Dec 2020; National
  Strategic Project; relieves Tanjung Priok. (Wikipedia: Patimban Deep Sea Port)
- QS = professional who manages construction costs and contracts; volume take-off underpins RAB.

## 4. Copy (Indonesian, v1 — Agent 1 may edit for rhythm; facts must stay true)

HERO
- eyebrow: Teknik Sipil · Tangerang
- h1: Rezha
- lead: Sarjana Teknik Sipil yang bekerja di dua sisi proyek: gambar dan lapangan. Dari hitungan RAB rumah
  tinggal sampai perbaikan tanah di terminal Pelabuhan Patimban.
- CTA primary: Lihat pengalaman  ·  CTA secondary: Hubungi saya

TENTANG — title: "Gambar yang bagus belum cukup. Harus bisa dibangun."
Saya Rezha Herbi Saputra, lulusan Teknik Sipil Kelas Internasional Universitas Muhammadiyah Surakarta. Karier
saya mulai dari meja gambar: menggambar rumah tinggal dalam 2D dan 3D, lalu menghitung volumenya untuk RAB. Dari
situ saya belajar satu hal. Angka di kertas baru berguna kalau orang lapangan bisa memakainya.

Cara pikir itu terbawa ke proyek yang lebih besar. Di Pelabuhan Patimban, Subang, saya menjadi Project Engineer
untuk pekerjaan Cement Deep Mixing di terminal mobil: merencanakan, mengoordinasi, mengawasi, dan mengevaluasi
pekerjaan harian, lalu melaporkannya ke manajer dan staf.

Sekarang saya Site Supervisor di PT Tukangbangun Indonesia, memegang proyek rumah dari sisi material, tenaga
kerja, dan catatan pekerjaan harian. Saya bisa bekerja dalam tim maupun sendiri, dan senang mempelajari hal yang
belum pernah saya pegang.

PENGALAMAN (timeline, newest first)
- 2025 · Site Supervisor — PT Tukangbangun Indonesia
  Mengawasi pembangunan rumah dari hari ke hari. Menyusun daily summary dan record of works, mengatur material
  dan tenaga kerja, memastikan gambar kerja dijalankan sesuai standar, dan melapor ke manajer.
- 2023 · Project Engineer — Chosuk Development Indonesia · Pelabuhan Patimban Paket 5, Subang
  Pekerjaan Marine Cement Deep Mixing (CDM) untuk perbaikan tanah di terminal mobil, di bawah JV
  TOA–Waskita–Wakachiku–Hutama–Abipraya. Merencanakan dan mengevaluasi pekerjaan harian, mereview gambar kerja,
  record of works, pekerjaan anchor dan survei, serta menyiapkan laporan untuk manajer dan staf.
- 2020 · Drafter — CV Parama Tjipta (freelance)
  Menggambar rumah tinggal 2D dan 3D. Model 3D di SketchUp dipakai langsung untuk menghitung RAB.
- 2019 · Quantity Surveyor (kerja praktek) — PT Adhi Karya – Hutama Karya JV
  Menghitung volume pekerjaan pada proyek gedung Universitas Sultan Ageng Tirtayasa, Sindangsari, Banten.

SOROTAN: "Apa itu Cement Deep Mixing?" (explainer card, tone: engineer explaining to a non-engineer)
Pelabuhan berdiri di pesisir, dan tanah di bawahnya harus kuat menahan terminal di atasnya. Pada CDM, semen
diinjeksikan lalu diaduk langsung dengan tanah di tempat, tanpa digali. Hasilnya tanah yang lebih kuat, lebih
sulit ditembus air, dan lebih kecil penurunannya. Tekniknya pertama diuji di lapangan di Jepang pada 1970.
Fact strip (label it "Tentang proyeknya", NOT Rezha's achievement): 654 ha area pelabuhan · ~145 km dari Jakarta ·
fase 1 diresmikan 20 Des 2020.

KEAHLIAN
- Desain & hitungan: AutoCAD, SketchUp, SAP2000, Photoshop
- Lapangan: pengawasan pekerjaan harian, pelaporan (daily summary, record of works), survei, kontrol material &
  tenaga kerja, perhitungan volume / RAB
- Bahasa: Indonesia, English  (no proficiency label)

ORGANISASI — 2017–2018 · Kepala Divisi Internal Eksternal, himpunan mahasiswa Teknik Sipil kelas internasional UMS.
Mengurus hubungan ke dalam dan ke luar organisasi.

KONTAK — title: "Ada proyek atau lowongan? Kirim saja."
rezhahs@gmail.com · 0856 700 3162 · Perum Harkit, Tangerang. Hobi di luar kerja: menggambar dan memancing.

## 5. Open questions for the user (do NOT guess; surface in final report)
1. Is "Site Supervisor 2025" current ("sekarang") or ended? Copy assumes current.
2. May the phone number be shown publicly? (default: email + WhatsApp link behind a button, no raw number in HTML)
3. Better portrait photo? (current one is 199x270)
4. Any real project photos / drawings / SketchUp renders we can show? Without them the portfolio has no visuals
   of work. Placeholder frames must be clearly labelled, never faked.
5. English version toggle? (v1 = Indonesian only)
6. Domain name and Dokploy access (for Agent 3).

## 6. Hard rules
- No invented facts. No stock "engineer in hard hat" clichés presented as his work. Unsplash images may be used
  ONLY as clearly decorative texture/background, and only URLs that really resolve (verify with curl -I).
- No AI-slop: no purple/blue gradients, no 3-icon feature rows, no "passionate / dynamic / innovative /
  cutting-edge / seamless", no em-dash stacking, no "Mari kita" openers, no emoji.
- Copy: natural Indonesian, concrete, first person, short sentences mixed with longer ones.
- Accessibility: semantic HTML, visible focus, contrast AA, `prefers-reduced-motion` respected (stop hero video
  autoplay + word-pull animation), real alt text, `lang="id"`.
- Performance: hero video is 16 MB. Provide poster image, `preload="metadata"`, lazy mount below the fold, and do
  not autoplay on `saveData`/small screens if feasible. Target Lighthouse perf >= 90 mobile.
- The remote hero video URL belongs to a third party. Flag the hotlink risk in the final report; recommend
  self-hosting a compressed copy once the user approves the video.

## 7. File ownership (avoid merge conflicts: all 3 agents share ONE working tree, no git worktrees)
- Agent 1 `uiux`     : docs/design-spec.md, docs/copy.md (edits to section 4 allowed), `src/index.css` tokens, public/ brand assets
- Agent 2 `frontend` : everything under src/ EXCEPT `src/index.css` @theme block, plus index.html, SEO meta
- Agent 3 `devops`   : Dockerfile, nginx.conf, .dockerignore, .github/**, docs/DEPLOY.md, `package.json` scripts only if needed
- Nobody edits another owner's files. Request changes through the comms log.

## 8. Communication protocol
- Append-only log: `docs/comms.md`. Format: `## [HH:MM] from -> to : subject` then body. Never edit old entries.
- Herdr does NOT detect Atlas as an agent, so `herdr agent prompt` will fail. Wake another agent with raw pane input,
  after writing the log entry. Panes: uiux=w1:p8, frontend=w1:p9, devops=w1:pA, lead=w1:p1. Single line only:
  `herdr pane send-text w1:p9 "[from uiux] see docs/comms.md last entry" && herdr pane send-keys w1:p9 enter`
- Only wake an agent when you hand work over or are blocked. Do not ping-pong. Read the target's pane first
  (`herdr pane read w1:p9 --lines 20`) so you do not type into a prompt that is mid-run.
- Every agent posts a short status entry after each milestone. Blockers get their own entry addressed to the owner.
- Handoffs: uiux -> frontend = design-spec.md ready. frontend -> devops = `pnpm build` output `dist/` stable.
- Do not run `herdr server stop`, do not close panes you did not create, do not `git push`.
- Git: commit only your own files, small commits, message prefix `uiux:`, `frontend:`, `devops:`.
