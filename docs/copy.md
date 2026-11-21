# Copy v3 (uiux -> frontend)

Bahasa Indonesia sehari-hari yang rapi, orang pertama, kalimat pendek-sedang. Fakta hanya dari `docs/BRIEF.md` bagian 3 dan CV (`CV Rezha Herbi Saputra.pdf`).
Tidak ada angka, nama, atau klaim baru: setiap angka dan nama di bawah dicek otomatis terhadap teks CV dan BRIEF (hasil: nol temuan baru).
Versi v2 ada di riwayat git (`git show 692d252~1:docs/copy.md`). **Layout, komposisi, chip, dan gambar hero tidak disentuh**; dari hero hanya `eyebrow` (tetap), `lead`, dan CTA (tetap).

Cara pakai: bagian 1 = aturan yang dipakai. Bagian 2 = tabel perubahan per string (teks panjang ditulis lengkap di bagian 3, tabel menunjuk ke sana).
Bagian 3 = blok final siap salin, nama key persis `src/data/content.ts`. Bagian 4 = `index.html`. Bagian 5 = hal yang perlu keputusan user.

## 1. Aturan yang dipakai

- Pembaca: HRD, rekruter, kontraktor, klien. Mereka memindai. Jawaban yang dicari: siapa, kerja apa, di mana, buktinya, cara menghubungi.
- Satu kata kerja per tugas. Tumpukan "merencanakan, mengoordinasi, mengawasi, dan mengevaluasi" (terjemahan harfiah dari "plans, coordinates, supervises and evaluates" di CV) diganti "mengelola ... dari perencanaan sampai evaluasi" atau "mengawasi".
- Istilah lapangan boleh tetap, dijelaskan **sekali** di tempat pertama muncul: RAB (hero), quantity surveyor dan CDM (Tentang), daily summary dan record of works (Pengalaman 2025), JV (Pengalaman 2023). Setelah itu dipakai polos.
- Tahun ditulis di depan kalimat ("Pada 2023 saya ...") karena CV hanya memberi satu tahun per entri, tidak ada tanggal akhir. Tidak ada "sekarang", "hingga kini", atau rentang.
- Tanpa slogan, tanpa kata pujian diri, tanpa pertanyaan retoris, tanpa "Mari kita". Tanda pisah panjang nol; tanda pisah en hanya di nama JV dan rentang tahun.
- Audit pola (skill avoid-ai-writing, disesuaikan ke bahasa Indonesia): tidak ada tumpukan kata kerja, tidak ada fragmen staccato, tidak ada orang pertama yang ditambah di tempat yang tadinya tidak ada, tidak ada gaya sok-santai. Kalimat sikap "Angka di kertas baru berguna kalau orang lapangan bisa memakainya" **dibuang**: itu klaim sikap yang tidak ada di CV (lihat bagian 5).

## 2. Tabel perubahan

Format: key | sekarang | baru | alasan. "(blok 3)" = teks baru ada lengkap di bagian 3.

### Meta, hero

| Key | Sekarang | Baru | Alasan |
|---|---|---|---|
| `meta.skipLink` | Lewati ke konten utama | tetap | sudah wajar |
| `navItems[].label` | Tentang, Pengalaman, Sorotan, Keahlian, Kontak | tetap | pendek dan jelas. "Sorotan" tidak menjelaskan isinya, tetapi nav 5 item sudah batas lebar 360 px (spec 4); judul section yang menjelaskan |
| `hero.eyebrow` | Teknik Sipil · Tangerang | tetap | sudah menjawab bidang dan lokasi |
| `hero.lead` | Sarjana Teknik Sipil yang bekerja di dua sisi proyek: gambar dan lapangan. Dari hitungan RAB rumah tinggal sampai perbaikan tanah di terminal Pelabuhan Patimban. | (blok 3) | "bekerja di dua sisi proyek" abstrak dan kedengaran slogan; "Dari ... sampai ..." rentang kosong. Diganti tiga hal konkret dalam urutan CV. RAB dijelaskan di sini karena ini tempat pertama muncul |
| `hero.primaryCta.label` | Lihat pengalaman | tetap | kata kerja + tujuan, sudah jelas |
| `hero.secondaryCta.label` | Hubungi saya | tetap | sama |
| `hero.portraitAlt` | Foto Rezha Herbi Saputra, memakai helm safety dan life vest | tetap | alt hero terlanjur deskriptif dan benar; alt Tentang sengaja dibuat beda (lihat `about.portraitAlt`) |

