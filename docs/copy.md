# Copy v2 (uiux -> frontend)

Bahasa Indonesia, orang pertama, tanpa tanda pisah panjang. Fakta tidak berubah dari BRIEF bagian 3. Kunci di tiap blok mengikuti
struktur `src/data/content.ts` supaya frontend bisa menyalin langsung. Hal yang belum bisa saya pastikan dari sumber ada di bagian "Perlu dikonfirmasi user" paling bawah.

---

## Meta (untuk `index.html`, dipegang frontend)

- title: `Rezha Herbi Saputra | Teknik Sipil, Tangerang`
- description: `Portofolio Rezha Herbi Saputra, sarjana Teknik Sipil di Tangerang. Pengalaman sebagai drafter, quantity surveyor, Project Engineer di Pelabuhan Patimban, dan Site Supervisor.`
- og:title: sama dengan title
- og:description: sama dengan description
- skip link: `Lewati ke konten utama`
- alt foto: `Foto Rezha Herbi Saputra`

## Nav (`navItems`)

Tentang · Pengalaman · Sorotan · Keahlian · Kontak (tidak berubah). Organisasi sengaja tidak masuk nav.

## Hero (`hero`)

- eyebrow: `Teknik Sipil · Tangerang`
- h1 tampil: `Rezha`. Teks `sr-only` di dalam h1: `Rezha Herbi Saputra`
- lead: `Sarjana Teknik Sipil yang bekerja di dua sisi proyek: gambar dan lapangan. Dari hitungan RAB rumah tinggal sampai perbaikan tanah di terminal Pelabuhan Patimban.`
- CTA utama: `Lihat pengalaman` (ke `#pengalaman`)
- CTA kedua: `Hubungi saya` (ke `#kontak`)

## Tentang (`about`)

- label: `Tentang`
- title (h2): `Gambar yang bagus belum cukup. Harus bisa dibangun.`

Paragraf 1:
`Saya Rezha Herbi Saputra, lulusan Teknik Sipil Kelas Internasional Universitas Muhammadiyah Surakarta. Saya mulai dari angka dan gambar: menghitung volume pekerjaan sebuah gedung saat kerja praktek, lalu menggambar rumah tinggal dalam 2D dan 3D dan memakai modelnya untuk RAB. Angka di kertas baru berguna kalau orang lapangan bisa memakainya.`

Paragraf 2:
`Cara berpikir itu terbawa ke proyek yang lebih besar. Di Pelabuhan Patimban, Subang, saya menjadi Project Engineer untuk pekerjaan Cement Deep Mixing di terminal mobil. Saya merencanakan, mengoordinasi, mengawasi, dan mengevaluasi pekerjaan hariannya, lalu melaporkannya ke manajer dan staf.`

Paragraf 3:
`Sekarang saya Site Supervisor di PT Tukangbangun Indonesia. Saya memegang proyek rumah dari sisi material, tenaga kerja, dan catatan pekerjaan harian. Saya bisa bekerja dalam tim maupun sendiri, dan senang mempelajari hal yang belum pernah saya pegang.`

## Pengalaman (`experience`)

- label: `Pengalaman`
- title (h2): `Dari hitungan sampai lapangan.`
- urutan: terbaru ke lama. Tahun saja (CV tidak memberi tanggal akhir), jangan tulis "2023 - sekarang".

1. `2025` · **Site Supervisor** · PT Tukangbangun Indonesia
   `Mengawasi pembangunan rumah dari hari ke hari. Menyusun daily summary dan record of works, mengatur material dan tenaga kerja, memastikan gambar kerja dijalankan di lapangan, dan melapor ke manajer.`

2. `2023` · **Project Engineer** · Chosuk Development Indonesia · Pelabuhan Patimban Paket 5, Subang (penanda "proyek utama": `Pelabuhan Patimban`)
   `Marine Cement Deep Mixing (CDM) untuk perbaikan tanah di terminal mobil, di bawah JV TOA–Waskita–Wakachiku–Hutama–Abipraya. Merencanakan, mengoordinasi, mengawasi, dan mengevaluasi pekerjaan CDM harian. Menyusun dan mereview daily summary, gambar kerja, record of works, pekerjaan anchor, dan survei, lalu melapor ke manajer dan staf.`

