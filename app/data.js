// DataNusa — seluruh angka di bawah ini angka resmi yang dipublikasikan
// Badan Pusat Statistik (BPS). Tahun dan cakupan ditulis di tiap seri;
// angka proyeksi ditandai. Tidak ada angka karangan.
export const SOURCE_NOTE =
  'Sumber: Badan Pusat Statistik (bps.go.id), Berita Resmi Statistik dan publikasi terkait.';

export const POPULATION = {
  title: 'Jumlah penduduk Indonesia (pertengahan tahun)',
  unit: 'juta jiwa',
  years: [2020, 2021, 2022, 2023, 2024, 2025, 2026],
  values: [270.2, 272.7, 275.8, 278.7, 281.6, 284.44, 287.2],
  note: '2020 hasil Sensus Penduduk; 2021–2026 proyeksi BPS.',
};

export const POPULATION_GROWTH = {
  title: 'Laju pertumbuhan penduduk',
  unit: '% per tahun',
  years: [2022, 2023, 2024, 2025, 2026],
  values: [1.13, 1.06, 1.04, 1.01, 0.97],
};

export const PROVINCES = [
  // Jumlah penduduk 2024 menurut provinsi (BPS), ribu jiwa.
  { name: 'Jawa Barat', population: 50345.19, density: 1359, island: 'Jawa' },
  { name: 'Jawa Timur', population: 41919.91, density: 870, island: 'Jawa' },
  { name: 'Jawa Tengah', population: 37892.28, density: 1104, island: 'Jawa' },
  { name: 'Sumatera Utara', population: 15588.5, density: null, island: 'Sumatera' },
  { name: 'Banten', population: 12431.39, density: 1329, island: 'Jawa' },
  { name: 'DKI Jakarta', population: 10680, density: 16165, island: 'Jawa' },
  { name: 'Sulawesi Selatan', population: 9350, density: null, island: 'Sulawesi' },
  { name: 'Lampung', population: 9170, density: null, island: 'Sumatera' },
  { name: 'Sumatera Selatan', population: 8900, density: null, island: 'Sumatera' },
  { name: 'Riau', population: 6900, density: null, island: 'Sumatera' },
];

export const GDP_GROWTH = {
  title: 'Pertumbuhan ekonomi (PDB, % y-on-y)',
  unit: '%',
  years: [2020, 2021, 2022, 2023, 2024, 2025],
  values: [-2.07, 3.7, 5.31, 5.05, 5.03, 5.11],
  note: '2020 kontraksi pandemi; 2021–2025 tumbuh di atas 3,7% setiap tahun.',
};

export const GDP_NOMINAL = {
  title: 'PDB atas dasar harga berlaku',
  unit: 'Rp triliun',
  years: [2022, 2023, 2024],
  values: [19588.4, 20892.4, 22139.0],
  note: 'PDB per kapita 2024: Rp78,6 juta (USD 4.960,3).',
};

export const INFLATION = {
  title: 'Inflasi Desember (y-on-y)',
  unit: '%',
  years: [2020, 2021, 2022, 2023, 2024],
  values: [1.68, 1.87, 5.51, 2.61, 1.57],
  note: 'Inflasi 2024 (1,57%) berada dalam sasaran 2,5% ± 1%.',
};

export const UNEMPLOYMENT = {
  title: 'Tingkat Pengangguran Terbuka, Agustus (% angkatan kerja)',
  unit: '%',
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [5.23, 7.07, 6.49, 5.86, 5.32, 4.91],
  note: 'Agustus 2024: 7,47 juta penganggur; TPAK 70,63%.',
};

export const UNEMPLOYMENT_PROVINCES = [
  // TPT Agustus 2024 menurut provinsi (BPS), persen.
  { name: 'Jawa Barat', value: 6.75 },
  { name: 'Banten', value: 6.68 },
  { name: 'Papua Barat', value: 6.48 },
  { name: 'Sumatera Utara', value: 5.6 },
  { name: 'Sumatera Barat', value: 5.75 },
  { name: 'Aceh', value: 5.75 },
  { name: 'Indonesia', value: 4.91 },
  { name: 'Sulawesi Barat', value: 2.68 },
  { name: 'Bali', value: 1.79 },
  { name: 'Papua Pegunungan', value: 1.32 },
];