### Tentang

| Key | Sekarang | Baru | Alasan |
|---|---|---|---|
| `about.label` | Tentang | tetap | |
| `about.title` | Gambar yang bagus belum cukup. Harus bisa dibangun. | Dari gambar dan hitungan sampai pengawasan proyek. | judul lama slogan dan memberi opini yang tidak ada di CV; pengunjung tidak tahu isinya. Judul baru meringkas isi tiga paragraf sesuai urutan karier |
| `about.paragraphs[0]` | "Saya Rezha ... Saya mulai dari angka dan gambar ... Angka di kertas baru berguna kalau orang lapangan bisa memakainya." | (blok 3) | kalimat sikap dibuang (tidak bersumber). Tahun dan lokasi kerja praktek ditulis, "quantity surveyor" dijelaskan. UMS diuraikan di sini karena caption foto memakai singkatan |
| `about.paragraphs[1]` | "Cara berpikir itu terbawa ... merencanakan, mengoordinasi, mengawasi, dan mengevaluasi pekerjaan hariannya ..." | (blok 3) | "Cara berpikir itu terbawa" mengulang sikap yang tidak bersumber; tumpukan 4 kata kerja jadi "mengelola"; CDM dijelaskan satu klausa |
| `about.paragraphs[2]` | "Sekarang saya Site Supervisor ... dari sisi material, tenaga kerja, dan catatan pekerjaan harian ..." | (blok 3) | "Sekarang" diganti "Pada 2025" (BRIEF pertanyaan terbuka 1: belum pasti masih berjalan). "memegang proyek ... dari sisi" kaku, diganti kata kerja langsung |
| `about.portraitAlt` (baru) | - | Potret Rezha Herbi Saputra, setengah badan | alt foto di Tentang (spec 11.3); tidak mengulang alt hero |
| `about.portraitCaption` (baru) | - | S1 Teknik Sipil, UMS | caption bar foto Tentang; fakta dari CV |

### Pengalaman

| Key | Sekarang | Baru | Alasan |
|---|---|---|---|
| `experience.label` | Pengalaman | tetap | |
| `experience.title` | Dari hitungan sampai lapangan. | Pengalaman kerja, dari yang terbaru. | judul lama slogan dan mengulang judul hero; baru memberi tahu urutan baca (pemindai butuh itu) |
| `experience.items[0].role/org` | Site Supervisor / PT Tukangbangun Indonesia | tetap | jabatan dan nama perusahaan dari CV |
| `experience.items[0].body` | Mengawasi pembangunan rumah dari hari ke hari. Menyusun daily summary dan record of works, mengatur material dan tenaga kerja, memastikan gambar kerja dijalankan di lapangan, dan melapor ke manajer. | (blok 3) | "memastikan gambar kerja dijalankan di lapangan" tidak ada di CV (CV: menyusun dan memeriksa work design drawing) dan dibuang. Dua istilah lapangan dijelaskan sekali di sini |
| `experience.items[1].place` | Pelabuhan Patimban Paket 5, Subang | tetap | |
| `experience.items[1].featuredLabel` | Pelabuhan Patimban | tetap | |
| `experience.items[1].body` | Marine Cement Deep Mixing (CDM) ... Merencanakan, mengoordinasi, mengawasi, dan mengevaluasi pekerjaan CDM harian ... | (blok 3) | tumpukan kata kerja jadi satu kalimat; tiga kalimat pendek; JV dijelaskan |
| `experience.items[2].body` | Menggambar rumah tinggal 2D dan 3D. Model 3D di SketchUp dipakai langsung untuk menghitung RAB. | (blok 3) | "dipakai langsung" tidak bersumber (CV: "for the purpose of calculating RAB") dan dibuang |
| `experience.items[3].role` | Quantity Surveyor (kerja praktek) | tetap | |
| `experience.items[3].body` | Menghitung volume pekerjaan pada proyek gedung Universitas Sultan Ageng Tirtayasa, Sindangsari, Banten. | (blok 3) | disebut UNTIRTA (singkatan dari CV), "kerja praktek" masuk kalimat |

