/**
 * All page copy + facts. Source: docs/BRIEF.md section 3 (facts) and section 4 (copy v1).
 * Phase 1: replace with docs/copy.md from uiux. Never add facts that are not in the brief.
 */

export const person = {
  name: "Rezha Herbi Saputra",
  shortName: "Rezha",
  role: "Teknik Sipil",
  city: "Tangerang",
  email: "rezhahs@gmail.com",
  address: "Perum Harkit, Tangerang",
  // Not rendered as text in the markup. Assembled only when the WhatsApp button is clicked.
  waParts: ["62856", "7003162"],
} as const;

export const navItems = [
  { href: "#tentang", label: "Tentang" },
  { href: "#pengalaman", label: "Pengalaman" },
  { href: "#sorotan", label: "Sorotan" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#kontak", label: "Kontak" },
] as const;

export const hero = {
  eyebrow: "Teknik Sipil · Tangerang",
  lead: "Sarjana Teknik Sipil yang bekerja di dua sisi proyek: gambar dan lapangan. Dari hitungan RAB rumah tinggal sampai perbaikan tanah di terminal Pelabuhan Patimban.",
  primaryCta: { label: "Lihat pengalaman", href: "#pengalaman" },
  secondaryCta: { label: "Hubungi saya", href: "#kontak" },
};

export const about = {
  title: "Gambar yang bagus belum cukup. Harus bisa dibangun.",
  paragraphs: [
    "Saya Rezha Herbi Saputra, lulusan Teknik Sipil Kelas Internasional Universitas Muhammadiyah Surakarta. Karier saya mulai dari meja gambar: menggambar rumah tinggal dalam 2D dan 3D, lalu menghitung volumenya untuk RAB. Dari situ saya belajar satu hal. Angka di kertas baru berguna kalau orang lapangan bisa memakainya.",
    "Cara pikir itu terbawa ke proyek yang lebih besar. Di Pelabuhan Patimban, Subang, saya menjadi Project Engineer untuk pekerjaan Cement Deep Mixing di terminal mobil: merencanakan, mengoordinasi, mengawasi, dan mengevaluasi pekerjaan harian, lalu melaporkannya ke manajer dan staf.",
    "Sekarang saya Site Supervisor di PT Tukangbangun Indonesia, memegang proyek rumah dari sisi material, tenaga kerja, dan catatan pekerjaan harian. Saya bisa bekerja dalam tim maupun sendiri, dan senang mempelajari hal yang belum pernah saya pegang.",
  ],
};

export const experience = [
  {
    year: "2025",
    role: "Site Supervisor",
    org: "PT Tukangbangun Indonesia",
    place: undefined as string | undefined,
    body: "Mengawasi pembangunan rumah dari hari ke hari. Menyusun daily summary dan record of works, mengatur material dan tenaga kerja, memastikan gambar kerja dijalankan sesuai standar, dan melapor ke manajer.",
  },
  {
    year: "2023",
    role: "Project Engineer",
    org: "Chosuk Development Indonesia",
    place: "Pelabuhan Patimban Paket 5, Subang",
    body: "Pekerjaan Marine Cement Deep Mixing (CDM) untuk perbaikan tanah di terminal mobil, di bawah JV TOA–Waskita–Wakachiku–Hutama–Abipraya. Merencanakan dan mengevaluasi pekerjaan harian, mereview gambar kerja, record of works, pekerjaan anchor dan survei, serta menyiapkan laporan untuk manajer dan staf.",
  },
  {
    year: "2020",
    role: "Drafter",
    org: "CV Parama Tjipta (freelance)",
    place: undefined,
    body: "Menggambar rumah tinggal 2D dan 3D. Model 3D di SketchUp dipakai langsung untuk menghitung RAB.",
  },
  {
    year: "2019",
    role: "Quantity Surveyor (kerja praktek)",
    org: "PT Adhi Karya – Hutama Karya JV",
    place: undefined,
    body: "Menghitung volume pekerjaan pada proyek gedung Universitas Sultan Ageng Tirtayasa, Sindangsari, Banten.",
  },
];

export const spotlight = {
  title: "Apa itu Cement Deep Mixing?",
  body: "Pelabuhan berdiri di pesisir, dan tanah di bawahnya harus kuat menahan terminal di atasnya. Pada CDM, semen diinjeksikan lalu diaduk langsung dengan tanah di tempat, tanpa digali. Hasilnya tanah yang lebih kuat, lebih sulit ditembus air, dan lebih kecil penurunannya. Tekniknya pertama diuji di lapangan di Jepang pada 1970.",
  factsLabel: "Tentang proyeknya",
  facts: [
    { value: "654 ha", label: "area pelabuhan" },
    { value: "~145 km", label: "dari Jakarta" },
    { value: "20 Des 2020", label: "fase 1 diresmikan" },
  ],
  mediaPlaceholder: "Dokumentasi proyek menyusul",
};

export const skills = [
  { group: "Desain & hitungan", items: ["AutoCAD", "SketchUp", "SAP2000", "Photoshop"] },
  {
    group: "Lapangan",
    items: [
      "Pengawasan pekerjaan harian",
      "Pelaporan (daily summary, record of works)",
      "Survei",
      "Kontrol material & tenaga kerja",
      "Perhitungan volume / RAB",
    ],
  },
  { group: "Bahasa", items: ["Indonesia", "English"] },
];

export const organization = {
  period: "2017–2018",
  role: "Kepala Divisi Internal Eksternal",
  org: "Himpunan mahasiswa Teknik Sipil kelas internasional UMS",
  body: "Mengurus hubungan ke dalam dan ke luar organisasi.",
};

export const contact = {
  title: "Ada proyek atau lowongan? Kirim saja.",
  note: "Hobi di luar kerja: menggambar dan memancing.",
};
