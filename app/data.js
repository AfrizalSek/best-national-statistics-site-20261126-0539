// Indonesia dalam Angka 2026 — data.
// Setiap angka di bawah ini angka resmi yang sudah dipublikasikan, dengan
// tahun dan sumber ditulis di tiap seri. Tidak ada angka karangan: seri yang
// tahun terakhirnya belum terverifikasi dari sumber yang dibaca ditulis
// sampai tahun terakhir yang terverifikasi, dan kekosongannya dicatat.
// Sumber utama: BPS (bps.go.id, Berita Resmi Statistik), UN World Population
// Prospects 2024, Kementerian Keuangan, Bank Indonesia, Bank Dunia.

export const SITE = {
  title: 'Indonesia dalam Angka',
  year: 2026,
  thesis: 'Indonesia 2026: satu tahun dalam angka',
  lede: 'Satu tahun Indonesia, dijawab dengan angka — berapa orangnya, seberapa besar ekonominya, dan bagaimana hidup warganya berubah dari tahun ke tahun.',
  facts: [
    ['Ibu kota', 'Jakarta'],
    ['Luas daratan', '1.904.569 km²'],
    ['Pulau', '17.508'],
    ['Provinsi', '38'],
    ['Bahasa', 'Bahasa Indonesia'],
    ['Mata uang', 'Rupiah'],
  ],
};

// Delapan kartu utama beranda. Tiap kartu: nilai terbaru + perubahan vs
// periode sebelumnya + satu kalimat "kenapa penting".
export const KPIS = [
  {
    label: 'Penduduk',
    value: '287,2 jt',
    year: 'pertengahan 2026',
    change: { dir: 'up', text: '▲ +0,97% vs 2025' },
    why: 'Negara ke-4 terpadat di dunia; separuh penduduk berusia di bawah 31 tahun.',
    route: '#/penduduk',
    source: 'BPS, proyeksi pertengahan tahun',
  },
  {
    label: 'PDB',
    value: 'Rp23.821,1 T',
    year: '2025, harga berlaku',
    change: { dir: 'up', text: '▲ tumbuh 5,11% vs 5,03% (2024)' },
    why: 'Tumbuh lebih cepat dari 2024; konsumsi rumah tangga penopang utama (53,8% PDB).',
    route: '#/ekonomi',
    source: 'BPS, 5 Feb 2026',
  },
  {
    label: 'PDB per kapita',
    value: 'Rp83,7 jt',
    year: '2025',
    change: { dir: 'up', text: '▲ +6,5% vs Rp78,6 jt (2024)' },
    why: 'Tembus US$5.083 — pertama kali di atas US$5.000.',
    route: '#/ekonomi',
    source: 'BPS, 5 Feb 2026',
  },
  {
    label: 'Inflasi',
    value: '2,92%',
    year: 'Des 2025, y-on-y',
    change: { dir: 'up', text: '▲ +1,35 poin vs 1,57% (Des 2024)' },
    why: 'Naik tapi tetap dalam sasaran 2,5% ± 1%; didorong volatile food 6,21%.',
    route: '#/harga',
    source: 'BPS, 5 Jan 2026',
  },
  {
    label: 'Pengangguran',
    value: '4,85%',
    year: 'Agu 2025',
    change: { dir: 'down', text: '▼ −0,06 poin vs 4,91% (Agu 2024)' },
    why: '7,46 juta orang menganggur; 146,54 juta orang bekerja.',
    route: '#/tenaga-kerja',
    source: 'BPS, 5 Nov 2025',
  },
  {
    label: 'Kemiskinan',
    value: '8,07%',
    year: 'Mar 2026',
    change: { dir: 'down', text: '▼ −0,18 poin vs Sep 2025 (8,25%)' },
    why: '22,93 juta orang; turun 0,43 juta dalam enam bulan.',
    route: '#/manusia',
    source: 'BPS, Agu 2026',
  },
  {
    label: 'IPM',
    value: '76,59',
    year: '2026',
    change: { dir: 'up', text: '▲ +0,69 poin vs 75,90 (2025)' },
    why: 'Kategori tinggi; tertinggi DKI Jakarta 85,88, terendah Papua Pegunungan 55,25.',
    route: '#/manusia',
    source: 'BPS, 5 Nov 2026',
  },
  {
    label: 'Ekspor',
    value: 'US$264,70 M',
    year: '2024',
    change: { dir: 'up', text: '▲ +2,29% vs 2023' },
    why: 'Surplus lima tahun beruntun: US$31,04 M pada 2024.',
    route: '#/perdagangan',
    source: 'BPS via Kemenkeu, 16 Jan 2025',
  },
];