### Sorotan

| Key | Sekarang | Baru | Alasan |
|---|---|---|---|
| `spotlight.label` | Sorotan | tetap | |
| `spotlight.title` | Apa itu Cement Deep Mixing? | Apa itu Cement Deep Mixing (CDM)? | singkatan ikut diperkenalkan supaya dipakai polos di bawahnya |
| `spotlight.body` | Pelabuhan berdiri di pesisir ... diinjeksikan lalu diaduk ... lebih kecil penurunannya. Tekniknya pertama diuji ... | (blok 3) | "diinjeksikan", "penurunannya" terlalu teknis untuk pembaca awam; diganti "dimasukkan", "tanah ... turun" tetap benar (fakta BRIEF: reduced compressibility) |
| `spotlight.factsLabel` | Tentang pelabuhannya | Pelabuhan Patimban dalam angka | label lama menggantung; baru menyebut subjek angka. Tetap jelas bahwa angka milik pelabuhan |
| `spotlight.facts[].label` | area pelabuhan / dari Jakarta / fase 1 diresmikan | luas area pelabuhan / jarak dari Jakarta / fase 1 diresmikan | tiap label sekarang menyebut besaran yang diukur |
| `spotlight.source` | Sumber: Wikipedia, Patimban Deep Sea Port. Angka milik pelabuhan, bukan capaian pribadi. | (blok 3) | "bukan capaian pribadi" kaku dan defensif. Fungsinya sama (angka bukan pekerjaan Rezha) tapi disebut lewat fakta: angka untuk seluruh pelabuhan, Rezha di Paket 5 |
| `spotlight.photoAlt` | Gedung bertingkat dalam masa konstruksi | Bangunan bertingkat yang sedang dibangun | "dalam masa konstruksi" terjemahan harfiah |
| `spotlight.photoCredit`, `footer.photoCredit` | Foto: Ben Koorengevel / Unsplash | tetap | format kredit baku |

### Keahlian, Organisasi, Kontak, Footer

