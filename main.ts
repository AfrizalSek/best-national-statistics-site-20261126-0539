// Indonesia dalam Angka 2026 — program penyerahan (Node 22, pustaka standar
// saja). Situsnya adalah file statis di app/ (halaman, gaya, dan skrip yang
// ditulis di sesi ini, tanpa jaringan). Program ini menyalin app/ dan
// screenshots/ dari samping file ini ke /output, lalu menulis
// /output/dossier.json dengan buildDossier dari vendor/makefun-frontend.ts
// (salinan kit, tidak diubah: gate membangun ulang dossier dengan salinan
// yang sama dan membandingkan byte per byte).
//
// Di luar grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Gagal cepat dengan pesan jelas bila app/ tidak lengkap — lebih baik
// daripada dossier yang dibangun dari situs setengah jadi.
if (!existsSync(join(here, 'app', 'index.html'))) {
  throw new Error('main.ts: app/index.html tidak ditemukan di samping file ini');
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Batas gate (reference/gate.json): paling banyak 4 screenshot, masing-masing
// paling besar 256 KiB; app/ paling banyak 993 entri dan 16 MiB; dossier
// paling besar 1,5 MiB. buildDossier menolak apa pun yang melewati batas.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