// Penduduk pertengahan tahun (juta jiwa). 2020 hasil Sensus Penduduk 2020;
// 2021-2026 proyeksi BPS. Sumber: BPS, dikutip Indonesia Investments.
export const POPULATION = {
  title: 'Jumlah penduduk Indonesia (pertengahan tahun)',
  unit: 'juta jiwa',
  years: [2020, 2021, 2022, 2023, 2024, 2025, 2026],
  values: [270.2, 272.7, 275.8, 278.7, 281.6, 284.44, 287.2],
  growth: [null, null, 1.13, 1.06, 1.04, 1.01, 0.97],
  note: '2020 hasil Sensus Penduduk; 2021–2026 proyeksi BPS.',
};

// Piramida penduduk — UN World Population Prospects 2024, proyeksi 1 Juli
// 2026 (jiwa). Kelompok 85+ digabung dari 85-89, 90-94, 95-99, 100+.
// Catatan jujur: jumlah 18 kelompok di tabel sumber = 287.886.785 jiwa,
// 2 jiwa di atas total headline UN (287.886.783) — selisih agregasi di tabel
// sumbernya sendiri; angka per kelompok disalin persis dari sumber.
// Total UN 287.886.783 — berbeda tipis dari proyeksi BPS (287,2 jt) karena
// metodologi proyeksi berbeda; keduanya dicatat apa adanya di halaman Data.
export const PYRAMID = {
  title: 'Piramida penduduk 2026 (UN WPP 2024)',
  source: 'UN World Population Prospects 2024, proyeksi 1 Juli 2026',
  groups: [
    { label: '0–4', male: 11291158, female: 10687215 },
    { label: '5–9', male: 11594134, female: 10993153 },
    { label: '10–14', male: 12385549, female: 11757780 },
    { label: '15–19', male: 12196607, female: 11588574 },
    { label: '20–24', male: 11395524, female: 10838044 },
    { label: '25–29', male: 11246474, female: 10728551 },
    { label: '30–34', male: 10949648, female: 10454361 },
    { label: '35–39', male: 10603474, female: 10149519 },
    { label: '40–44', male: 10586832, female: 10224680 },
    { label: '45–49', male: 9921448, female: 9746160 },
    { label: '50–54', male: 8854610, female: 8887185 },
    { label: '55–59', male: 7683134, female: 7923920 },
    { label: '60–64', male: 6129534, female: 6587439 },
    { label: '65–69', male: 4419393, female: 5062071 },
    { label: '70–74', male: 2758248, female: 3462570 },
    { label: '75–79', male: 1475038, female: 2123606 },
    { label: '80–84', male: 752606, female: 1296306 },
    { label: '85+', male: 366833, female: 765407 },
  ],
  summary: [
    ['Usia 0–14', '23,9%', '68,71 jt anak'],
    ['Usia produktif 15–64', '68,3%', '196,70 jt orang'],
    ['Usia 65+', '7,8%', '22,48 jt lansia'],
    ['Usia median', '30,7 thn', 'separuh penduduk di bawah 30,7 tahun'],
    ['Rasio ketergantungan', '46,4', '46 tanggungan per 100 usia kerja'],
    ['TFR', '2,08', 'anak per perempuan — di bawah replacement 2,1'],
  ],
};