| Key | Sekarang | Baru | Alasan |
|---|---|---|---|
| `skills.title` | Alat dan cara kerja. | Software, pekerjaan lapangan, dan bahasa. | judul lama puitis; baru menyebut tiga isi kolom di bawahnya, cocok untuk pemindai yang mencari kecocokan lowongan |
| `skills.software.group` | Desain & hitungan | Gambar dan hitungan | "desain" terlalu besar untuk drafter/QS; "gambar" cocok dengan CV (drawings) |
| `skills.field.group` | Lapangan | tetap | |
| `skills.field.items` | Pengawasan pekerjaan harian / Pelaporan (daily summary, record of works) / Survei / Kontrol material & tenaga kerja / Perhitungan volume / RAB | Mengawasi pekerjaan harian / Menyusun laporan (daily summary, record of works) / Survei / Mengontrol material dan tenaga kerja / Menghitung volume dan RAB | kata benda berimbuhan "pe-an" diganti kata kerja aktif; "&" dan "/" diganti kata |
| `skills.languages.group` | Bahasa | tetap | tanpa label tingkat (BRIEF) |
| `organization.label` | Organisasi | tetap | |
| `organization.title` | Pernah memimpin satu divisi. | Pengalaman berorganisasi. | CV menulis "Head of Internal External Division"; "memimpin" tepat, tetapi judul perlu bicara ke pembaca soal kategori, bukan mengulang peran yang sudah ada di bawahnya |
| `organization.period/role/org` | 2017–2018 / Kepala Divisi Internal Eksternal / Himpunan mahasiswa Teknik Sipil kelas internasional UMS | tetap | |
| `organization.body` | Divisi ini mengurus hubungan ke dalam dan ke luar himpunan. | Divisi ini menangani hubungan ke dalam dan ke luar himpunan. | "mengurus" -> "menangani", lebih lazim di konteks organisasi |
| `contact.label` | Kontak | tetap | |
| `contact.title` | Ada proyek atau lowongan? Kirim saja. | Ada lowongan atau proyek? Hubungi saya. | "Kirim saja" tidak jelas mengirim apa; baru langsung ke tindakan. Lowongan didahulukan (pembaca utama HRD) |
| `contact.emailLabel`, `whatsappLabel`, `whatsappHint` | Email / WhatsApp / (membuka di tab baru) | tetap | |
| `contact.hobby` | Di luar kerja, saya menggambar dan memancing. | Di luar pekerjaan, hobi saya menggambar dan memancing. | "hobi" disebut eksplisit (CV: HOBBIES) |
| `footer.backToTop` | Kembali ke atas | tetap | |
| `mediaPlaceholder.label/title/caption` | Foto proyek / Dokumentasi proyek menyusul / Belum ada foto di halaman ini. | tetap | jujur, pendek, tidak menjanjikan tanggal; "menyusul" lazim |

## 3. Blok final siap salin (`src/data/content.ts`)

Hanya key yang berubah atau baru. Key lain tidak disentuh. Satu pengingat: `person.*`, `navItems`, `hero.eyebrow`, CTA, `hero.portraitAlt`, `meta.skipLink`, `contact.emailLabel/whatsappLabel/whatsappHint`, `footer.*`, `mediaPlaceholder`, `spotlight.photoCredit`, `experience.items[*].role/org/place/featuredLabel/year` tetap seperti sekarang.

