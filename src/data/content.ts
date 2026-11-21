/**
 * All page copy. Source: docs/copy.md (v3, uiux). Facts: docs/BRIEF.md section 3.
 * Do not add facts that are not in the brief.
 */

export const person = {
  name: "Rezha Herbi Saputra",
  shortName: "Rezha",
  email: "rezhahs@gmail.com",
  address: "Perum Harkit, Tangerang",
  // Phone is public by user decision (docs/comms.md, keputusan user poin 2).
  phoneDisplay: "0856 700 3162",
  waUrl: "https://wa.me/628567003162?text=Halo%20Rezha,%20saya%20lihat%20portofolio%20Anda",
} as const;

export const meta = {
  skipLink: "Lewati ke konten utama",
};

/** aria-labels that are not visible text. */
export const a11y = {
  navLabel: "Navigasi utama",
};

export const navItems = [
  { id: "tentang", href: "#tentang", label: "Tentang" },
  { id: "pengalaman", href: "#pengalaman", label: "Pengalaman" },
  { id: "sorotan", href: "#sorotan", label: "Sorotan" },
  { id: "keahlian", href: "#keahlian", label: "Keahlian" },
  { id: "kontak", href: "#kontak", label: "Kontak" },
] as const;

export const hero = {
  eyebrow: "Teknik Sipil · Tangerang",
  portraitAlt: "Foto Rezha Herbi Saputra, memakai helm safety dan life vest",
  lead: "Sarjana Teknik Sipil yang pernah menggambar dan menghitung RAB (rencana anggaran biaya), mengerjakan perbaikan tanah di Pelabuhan Patimban, dan kini mengawasi proyek rumah.",
  chips: {
    helm: { tag: "K3", title: "Helm safety", sub: "Alat pelindung diri" },
    vest: { tag: "K3", title: "Life vest", sub: "Alat pelindung diri" },
    roleNow: { tag: "2025", title: "Site Supervisor", sub: "PT Tukangbangun Indonesia" },
    rolePrev: { tag: "2023", title: "Marine CDM", sub: "Project Engineer, Patimban Paket 5" },
  },
  blueprintLabel:
    "Sketsa konsep: potongan rangka gedung empat lantai di atas kolom Cement Deep Mixing, dengan dimensi dan elevasi",
  blueprintNote: "Ilustrasi konsep, tanpa skala",
  primaryCta: { label: "Lihat pengalaman", href: "#pengalaman" },
  secondaryCta: { label: "Hubungi saya", href: "#kontak" },
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

export interface ExperienceItem {
  year: string;
  role: string;
  org: string;
  place?: string;
  featuredLabel?: string;
  body: string;
}

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

export const mediaPlaceholder = {
  label: "Foto proyek",
  title: "Dokumentasi proyek menyusul",
  caption: "Belum ada foto di halaman ini.",
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
  label: "Kontak",
  title: "Ada lowongan atau proyek? Hubungi saya.",
  emailLabel: "Email",
  whatsappLabel: "WhatsApp",
  whatsappHint: " (membuka di tab baru)",
  hobby: "Di luar pekerjaan, hobi saya menggambar dan memancing.",
};

export const footer = {
  backToTop: "Kembali ke atas",
  photoCredit: "Foto: Ben Koorengevel / Unsplash",
};