// 38 provinsi — penduduk pertengahan 2025 (BPS, dikutip Wikipedia,
// "Provinces of Indonesia"). Jumlah 38 provinsi: 284.438.600 jiwa,
// sama dengan proyeksi BPS pertengahan 2025 (284,44 jt).
export const PROVINCES = [
  { name: 'Jawa Barat', island: 'Jawa', pop: 50759000, density: 1370 },
  { name: 'Jawa Timur', island: 'Jawa', pop: 42089300, density: 876 },
  { name: 'Jawa Tengah', island: 'Jawa', pop: 38233900, density: 1113 },
  { name: 'Sumatera Utara', island: 'Sumatera', pop: 15785800, density: 218 },
  { name: 'Banten', island: 'Jawa', pop: 12537400, density: 1341 },
  { name: 'DKI Jakarta', island: 'Jawa', pop: 10678000, density: 16155 },
  { name: 'Sulawesi Selatan', island: 'Sulawesi', pop: 9563100, density: 211 },
  { name: 'Lampung', island: 'Sumatera', pop: 9522900, density: 284 },
  { name: 'Sumatera Selatan', island: 'Sumatera', pop: 8928500, density: 103 },
  { name: 'Riau', island: 'Sumatera', pop: 6811200, density: 76 },
  { name: 'Sumatera Barat', island: 'Sumatera', pop: 5914300, density: 140 },
  { name: 'Kalimantan Barat', island: 'Kalimantan', pop: 5766000, density: 39 },
  { name: 'Nusa Tenggara Timur', island: 'Nusa Tenggara', pop: 5742600, density: 124 },
  { name: 'Nusa Tenggara Barat', island: 'Nusa Tenggara', pop: 5731100, density: 291 },
  { name: 'Aceh', island: 'Sumatera', pop: 5626000, density: 99 },
  { name: 'Bali', island: 'Nusa Tenggara', pop: 4461300, density: 798 },
  { name: 'Kalimantan Selatan', island: 'Kalimantan', pop: 4323300, density: 116 },
  { name: 'Kalimantan Timur', island: 'Kalimantan', pop: 4267600, density: 34 },
  { name: 'DI Yogyakarta', island: 'Jawa', pop: 3781500, density: 1193 },
  { name: 'Jambi', island: 'Sumatera', pop: 3768500, density: 77 },
  { name: 'Sulawesi Tengah', island: 'Sulawesi', pop: 3156100, density: 51 },
  { name: 'Kalimantan Tengah', island: 'Kalimantan', pop: 2845000, density: 19 },
  { name: 'Sulawesi Tenggara', island: 'Sulawesi', pop: 2836700, density: 78 },
  { name: 'Sulawesi Utara', island: 'Sulawesi', pop: 2721400, density: 188 },
  { name: 'Kepulauan Riau', island: 'Sumatera', pop: 2213500, density: 268 },
  { name: 'Bengkulu', island: 'Sumatera', pop: 2138000, density: 106 },
  { name: 'Maluku', island: 'Maluku', pop: 1970600, density: 43 },
  { name: 'Kepulauan Bangka Belitung', island: 'Sumatera', pop: 1550800, density: 93 },
  { name: 'Sulawesi Barat', island: 'Sulawesi', pop: 1525300, density: 92 },
  { name: 'Papua Tengah', island: 'Papua', pop: 1492300, density: 24 },
  { name: 'Papua Pegunungan', island: 'Papua', pop: 1484900, density: 29 },
  { name: 'Maluku Utara', island: 'Maluku', pop: 1373800, density: 42 },
  { name: 'Gorontalo', island: 'Sulawesi', pop: 1242200, density: 103 },
  { name: 'Papua', island: 'Papua', pop: 1073600, density: 13 },
  { name: 'Kalimantan Utara', island: 'Kalimantan', pop: 749400, density: 11 },
  { name: 'Papua Barat Daya', island: 'Papua', pop: 636400, density: 16 },
  { name: 'Papua Barat', island: 'Papua', pop: 587600, density: 10 },
  { name: 'Papua Selatan', island: 'Papua', pop: 549700, density: 5 },
];

// PDB atas dasar harga berlaku (Rp triliun). 2014-2018 dari Statistik
// Indonesia 2024 (tabel Statistik Kunci); 2019-2025 dari rilis BPS.
export const GDP_NOMINAL = {
  title: 'PDB atas dasar harga berlaku',
  unit: 'Rp triliun',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  values: [11526.3, 12401.7, 13589.8, 14838.8, 15832.7, 15443.4, 16976.7, 19588.4, 20892.4, 22139.0, 23821.1],
  note: 'PDB 2025 dua kali lipat PDB 2015 (2,07×).',
};