3. `2020` · **Drafter** · CV Parama Tjipta (freelance)
   `Menggambar rumah tinggal 2D dan 3D. Model 3D di SketchUp dipakai langsung untuk menghitung RAB.`

4. `2019` · **Quantity Surveyor (kerja praktek)** · PT Adhi Karya – Hutama Karya JV
   `Menghitung volume pekerjaan pada proyek gedung Universitas Sultan Ageng Tirtayasa, Sindangsari, Banten.`

Di bawah entri 2023: frame kosong (lihat bagian Empty state).

## Sorotan CDM (`spotlight`)

- label: `Sorotan`
- title (h2): `Apa itu Cement Deep Mixing?`

Isi (nada: insinyur menjelaskan ke orang awam):
`Pelabuhan berdiri di pesisir, dan tanah di bawahnya harus kuat menahan terminal di atasnya. Pada CDM, semen diinjeksikan lalu diaduk langsung dengan tanah di tempat, tanpa digali. Hasilnya tanah yang lebih kuat, lebih sulit ditembus air, dan lebih kecil penurunannya. Tekniknya pertama diuji di lapangan di Jepang pada 1970.`

Fact strip:
- label: **`Tentang pelabuhannya`** (diubah dari "Tentang proyeknya", alasan di bagian perubahan)
- `654 ha` · area pelabuhan
- `~145 km` · dari Jakarta
- `20 Des 2020` · fase 1 diresmikan
- sumber (caption): `Sumber: Wikipedia, Patimban Deep Sea Port. Angka milik pelabuhan, bukan capaian pribadi.`

Kalimat kedua pada caption penting: tanpa itu angka 654 ha mudah terbaca sebagai ukuran pekerjaan Rezha.

## Keahlian (`skills`)

- label: `Keahlian`
- title (h2): `Alat dan cara kerja.`

- `Desain & hitungan`: AutoCAD, SketchUp, SAP2000, Photoshop
- `Lapangan`: Pengawasan pekerjaan harian · Pelaporan (daily summary, record of works) · Survei · Kontrol material & tenaga kerja · Perhitungan volume / RAB
- `Bahasa`: Indonesia · English (tanpa label tingkat)

## Organisasi (`organization`)

- label: `Organisasi`
- title (h2): `Pernah memimpin satu divisi.`
- periode: `2017–2018`
- peran: `Kepala Divisi Internal Eksternal`
- organisasi: `Himpunan mahasiswa Teknik Sipil kelas internasional UMS`
- isi: `Divisi ini mengurus hubungan ke dalam dan ke luar himpunan.`

## Kontak (`contact`)

- label: `Kontak`
- title (h2): `Ada proyek atau lowongan? Kirim saja.`
- baris email: `rezhahs@gmail.com` (tautan `mailto:`, teks aslinya yang tampil)
- baris WhatsApp: `Chat lewat WhatsApp` (tombol; nomor dirakit saat diklik, tidak ada di HTML)
- alamat (teks polos): `Perum Harkit, Tangerang`
- hobi: `Di luar kerja, saya menggambar dan memancing.`

## Footer

`© 2026 Rezha Herbi Saputra` · tautan `Kembali ke atas` (ke `#beranda`)

## Empty state foto proyek (`mediaPlaceholder`)

- label pojok: `Foto proyek`
- judul: `Dokumentasi proyek menyusul`
- caption: `Belum ada foto di halaman ini.`
- figcaption (pembaca layar): `Dokumentasi proyek menyusul. Belum ada foto di halaman ini.`

## Microcopy lain

- aria-label nav: `Navigasi utama` (sudah ada)
- aria-label tombol WhatsApp: `Buka WhatsApp untuk menghubungi Rezha`
- status setelah klik WhatsApp: `Membuka WhatsApp...` (hanya dipakai pada preferensi reduced-motion atau saat loading)
- halaman 404 (jika SPA fallback menampilkan sesuatu): judul `Halaman tidak ditemukan`, isi `Alamat yang Anda buka tidak ada di situs ini.`, tautan `Kembali ke beranda`

