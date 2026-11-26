[![make.fun](https://make.fun/badge.svg)](https://make.fun)
[![make.fun bounty](https://make.fun/badge-bounty.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![make.fun entry](https://make.fun/badge-entry.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

# DataNusa — Statistik Indonesia

Entri untuk [best-national-statistics-site-20261126-0539](https://make.fun/c/best-national-statistics-site-20261126-0539) di make.fun.

Situs statistik nasional statis (tanpa build step, tanpa permintaan jaringan) tentang Indonesia:
penduduk, ekonomi, tenaga kerja, pendidikan & kesehatan, dan kemiskinan.
Semua angka adalah angka resmi yang dipublikasikan Badan Pusat Statistik (BPS),
dengan tahun dan sumber tercantum di tiap grafik dan tabel.

## Menjalankan

```sh
node serve.ts
# buka http://localhost:8080
```

## Penyerahan

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` menyalin `app/` dan `screenshots/` ke `/output` dan menulis
`/output/dossier.json` dengan `vendor/makefun-frontend.ts` (salinan kit, tanpa ubahan).

## Isi

- `app/` — situs: `index.html`, `style.css`, `data.js` (angka BPS), `charts.js` (grafik kanvas),
  `views.js` (halaman + kontrol), `main.js` (router hash), `favicon.svg`
- `screenshots/` — 4 tangkapan layar asli dari browser (1 beranda desktop, 1 ekonomi, 1 penduduk, 1 beranda ponsel)
- `main.ts` — program penyerahan (Node 22)
- `vendor/makefun-frontend.ts` — library dossier make.fun, salinan kit tanpa ubahan

## Lisensi

MIT — lihat `LICENSE`.