// Pertumbuhan ekonomi (%, y-on-y). 2015-2018 dari Statistik Indonesia 2024;
// 2019-2025 dari rilis BPS.
export const GDP_GROWTH = {
  title: 'Pertumbuhan ekonomi (PDB, % y-on-y)',
  unit: '%',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  values: [4.9, 5.0, 5.1, 5.2, 5.02, -2.07, 3.7, 5.31, 5.05, 5.03, 5.11],
  note: '2020 kontraksi pandemi; 2025 tumbuh 5,11%, lebih cepat dari 2024.',
};

// PDB per kapita (Rp juta). Sumber: BPS via Kadin / rilis BPS.
export const GDP_PER_CAPITA = {
  title: 'PDB per kapita',
  unit: 'Rp juta',
  years: [2023, 2024, 2025],
  values: [75.0, 78.6, 83.7],
  usd: [4919.7, 4960.3, 5083.4],
  note: '2025: pertama kali di atas US$5.000.',
};

// Inflasi Desember (y-on-y, %). Sumber: BPS.
export const INFLATION = {
  title: 'Inflasi Desember (y-on-y)',
  unit: '%',
  years: [2020, 2021, 2022, 2023, 2024, 2025],
  values: [1.68, 1.87, 5.51, 2.61, 1.57, 2.92],
  note: 'Sasaran inflasi 2,5% ± 1%. 2022 tertinggi dalam seri ini.',
};