---

## Perubahan dari BRIEF v1 (dan alasannya)

1. **Tentang, paragraf 1.** v1: "Karier saya mulai dari meja gambar ... Dari situ saya belajar satu hal." Itu keliru urutan: CV mencatat Quantity Surveyor (kerja praktek, 2019)
   lebih dulu dari Drafter (2020), dan kalimat "belajar satu hal" mengklaim pelajaran pribadi yang tidak ada di sumber. Sekarang: mulai dari angka dan gambar, urutan sesuai CV. Kalimat
   "Angka di kertas baru berguna kalau orang lapangan bisa memakainya" saya pertahankan sebagai sikap yang sama dengan judul section; user perlu menyetujuinya (lihat bawah).
2. **Tentang, paragraf 2.** Satu kalimat panjang dipecah jadi tiga. "Cara pikir" menjadi "Cara berpikir".
3. **Pengalaman 2025.** "sesuai standar" dihapus: standar tidak ada di fakta. Diganti "dijalankan di lapangan".
4. **Pengalaman 2023.** Daftar tugas ditata ulang mengikuti urutan fakta (merencanakan, mengoordinasi, mengawasi, mengevaluasi, lalu penyusunan dokumen). Tidak ada tugas baru.
5. **Fact strip.** Label "Tentang proyeknya" diubah ke "Tentang pelabuhannya" dan caption menegaskan angka milik pelabuhan. Alasan: Rezha bekerja di Paket 5, sedangkan 654 ha adalah luas seluruh pelabuhan.
   "Proyeknya" bisa dibaca sebagai paket kerja Rezha.
6. **Judul h2 baru** (Pengalaman, Keahlian, Organisasi): v1 tidak punya judul untuk ketiganya, padahal komponen `Section` membutuhkannya.
7. **Organisasi.** v1 "Mengurus hubungan ke dalam dan ke luar organisasi" diubah menjadi "Divisi ini mengurus hubungan ke dalam dan ke luar himpunan." Itu turunan langsung dari nama divisi, bukan tugas baru.
8. **Kontak.** "Hobi di luar kerja: menggambar dan memancing." diubah menjadi kalimat biasa. Tambahan tombol WhatsApp dan alamat sebagai baris tersendiri.

## Pemeriksaan gaya (avoid-ai-writing, mode rewrite)

Dilakukan manual terhadap daftar pola: tanda pisah panjang nol, tidak ada kata daftar-AI (passionate, dinamis, inovatif, seamless dan sejenisnya), tidak ada "Mari kita", tidak ada
emoji, tidak ada bold berlebihan, tidak ada kalimat pembuka "Di era...". Panjang kalimat bervariasi (3 sampai 35 kata). Tanda pisah en (`–`) hanya dipakai pada nama JV dan rentang tahun, sesuai penulisan sumber.
Satu kalimat sikap tetap ada ("Angka di kertas baru berguna kalau orang lapangan bisa memakainya") dan sengaja tidak dibuang: itu satu-satunya tempat suara pribadi muncul.

## Perlu dikonfirmasi user (tidak bisa saya tentukan dari sumber)

1. "Sekarang saya Site Supervisor": apakah 2025 masih berjalan? Copy mengasumsikan ya (BRIEF pertanyaan 1).
2. (Selesai) Kalimat "Saya bisa bekerja dalam tim maupun sendiri, dan senang mempelajari hal yang belum pernah saya pegang" bersumber dari CV, bagian About Me
   ("Can work in teams or work individually. Have interest in learning new experience."). Dikonfirmasi lead di comms. Aman, tidak perlu konfirmasi user.
3. Kalimat "Angka di kertas baru berguna kalau orang lapangan bisa memakainya" dan judul Tentang adalah sikap yang diatasnamakan Rezha. Setujui atau ganti dengan kalimat milik Rezha sendiri.
4. Tahun footer `2026` mengikuti tanggal sistem.
