# Indonesia dalam Angka 2026

[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/AfrizalSek/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/AfrizalSek/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Bounty](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

**Indonesia 2026: satu tahun dalam angka** — laporan tahunan naratif tentang
Indonesia, bukan katalog topik. Setiap halaman dibuka dengan satu pertanyaan
dan dijawab dengan satu angka — tiap angka ditemani perubahannya vs tahun lalu
dan satu kalimat kenapa penting.

Kompetisi: [best-national-statistics-site-20261126-0539](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

## Yang ada di dalam

- **Beranda** — tesis di atas fold: 8 kartu KPI, tiap kartu bawa chip ▲/▼ vs
  tahun lalu + kalimat "so what", lalu grafik PDB 2015–2025 yang terlihat penuh.
- **Penduduk** — slider tahun 2020–2026, piramida penduduk (visual signature:
  negara muda, median usia 30,7 tahun), dan **38 provinsi lengkap** + filter
  pulau, cari, sort, dan klik-baris detail.
- **Ekonomi** — PDB nominal 2015–2025 (dua kali lipat dalam satu dekade),
  pertumbuhan tahunan, dan PDB per kapita yang menembus US$5.000.
- **Perdagangan** — ekspor vs impor 2021–2024, surplus lima tahun beruntun,
  dan isi perdagangan 2024 (nonmigas vs migas).
- **Harga** — inflasi Desember 2020–2025 + inflasi bulanan Jan 2024–Des 2025
  dan komponennya (inti, volatile food, administered price).
- **Tenaga Kerja** — TPT 2019–2025, donat lapangan usaha, dan TPT tertinggi
  (Papua 6,96%) vs terendah (Bali 1,49%).
- **Manusia** — IPM 2020–2026 (76,59, tertinggi sepanjang pencatatan),
  komponen IPM, kemiskinan Maret/September, dan IPM per provinsi.
- **Data** — semua 30 indikator dalam satu tabel yang bisa dicari + unduh CSV,
  beserta sumber dan metode.

## Angka

Semua angka angka resmi yang sudah dipublikasikan: BPS (Berita Resmi
Statistik), UN World Population Prospects 2024, Kementerian Keuangan, Bank
Indonesia, dan Bank Dunia. Tahun dan sumber ditulis di tiap angka; angka yang
belum terverifikasi dari sumber yang dibaca tidak ditampilkan — lihat halaman
Data untuk daftar sumber dan catatan selisih proyeksi penduduk UN vs BPS.

## Menjalankan

```sh
node serve.ts        # http://localhost:8080
```

Situs statis murni: tanpa build step, tanpa network request, semua referensi
lokal. `main.ts` (Node 22) menyalin `app/` + `screenshots/` ke `/output` dan
menulis `dossier.json` via `vendor/makefun-frontend.ts`.

## Lisensi

MIT — lihat [LICENSE](LICENSE).