// Inflasi bulanan y-on-y (%), Jan 2024-Des 2025. Sumber: BRS BPS
// No. 01/01/Th. XXIX, 5 Jan 2026 (tabel y-on-y 2024 dan 2025).
export const INFLATION_MONTHLY = {
  title: 'Inflasi bulanan (y-on-y)',
  unit: '%',
  labels: ['Jan 24', 'Feb 24', 'Mar 24', 'Apr 24', 'Mei 24', 'Jun 24', 'Jul 24', 'Agu 24', 'Sep 24', 'Okt 24', 'Nov 24', 'Des 24', 'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'Mei 25', 'Jun 25', 'Jul 25', 'Agu 25', 'Sep 25', 'Okt 25', 'Nov 25', 'Des 25'],
  values: [2.57, 2.75, 3.05, 3.0, 2.84, 2.51, 2.13, 2.12, 1.84, 1.71, 1.55, 1.57, 0.76, -0.09, 1.03, 1.95, 1.6, 1.87, 2.37, 2.31, 2.65, 2.86, 2.72, 2.92],
  components2025: [
    ['Inflasi inti', '2,38%'],
    ['Volatile food', '6,21%'],
    ['Administered price', '1,93%'],
  ],
};

// TPT Agustus (% angkatan kerja). Sumber: BPS.
export const UNEMPLOYMENT = {
  title: 'Tingkat Pengangguran Terbuka, Agustus (% angkatan kerja)',
  unit: '%',
  years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
  values: [5.23, 7.07, 6.49, 5.86, 5.32, 4.91, 4.85],
  note: 'Agu 2025: 7,46 jt penganggur; TPAK 70,59%; 146,54 jt orang bekerja.',
};

// TPT Agustus 2025 menurut provinsi — hanya tertinggi dan terendah yang
// terverifikasi dari publikasi BPS (Papua 6,96% tertinggi, Bali 1,49%
// terendah). Seri lengkap per provinsi tidak dimuat agar tidak mengarang.
export const UNEMPLOYMENT_EXTREMES = {
  highest: [['Papua', 6.96]],
  lowest: [['Bali', 1.49]],
  note: 'TPT tertinggi Agu 2025: Papua 6,96%; terendah: Bali 1,49% (BPS).',
};

// Pangsa pekerja menurut lapangan usaha utama, Agustus 2024 (BPS).
export const EMPLOYMENT_SECTORS = [
  { name: 'Pertanian, kehutanan, perikanan', value: 28.18 },
  { name: 'Perdagangan besar dan eceran', value: 18.89 },
  { name: 'Industri pengolahan', value: 13.83 },
  { name: 'Sektor lain (gabungan)', value: 39.1 },
];

// Kemiskinan (% penduduk). Maret 2019-2026 dan September 2019-2025.
// Sumber: BPS (BRS Profil Kemiskinan). Garis kemiskinan Mar 2025
// Rp609.160/kapita/bln; Mar 2026 Rp669.235/kapita/bln.
export const POVERTY_MARCH = {
  title: 'Tingkat kemiskinan, Maret (% penduduk)',
  unit: '%',
  years: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
  values: [9.41, 9.78, 10.14, 9.54, 9.36, 9.03, 8.47, 8.07],
  millions: [null, null, null, null, null, null, 23.85, 22.93],
};
export const POVERTY_SEPTEMBER = {
  title: 'Tingkat kemiskinan, September (% penduduk)',
  unit: '%',
  years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
  values: [9.22, 10.19, 9.71, 9.57, 9.36, 8.57, 8.25],
  millions: [null, null, null, null, null, null, 23.36],
};

// IPM. 2020-2026. Sumber: BPS (BRS IPM 5 Nov 2026).
export const HDI = {
  title: 'Indeks Pembangunan Manusia (IPM)',
  unit: 'indeks',
  years: [2020, 2021, 2022, 2023, 2024, 2025, 2026],
  values: [72.81, 73.16, 73.77, 74.39, 75.02, 75.9, 76.59],
  note: 'Kategori pembangunan manusia tinggi.',
};
export const HDI_COMPONENTS_2026 = [
  ['Umur Harapan Hidup', '74,68 thn', '+0,21 thn vs 2025'],
  ['Harapan Lama Sekolah', '13,34 thn', '+0,04 thn vs 2025'],
  ['Rata-rata Lama Sekolah', '9,16 thn', 'naik vs 2025'],
  ['Pengeluaran riil per kapita', 'Rp13,37 jt/thn', 'disesuaikan'],
];
export const HDI_PROVINCES_2026 = [
  ['DKI Jakarta', 85.88, 'sangat tinggi'],
  ['DI Yogyakarta', 83.43, 'sangat tinggi'],
  ['Kepulauan Riau', 81.12, 'sangat tinggi'],
  ['Kalimantan Timur', 80.09, 'sangat tinggi'],
  ['Bali', 80.03, 'sangat tinggi'],
  ['Papua Pegunungan', 55.25, 'rendah — terendah nasional'],
];

// Perdagangan luar negeri (US$ miliar). Sumber: BPS via Kemenkeu.
export const TRADE = {
  title: 'Ekspor, impor, dan surplus (US$ miliar)',
  years: [2021, 2022, 2023, 2024],
  exports: [231.61, 291.9, 258.82, 264.7],
  imports: [196.27, 237.44, 221.93, 233.66],
  surplus: [35.34, 54.46, 36.89, 31.04],
  split2024: [
    // Catatan: komponen Kemendag (248,83 + 15,89 = 264,72) berselisih 0,02
    // dari total ekspor yang dipublikasikan (264,70) — pembulatan di sumber.
    ['Ekspor nonmigas', 248.83],
    ['Ekspor migas', 15.89],
    ['Impor nonmigas', 197.38],
    ['Impor migas', 36.28],
  ],
  note: 'Surplus lima tahun beruntun (2020–2024). Impor 2024: bahan baku/penolong + barang modal 90,28%.',
};

// Rilis BPS terbaru yang dikutip situs ini.
export const RELEASES = [
  { date: '5 Nov 2026', title: 'IPM Indonesia 2026 mencapai 76,59', detail: 'Naik 0,69 poin dari 75,90 pada 2025; UHH 74,68 tahun.' },
  { date: 'Agu 2026', title: 'Kemiskinan Maret 2026 turun ke 8,07%', detail: '22,93 juta orang, turun 0,43 juta dari September 2025.' },
  { date: '5 Feb 2026', title: 'Ekonomi Indonesia 2025 tumbuh 5,11%', detail: 'PDB Rp23.821,1 triliun; PDB per kapita Rp83,7 juta (US$5.083,4).' },
  { date: '5 Jan 2026', title: 'Inflasi Desember 2025 sebesar 2,92%', detail: 'IHK 109,92; inti 2,38%, volatile food 6,21%.' },
  { date: '5 Nov 2025', title: 'TPT Agustus 2025 sebesar 4,85%', detail: 'Turun 0,06 poin dari Agustus 2024; 7,46 juta penganggur.' },
  { date: '15 Jan 2025', title: 'Ekspor 2024 mencapai US$264,70 miliar', detail: 'Surplus perdagangan US$31,04 miliar, tahun kelima beruntun.' },
];

// Indeks semua indikator untuk halaman Data (cari + unduh CSV).
export const INDICATOR_INDEX = [
  ['Penduduk (pertengahan tahun)', '287,2 jt', '2026', 'BPS, proyeksi'],
  ['Laju pertumbuhan penduduk', '0,97%', '2026', 'BPS, proyeksi'],
  ['Usia median', '30,7 tahun', '2026', 'UN WPP 2024'],
  ['Usia produktif 15–64', '68,3%', '2026', 'UN WPP 2024'],
  ['Rasio ketergantungan', '46,4', '2026', 'UN WPP 2024'],
  ['TFR', '2,08', '2026', 'UN WPP 2024'],
  ['PDB (harga berlaku)', 'Rp23.821,1 T', '2025', 'BPS'],
  ['Pertumbuhan ekonomi', '5,11%', '2025', 'BPS'],
  ['PDB per kapita', 'Rp83,7 jt', '2025', 'BPS'],
  ['PDB per kapita (US$)', 'US$5.083,4', '2025', 'BPS'],
  ['Konsumsi rumah tangga (pangsa PDB)', '53,8%', '2025', 'BPS'],
  ['Inflasi (Des, y-on-y)', '2,92%', 'Des 2025', 'BPS'],
  ['Inflasi inti (Des, y-on-y)', '2,38%', 'Des 2025', 'BPS'],
  ['TPT (Agustus)', '4,85%', 'Agu 2025', 'BPS'],
  ['TPAK (Agustus)', '70,59%', 'Agu 2025', 'BPS'],
  ['Penduduk bekerja', '146,54 jt', 'Agu 2025', 'BPS'],
  ['Pekerja pertanian (pangsa)', '28,18%', 'Agu 2024', 'BPS'],
  ['Kemiskinan (Maret)', '8,07%', 'Mar 2026', 'BPS'],
  ['Kemiskinan (September)', '8,25%', 'Sep 2025', 'BPS'],
  ['Garis kemiskinan', 'Rp669.235/kap/bln', 'Mar 2026', 'BPS'],
  ['Rasio gini', '0,363', 'Sep 2025', 'BPS'],
  ['IPM', '76,59', '2026', 'BPS'],
  ['Umur Harapan Hidup', '74,68 thn', '2026', 'BPS'],
  ['Harapan Lama Sekolah', '13,34 thn', '2026', 'BPS'],
  ['Rata-rata Lama Sekolah', '9,16 thn', '2026', 'BPS'],
  ['Ekspor', 'US$264,70 M', '2024', 'BPS'],
  ['Impor', 'US$233,66 M', '2024', 'BPS'],
  ['Surplus perdagangan', 'US$31,04 M', '2024', 'BPS'],
  ['Ekspor nonmigas', 'US$248,83 M', '2024', 'BPS via Kemendag'],
  ['Impor bahan baku + barang modal (pangsa)', '90,28%', '2024', 'BPS via Kemendag'],
];

export const SOURCES = [
  ['BPS — Berita Resmi Statistik', 'bps.go.id — rilis IPM 5 Nov 2026, ekonomi 5 Feb 2026, inflasi 5 Jan 2026, ketenagakerjaan 5 Nov 2025, kemiskinan Jul 2025 & Agu 2026.'],
  ['BPS — Statistik Indonesia 2024', 'Tabel Statistik Kunci: PDB harga berlaku dan laju pertumbuhan 2014–2018.'],
  ['UN World Population Prospects 2024', 'Piramida penduduk 1 Juli 2026, usia median 30,7, TFR 2,08 (populationpyramids.org).'],
  ['Kementerian Keuangan', 'Siaran pers 16 Jan 2025: ekspor-impor dan surplus perdagangan 2024.'],
  ['Bank Indonesia', 'Analisis Inflasi Desember 2025: komponen inti, volatile food, administered price.'],
  ['Bank Dunia', 'Rasio ketergantungan 2024–2025 (46,8 → 46,6).'],
  ['Wikipedia — Provinces of Indonesia', 'Penduduk 38 provinsi pertengahan 2025 (sumber: BPS). Jumlah 284.438.600 jiwa.'],
];