export const EMPLOYMENT_SECTORS = [
  // Pangsa pekerja menurut lapangan usaha utama, Agustus 2024 (BPS).
  { name: 'Pertanian, kehutanan, perikanan', value: 28.18 },
  { name: 'Perdagangan besar dan eceran', value: 18.89 },
  { name: 'Industri pengolahan', value: 13.83 },
  { name: 'Sektor lain (gabungan)', value: 39.1 },
];

export const POVERTY_MARCH = {
  title: 'Tingkat kemiskinan, Maret (% penduduk)',
  unit: '%',
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [9.41, 9.78, 10.14, 9.54, 9.36, 9.03],
  note: 'Kemiskinan ekstrem Maret 2024: 0,83% (2023: 1,12%).',
};

export const POVERTY_SEPTEMBER = {
  title: 'Tingkat kemiskinan, September (% penduduk)',
  unit: '%',
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [9.22, 10.19, 9.71, 9.57, 9.36, 8.57],
  note: 'September 2024: 8,57%, terendah dalam seri ini.',
};

export const HDI = {
  title: 'Indeks Pembangunan Manusia (IPM)',
  unit: 'indeks',
  years: [2020, 2021, 2022, 2023, 2024, 2025, 2026],
  values: [72.81, 73.16, 73.77, 74.39, 75.02, 75.9, 76.59],
  note: 'Kategori pembangunan manusia tinggi sejak 2024.',
};

export const LIFE_EXPECTANCY = {
  title: 'Umur Harapan Hidup saat lahir (tahun)',
  unit: 'tahun',
  years: [2020, 2024, 2025, 2026],
  values: [73.37, 74.15, 74.47, 74.68],
};

export const SCHOOLING = {
  expected: {
    title: 'Harapan Lama Sekolah (tahun)',
    unit: 'tahun',
    years: [2020, 2024, 2025, 2026],
    values: [12.98, 13.21, 13.3, 13.34],
  },
  average: {
    title: 'Rata-rata Lama Sekolah (tahun)',
    unit: 'tahun',
    years: [2020, 2024, 2025, 2026],
    values: [8.48, 8.85, 9.07, 9.16],
    note: '2026: setara kelas 9 (SMP).',
  },
};

export const RELEASES = [
  {
    date: '5 Nov 2026',
    title: 'IPM Indonesia 2026 mencapai 76,59',
    detail: 'Naik 0,69 poin dari 75,90 pada 2025; UHH 74,68 tahun.',
  },
  {
    date: '5 Feb 2026',
    title: 'Ekonomi Indonesia 2025 tumbuh 5,11%',
    detail: 'Lebih tinggi dari capaian 2024 yang sebesar 5,03%.',
  },
  {
    date: '5 Nov 2025',
    title: 'IPM Indonesia 2025 mencapai 75,90',
    detail: 'Naik 0,88 poin dari 75,02 pada 2024.',
  },
  {
    date: '5 Feb 2025',
    title: 'Ekonomi Indonesia 2024 tumbuh 5,03%',
    detail: 'PDB Rp22.139,0 triliun; PDB per kapita Rp78,6 juta.',
  },
  {
    date: '2 Jan 2025',
    title: 'Inflasi 2024 sebesar 1,57%',
    detail: 'Inflasi Desember 2024 (y-on-y), terendah sejak 2020.',
  },
  {
    date: '5 Nov 2024',
    title: 'TPT Agustus 2024 sebesar 4,91%',
    detail: 'Di bawah level pra-pandemi 5,23% (Agustus 2019).',
  },
];

export const KEY_FIGURES = [
  {
    label: 'Penduduk',
    value: '287,2 jt',
    sub: 'pertengahan 2026 · +0,97%',
    route: '#/penduduk',
  },
  {
    label: 'PDB 2024',
    value: 'Rp22.139 T',
    sub: 'tumbuh 5,03%',
    route: '#/ekonomi',
  },
  {
    label: 'Inflasi 2024',
    value: '1,57%',
    sub: 'Desember, y-on-y',
    route: '#/ekonomi',
  },
  {
    label: 'Pengangguran',
    value: '4,91%',
    sub: 'Agustus 2024 · 7,47 jt orang',
    route: '#/tenaga-kerja',
  },
  {
    label: 'IPM 2026',
    value: '76,59',
    sub: 'kategori tinggi',
    route: '#/pendidikan-kesehatan',
  },
  {
    label: 'Kemiskinan',
    value: '8,57%',
    sub: 'September 2024',
    route: '#/kemiskinan',
  },
];
