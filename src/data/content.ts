/**
 * All page copy. Source: docs/copy.md (v2, uiux). Facts: docs/BRIEF.md section 3.
 * Do not add facts that are not in the brief.
 */

export const person = {
  name: "Rezha Herbi Saputra",
  shortName: "Rezha",
  email: "rezhahs@gmail.com",
  address: "Perum Harkit, Tangerang",
  // Not rendered in the HTML. Joined only when the WhatsApp button is clicked.
  waParts: ["62856", "7003162"],
  waMessage: "Halo Rezha, saya melihat portofolio Anda.",
  photoAlt: "Foto Rezha Herbi Saputra",
} as const;

export const meta = {
  skipLink: "Lewati ke konten utama",
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
  lead: "Sarjana Teknik Sipil yang bekerja di dua sisi proyek: gambar dan lapangan. Dari hitungan RAB rumah tinggal sampai perbaikan tanah di terminal Pelabuhan Patimban.",
  primaryCta: { label: "Lihat pengalaman", href: "#pengalaman" },
  secondaryCta: { label: "Hubungi saya", href: "#kontak" },
};

export const about = {
  label: "Tentang",
  title: "Gambar yang bagus belum cukup. Harus bisa dibangun.",
  paragraphs: [
    "Saya Rezha Herbi Saputra, lulusan Teknik Sipil Kelas Internasional Universitas Muhammadiyah Surakarta. Saya mulai dari angka dan gambar: menghitung volume pekerjaan sebuah gedung saat kerja praktek, lalu menggambar rumah tinggal dalam 2D dan 3D dan memakai modelnya untuk RAB. Angka di kertas baru berguna kalau orang lapangan bisa memakainya.",
    "Cara berpikir itu terbawa ke proyek yang lebih besar. Di Pelabuhan Patimban, Subang, saya menjadi Project Engineer untuk pekerjaan Cement Deep Mixing di terminal mobil. Saya merencanakan, mengoordinasi, mengawasi, dan mengevaluasi pekerjaan hariannya, lalu melaporkannya ke manajer dan staf.",
    "Sekarang saya Site Supervisor di PT Tukangbangun Indonesia. Saya memegang proyek rumah dari sisi material, tenaga kerja, dan catatan pekerjaan harian. Saya bisa bekerja dalam tim maupun sendiri, dan senang mempelajari hal yang belum pernah saya pegang.",
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
  title: "Dari hitungan sampai lapangan.",
  items: [
    {
      year: "2025",
      role: "Site Supervisor",
      org: "PT Tukangbangun Indonesia",
      body: "Mengawasi pembangunan rumah dari hari ke hari. Menyusun daily summary dan record of works, mengatur material dan tenaga kerja, memastikan gambar kerja dijalankan di lapangan, dan melapor ke manajer.",
    },
    {
      year: "2023",
      role: "Project Engineer",
      org: "Chosuk Development Indonesia",
      place: "Pelabuhan Patimban Paket 5, Subang",
      featuredLabel: "Pelabuhan Patimban",
      body: "Marine Cement Deep Mixing (CDM) untuk perbaikan tanah di terminal mobil, di bawah JV TOA–Waskita–Wakachiku–Hutama–Abipraya. Merencanakan, mengoordinasi, mengawasi, dan mengevaluasi pekerjaan CDM harian. Menyusun dan mereview daily summary, gambar kerja, record of works, pekerjaan anchor, dan survei, lalu melapor ke manajer dan staf.",
    },
    {
      year: "2020",
      role: "Drafter",
      org: "CV Parama Tjipta (freelance)",
      body: "Menggambar rumah tinggal 2D dan 3D. Model 3D di SketchUp dipakai langsung untuk menghitung RAB.",
    },
    {
      year: "2019",
      role: "Quantity Surveyor (kerja praktek)",
      org: "PT Adhi Karya – Hutama Karya JV",
      body: "Menghitung volume pekerjaan pada proyek gedung Universitas Sultan Ageng Tirtayasa, Sindangsari, Banten.",
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
  title: "Apa itu Cement Deep Mixing?",
  body: "Pelabuhan berdiri di pesisir, dan tanah di bawahnya harus kuat menahan terminal di atasnya. Pada CDM, semen diinjeksikan lalu diaduk langsung dengan tanah di tempat, tanpa digali. Hasilnya tanah yang lebih kuat, lebih sulit ditembus air, dan lebih kecil penurunannya. Tekniknya pertama diuji di lapangan di Jepang pada 1970.",
  factsLabel: "Tentang pelabuhannya",
  facts: [
    { value: "654 ha", label: "area pelabuhan" },
    { value: "~145 km", label: "dari Jakarta" },
    { value: "20 Des 2020", label: "fase 1 diresmikan" },
  ],
  source: "Sumber: Wikipedia, Patimban Deep Sea Port. Angka milik pelabuhan, bukan capaian pribadi.",
};

export const skills = {
  label: "Keahlian",
  title: "Alat dan cara kerja.",
  software: { group: "Desain & hitungan", items: ["AutoCAD", "SketchUp", "SAP2000", "Photoshop"] },
  field: {
    group: "Lapangan",
    items: [
      "Pengawasan pekerjaan harian",
      "Pelaporan (daily summary, record of works)",
      "Survei",
      "Kontrol material & tenaga kerja",
      "Perhitungan volume / RAB",
    ],
  },
  languages: { group: "Bahasa", items: ["Indonesia", "English"] },
};

export const organization = {
  label: "Organisasi",
  title: "Pernah memimpin satu divisi.",
  period: "2017–2018",
  role: "Kepala Divisi Internal Eksternal",
  org: "Himpunan mahasiswa Teknik Sipil kelas internasional UMS",
  body: "Divisi ini mengurus hubungan ke dalam dan ke luar himpunan.",
};

export const contact = {
  label: "Kontak",
  title: "Ada proyek atau lowongan? Kirim saja.",
  whatsappLabel: "Chat lewat WhatsApp",
  whatsappHint: " (membuka WhatsApp di tab baru)",
  hobby: "Di luar kerja, saya menggambar dan memancing.",
};

export const footer = {
  backToTop: "Kembali ke atas",
};