```ts
export const hero = {
  // eyebrow, portraitAlt, primaryCta, secondaryCta: tetap
  lead: "Sarjana Teknik Sipil yang pernah menggambar dan menghitung RAB (rencana anggaran biaya), mengerjakan perbaikan tanah di Pelabuhan Patimban, dan kini mengawasi proyek rumah.",
};

export const about = {
  label: "Tentang",
  title: "Dari gambar dan hitungan sampai pengawasan proyek.",
  portraitAlt: "Potret Rezha Herbi Saputra, setengah badan",
  portraitCaption: "S1 Teknik Sipil, UMS",
  paragraphs: [
    "Saya Rezha Herbi Saputra, sarjana Teknik Sipil dari Kelas Internasional Universitas Muhammadiyah Surakarta (UMS). Saya mulai dari hitungan dan gambar. Pada 2019 saya kerja praktek sebagai quantity surveyor, yaitu menghitung volume pekerjaan, di proyek gedung Universitas Sultan Ageng Tirtayasa, Banten. Pada 2020 saya menjadi drafter freelance: menggambar rumah tinggal dalam 2D dan 3D, lalu memakai model 3D-nya untuk menghitung RAB.",
    "Pada 2023 saya menjadi Project Engineer di Chosuk Development Indonesia untuk proyek Pelabuhan Patimban Paket 5, Subang. Pekerjaan saya di sana adalah Cement Deep Mixing (CDM), teknik memperkuat tanah dengan mencampurkan semen ke dalamnya, untuk terminal mobil. Saya mengelola pekerjaan CDM sehari-hari dan melapor ke manajer dan staf.",
    "Pada 2025 saya menjadi Site Supervisor di PT Tukangbangun Indonesia, mengawasi proyek rumah. Saya mengatur dan memantau pekerjaan harian, material, dan tenaga kerja, lalu menyusun laporan untuk manajer. Saya bisa bekerja dalam tim maupun sendiri, dan senang belajar hal baru.",
  ],
};

export const experience = {
  label: "Pengalaman",
  title: "Pengalaman kerja, dari yang terbaru.",
  items: [
    {
      year: "2025",
      role: "Site Supervisor",
      org: "PT Tukangbangun Indonesia",
      body: "Mengawasi pembangunan proyek rumah dari hari ke hari. Menyusun dan memeriksa daily summary (ringkasan pekerjaan harian), gambar kerja, record of works (catatan pekerjaan yang sudah dikerjakan), material, dan tenaga kerja. Melapor ke manajer dan staf.",
    },
    {
      year: "2023",
      role: "Project Engineer",
      org: "Chosuk Development Indonesia",
      place: "Pelabuhan Patimban Paket 5, Subang",
      featuredLabel: "Pelabuhan Patimban",
      body: "Perbaikan tanah dengan metode Marine Cement Deep Mixing (CDM) untuk terminal mobil, di bawah joint venture (JV) TOA–Waskita–Wakachiku–Hutama–Abipraya. Mengelola pekerjaan CDM harian, dari perencanaan sampai evaluasi. Menyusun dan memeriksa daily summary, gambar kerja, record of works, pekerjaan anchor, dan survei. Melapor ke manajer dan staf.",
    },
    {
      year: "2020",
      role: "Drafter",
      org: "CV Parama Tjipta (freelance)",
      body: "Menggambar rumah tinggal dalam 2D dan 3D. Model 3D di SketchUp dipakai untuk menghitung RAB.",
    },
    {
      year: "2019",
      role: "Quantity Surveyor (kerja praktek)",
      org: "PT Adhi Karya – Hutama Karya JV",
      body: "Kerja praktek di proyek gedung Universitas Sultan Ageng Tirtayasa (UNTIRTA), Sindangsari, Banten. Menghitung volume pekerjaan.",
    },
  ] satisfies ExperienceItem[],
};

export const spotlight = {
  label: "Sorotan",
  title: "Apa itu Cement Deep Mixing (CDM)?",
  body: "Pelabuhan dibangun di pesisir, dan tanah di bawah terminalnya harus cukup kuat menahan beban di atasnya. Pada metode CDM, semen dimasukkan ke dalam tanah lalu diaduk dengan tanah itu langsung di tempat. Hasilnya, tanah lebih kuat, lebih sulit dilewati air, dan penurunannya lebih kecil. Metode ini pertama kali diuji di lapangan pada 1970, di Jepang.",
  factsLabel: "Pelabuhan Patimban dalam angka",
  facts: [
    { value: "654 ha", label: "luas area pelabuhan" },
    { value: "~145 km", label: "jarak dari Jakarta" },
    { value: "20 Des 2020", label: "fase 1 diresmikan" },
  ],
  source: "Sumber: Wikipedia, Patimban Deep Sea Port. Angka ini untuk seluruh pelabuhan, bukan hanya Paket 5 tempat saya bekerja.",
  photoAlt: "Bangunan bertingkat yang sedang dibangun",
  photoCredit: "Foto: Ben Koorengevel / Unsplash",
};

export const skills = {
  label: "Keahlian",
  title: "Software, pekerjaan lapangan, dan bahasa.",
  software: { group: "Gambar dan hitungan", items: ["AutoCAD", "SketchUp", "SAP2000", "Photoshop"] },
  field: {
    group: "Lapangan",
    items: [
      "Mengawasi pekerjaan harian",
      "Menyusun laporan (daily summary, record of works)",
      "Survei",
      "Mengontrol material dan tenaga kerja",
      "Menghitung volume dan RAB",
    ],
  },
  languages: { group: "Bahasa", items: ["Indonesia", "English"] },
};

export const organization = {
  label: "Organisasi",
  title: "Pengalaman berorganisasi.",
  period: "2017–2018",
  role: "Kepala Divisi Internal Eksternal",
  org: "Himpunan mahasiswa Teknik Sipil kelas internasional UMS",
  body: "Divisi ini menangani hubungan ke dalam dan ke luar himpunan.",
};

export const contact = {
  // label, emailLabel, whatsappLabel, whatsappHint: tetap
  title: "Ada lowongan atau proyek? Hubungi saya.",
  hobby: "Di luar pekerjaan, hobi saya menggambar dan memancing.",
};
```

Catatan implementasi: `about.portraitAlt` dan `about.portraitCaption` adalah key baru (dipakai `about.tsx` setelah spec 11). `ExperienceItem` tidak berubah. Sorotan `factsLabel` dipakai sebagai `h3` (`id="fakta-pelabuhan"`), cek tidak ada yang meng-uppercase teks panjang di lebar 360 px (uppercase + tracking 0,16em; teks sekarang 3 kata lebih panjang dari "Tentang pelabuhannya").

## 4. `index.html`

| Bagian | Sekarang | Baru | Alasan |
|---|---|---|---|
| `<title>` dan `og:title` | Rezha Herbi Saputra | Teknik Sipil, Tangerang | Rezha Herbi Saputra | Sarjana Teknik Sipil, Tangerang | "Sarjana" menjelaskan jenjang; 53 karakter, muat di tab dan hasil pencarian |
| `meta name="description"` dan `og:description` | Portofolio Rezha Herbi Saputra, sarjana Teknik Sipil di Tangerang. Pengalaman sebagai drafter, quantity surveyor, Project Engineer di Pelabuhan Patimban, dan Site Supervisor. | Portofolio Rezha Herbi Saputra, sarjana Teknik Sipil di Tangerang. Pernah menggambar, menghitung RAB, memperbaiki tanah di Patimban, dan kini mengawasi proyek rumah. | daftar jabatan berbahasa Inggris diganti pekerjaan yang dilakukan, dalam urutan kerja yang masuk akal bagi rekruter; 165 karakter (batas pencarian ~160, terpotong sedikit di akhir diterima) |
| JSON-LD `jobTitle` | Site Supervisor | tetap | |
| `og:image` | belum ada | belum ada | menunggu gambar 1200x630 (tugas frontend) |

Teks final:

```html
<title>Rezha Herbi Saputra | Sarjana Teknik Sipil, Tangerang</title>
<meta name="description" content="Portofolio Rezha Herbi Saputra, sarjana Teknik Sipil di Tangerang. Pernah menggambar, menghitung RAB, memperbaiki tanah di Patimban, dan kini mengawasi proyek rumah." />
<meta property="og:title" content="Rezha Herbi Saputra | Sarjana Teknik Sipil, Tangerang" />
<meta property="og:description" content="Portofolio Rezha Herbi Saputra, sarjana Teknik Sipil di Tangerang. Pernah menggambar, menghitung RAB, memperbaiki tanah di Patimban, dan kini mengawasi proyek rumah." />
```

## 5. Perlu keputusan user (tidak bisa ditentukan dari sumber)

1. **"Pada 2025 saya menjadi Site Supervisor"** menulis awal peran saja, tanpa "sekarang" (BRIEF pertanyaan terbuka 1). Kalau masih berjalan, user bisa minta "dan masih menjabat"; kami tidak boleh menebak.
2. **Kalimat sikap dibuang** ("Angka di kertas baru berguna kalau orang lapangan bisa memakainya" dan judul lama). Kalau user ingin kalimat pribadi di Tentang, user perlu menulisnya sendiri. Kami tidak menambah klaim yang bukan dari CV.
3. **"Saya bisa bekerja dalam tim maupun sendiri, dan senang belajar hal baru"** tetap, bersumber dari CV bagian ABOUT ME. "Terbiasa berkomunikasi / good communication skills / public relations" dari CV **sengaja tidak dipakai**: klaim kemampuan diri tanpa bukti kerja.
4. **Tahun footer** mengikuti tahun berjalan (otomatis di `footer.tsx`).
5. **Meta description 166 karakter** dan sedikit terpotong di sebagian hasil pencarian; bisa dipersingkat kalau user mau lebih rapi.
