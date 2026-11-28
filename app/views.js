// views.js — delapan halaman situs, dirender dari data.js.
// Tiap halaman dibuka dengan satu pertanyaan + satu jawaban angka.

import * as D from './data.js';
import { lineChart, barChart, donutChart, pyramidChart, fmtId, el, GREEN, GOLD, BRICK } from './charts.js';

function h(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}

function sectionTitle(question, answer) {
  const s = h('div', 'page-head');
  s.appendChild(h('p', 'page-question', question));
  s.appendChild(h('h1', 'page-title', answer));
  return s;
}

function sourceLine(text) {
  return h('p', 'source', 'Sumber: ' + text);
}

function downloadCsv(filename, rows) {
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ---------- Beranda ----------
export function viewHome() {
  const root = h('div', 'home');
  const head = h('header', 'masthead');
  head.appendChild(h('p', 'masthead-kicker', 'Laporan tahunan · Data resmi BPS dan PBB'));
  head.appendChild(h('h1', 'masthead-title', D.SITE.thesis));
  head.appendChild(h('p', 'masthead-lede', D.SITE.lede));
  root.appendChild(head);

  const facts = h('ul', 'fact-strip');
  for (const [k, v] of D.SITE.facts) {
    const li = h('li');
    li.appendChild(h('span', 'fact-k', k));
    li.appendChild(h('span', 'fact-v', v));
    facts.appendChild(li);
  }
  root.appendChild(facts);

  const grid = h('div', 'kpi-grid');
  for (const k of D.KPIS) {
    const card = document.createElement('a');
    card.className = 'kpi-card';
    card.href = k.route;
    card.appendChild(h('p', 'kpi-label', k.label));
    card.appendChild(h('p', 'kpi-value', k.value));
    card.appendChild(h('p', 'kpi-year', k.year));
    const chip = h('p', 'kpi-chip ' + k.change.dir, k.change.text);
    card.appendChild(chip);
    card.appendChild(h('p', 'kpi-why', k.why));
    grid.appendChild(card);
  }
  root.appendChild(grid);

  const chartSec = h('section', 'chart-section');
  chartSec.appendChild(h('h2', 'chart-title', 'PDB naik dua kali lipat dalam satu dekade'));
  chartSec.appendChild(h('p', 'chart-sub', 'PDB atas dasar harga berlaku, 2015–2025 (Rp triliun). Arahkan kursor ke garis untuk melihat tiap tahun.'));
  chartSec.appendChild(lineChart({ values: D.GDP_NOMINAL.values, labels: D.GDP_NOMINAL.years.map(String), unit: '', color: GREEN, height: 280, ymin: 10000, ymax: 25000 }));
  chartSec.appendChild(sourceLine('BPS — Statistik Indonesia 2024 dan rilis ekonomi 5 Feb 2026.'));
  root.appendChild(chartSec);

  const stories = h('section', 'stories');
  stories.appendChild(h('h2', 'section-title', 'Tiga cerita dari angka tahun ini'));
  const cards = [
    ['Negara muda', 'Separuh penduduk berusia di bawah 30,7 tahun. Kelompok 10–14 tahun adalah yang terbesar — 24,14 juta anak. Bonus demografi masih berjalan, tapi fertilitas sudah di bawah 2,1.', '#/penduduk'],
    ['Ekonomi tumbuh 5,11%', 'PDB 2025 mencapai Rp23.821,1 triliun dan PDB per kapita menembus US$5.000 untuk pertama kalinya. Konsumsi rumah tangga tetap penopang utama.', '#/ekonomi'],
    ['Hidup makin panjang, miskin makin sedikit', 'IPM 76,59 — tertinggi sepanjang sejarah pencatatan. Kemiskinan Maret 2026 di 8,07%, turun 0,43 juta orang dalam enam bulan.', '#/manusia'],
  ];
  const row = h('div', 'story-row');
  for (const [t, body, href] of cards) {
    const a = document.createElement('a');
    a.className = 'story-card';
    a.href = href;
    a.appendChild(h('h3', null, t));
    a.appendChild(h('p', null, body));
    a.appendChild(h('span', 'story-link', 'Baca angkanya →'));
    row.appendChild(a);
  }
  stories.appendChild(row);
  root.appendChild(stories);

  const rel = h('section', 'releases');
  rel.appendChild(h('h2', 'section-title', 'Rilis terbaru yang dikutip'));
  const ul = h('ul', 'release-list');
  for (const r of D.RELEASES) {
    const li = h('li');
    li.appendChild(h('span', 'release-date', r.date));
    const b = h('div');
    b.appendChild(h('strong', null, r.title));
    b.appendChild(h('span', null, ' — ' + r.detail));
    li.appendChild(b);
    ul.appendChild(li);
  }
  rel.appendChild(ul);
  root.appendChild(rel);
  return root;
}

// ---------- Penduduk ----------
export function viewPenduduk() {
  const root = h('div', 'page');
  root.appendChild(sectionTitle('Berapa orang Indonesia, dan seberapa muda mereka?', '287,2 juta jiwa — dan separuh di bawah 31 tahun'));

  // Slider tahun
  const sliderSec = h('section', 'chart-section');
  sliderSec.appendChild(h('h2', 'chart-title', 'Penduduk 2020–2026: geser tahunnya'));
  const sliderRow = h('div', 'slider-row');
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = '6';
  slider.value = '6';
  slider.setAttribute('aria-label', 'Pilih tahun');
  const sliderOut = h('p', 'slider-out');
  sliderRow.appendChild(slider);
  sliderRow.appendChild(sliderOut);
  sliderSec.appendChild(sliderRow);
  const updateSlider = () => {
    const i = Number(slider.value);
    const y = D.POPULATION.years[i];
    const v = D.POPULATION.values[i];
    const g = D.POPULATION.growth[i];
    sliderOut.textContent = `${y}: ${fmtId(v, Number.isInteger(v * 10) ? 1 : 2)} juta jiwa${g ? ` · tumbuh ${fmtId(g, 2)}%` : ' · hasil Sensus Penduduk 2020'}`;
  };
  slider.addEventListener('input', updateSlider);
  updateSlider();
  sliderSec.appendChild(h('p', 'chart-sub', 'Jumlah penduduk pertengahan tahun, juta jiwa. 2020 hasil sensus; 2021–2026 proyeksi BPS.'));
  sliderSec.appendChild(lineChart({ values: D.POPULATION.values, labels: D.POPULATION.years.map(String), unit: '', color: GREEN, height: 240, ymin: 260, ymax: 295 }));
  sliderSec.appendChild(sourceLine('BPS, proyeksi pertengahan tahun.'));
  root.appendChild(sliderSec);

  // Piramida
  const pyrSec = h('section', 'chart-section');
  pyrSec.appendChild(h('h2', 'chart-title', 'Piramida penduduk: negara muda'));
  pyrSec.appendChild(h('p', 'chart-sub', 'Kelompok umur terbesar adalah 10–14 tahun (24,14 juta). Berbeda dengan Jepang yang piramidanya terbalik, Indonesia masih lebar di bawah — negara muda. Arahkan kursor ke tiap baris untuk angkanya.'));
  const toggleRow = h('div', 'toggle-row');
  const btnJt = h('button', 'toggle-btn active', 'Juta jiwa');
  const btnPct = h('button', 'toggle-btn', 'Persen');
  toggleRow.appendChild(btnJt);
  toggleRow.appendChild(btnPct);
  pyrSec.appendChild(toggleRow);
  const pyrBox = h('div', 'pyr-box');
  pyrBox.appendChild(pyramidChart({ groups: D.PYRAMID.groups, mode: 'jt' }));
  pyrSec.appendChild(pyrBox);
  const setMode = (mode, btn) => {
    btnJt.classList.toggle('active', mode === 'jt');
    btnPct.classList.toggle('active', mode === 'pct');
    pyrBox.replaceChildren(pyramidChart({ groups: D.PYRAMID.groups, mode }));
  };
  btnJt.addEventListener('click', () => setMode('jt', btnJt));
  btnPct.addEventListener('click', () => setMode('pct', btnPct));
  const sumGrid = h('div', 'sum-grid');
  for (const [k, v, note] of D.PYRAMID.summary) {
    const d = h('div', 'sum-tile');
    d.appendChild(h('p', 'sum-k', k));
    d.appendChild(h('p', 'sum-v', v));
    d.appendChild(h('p', 'sum-n', note));
    sumGrid.appendChild(d);
  }
  pyrSec.appendChild(sumGrid);
  pyrSec.appendChild(sourceLine(D.PYRAMID.source + '. Total UN 287.886.783 jiwa — berbeda tipis dari proyeksi BPS (287,2 jt) karena metodologi proyeksi berbeda.'));
  root.appendChild(pyrSec);

  // Provinsi
  const provSec = h('section', 'chart-section');
  provSec.appendChild(h('h2', 'chart-title', '38 provinsi, lengkap'));
  provSec.appendChild(h('p', 'chart-sub', 'Penduduk pertengahan 2025. Jawa menampung 55,6% penduduk; Papua Selatan yang terkecil 549.700 jiwa. Klik baris untuk detail provinsi.'));
  const filterRow = h('div', 'filter-row');
  const islandSel = document.createElement('select');
  islandSel.setAttribute('aria-label', 'Filter pulau');
  const islands = ['Semua pulau', ...new Set(D.PROVINCES.map((p) => p.island))];
  for (const isl of islands) {
    const o = document.createElement('option');
    o.value = isl;
    o.textContent = isl;
    islandSel.appendChild(o);
  }
  const search = document.createElement('input');
  search.type = 'search';
  search.placeholder = 'Cari provinsi…';
  search.setAttribute('aria-label', 'Cari provinsi');
  const csvBtn = h('button', 'btn', 'Unduh CSV');
  filterRow.appendChild(islandSel);
  filterRow.appendChild(search);
  filterRow.appendChild(csvBtn);
  provSec.appendChild(filterRow);
  const detail = h('p', 'row-detail', 'Klik salah satu provinsi di tabel untuk melihat bagiannya dari Indonesia.');
  provSec.appendChild(detail);
  const tableWrap = h('div', 'table-wrap');
  const table = document.createElement('table');
  table.className = 'data-table';
  table.innerHTML = '<thead><tr><th data-sort="name">Provinsi</th><th data-sort="island">Pulau</th><th data-sort="pop">Penduduk</th><th data-sort="density">Kepadatan/km²</th><th>Pangsa</th></tr></thead><tbody></tbody>';
  tableWrap.appendChild(table);
  provSec.appendChild(tableWrap);
  const total = D.PROVINCES.reduce((s, p) => s + p.pop, 0);
  let sortKey = 'pop', sortDir = -1;
  const renderRows = () => {
    const q = search.value.trim().toLowerCase();
    const isl = islandSel.value;
    let rows = D.PROVINCES.filter((p) => (isl === 'Semua pulau' || p.island === isl) && p.name.toLowerCase().includes(q));
    rows = rows.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * sortDir);
    const tb = table.querySelector('tbody');
    tb.replaceChildren();
    for (const p of rows) {
      const tr = document.createElement('tr');
      tr.tabIndex = 0;
      const share = (p.pop / total) * 100;
      tr.innerHTML = `<td>${p.name}</td><td>${p.island}</td><td>${fmtId(p.pop)}</td><td>${fmtId(p.density)}</td><td>${fmtId(share, 2)}%</td>`;
      const show = () => { detail.textContent = `${p.name} (${p.island}): ${fmtId(p.pop)} jiwa — ${fmtId(share, 2)}% dari Indonesia, kepadatan ${fmtId(p.density)} jiwa/km² (pertengahan 2025).`; };
      tr.addEventListener('click', show);
      tr.addEventListener('keydown', (e) => { if (e.key === 'Enter') show(); });
      tb.appendChild(tr);
    }
    if (!rows.length) {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="5">Tidak ada provinsi yang cocok — coba kata kunci lain.</td>';
      tb.appendChild(tr);
    }
  };
  table.querySelectorAll('th[data-sort]').forEach((th) => {
    th.addEventListener('click', () => {
      const k = th.dataset.sort;
      if (sortKey === k) sortDir *= -1; else { sortKey = k; sortDir = k === 'name' || k === 'island' ? 1 : -1; }
      renderRows();
    });
  });
  islandSel.addEventListener('change', renderRows);
  search.addEventListener('input', renderRows);
  csvBtn.addEventListener('click', () => downloadCsv('provinsi-2025.csv', [['Provinsi', 'Pulau', 'Penduduk (pertengahan 2025)', 'Kepadatan per km2'], ...D.PROVINCES.map((p) => [p.name, p.island, p.pop, p.density])]));
  renderRows();
  provSec.appendChild(sourceLine('BPS via Wikipedia, "Provinces of Indonesia". Jumlah 38 provinsi: 284.438.600 jiwa — sama dengan proyeksi BPS pertengahan 2025 (284,44 jt).'));
  root.appendChild(provSec);
  return root;
}

// ---------- Ekonomi ----------
export function viewEkonomi() {
  const root = h('div', 'page');
  root.appendChild(sectionTitle('Seberapa besar ekonomi Indonesia, dan seberapa cepat tumbuhnya?', 'Rp23.821,1 triliun — tumbuh 5,11% pada 2025'));
  const s1 = h('section', 'chart-section');
  s1.appendChild(h('h2', 'chart-title', 'PDB naik dua kali lipat dalam satu dekade'));
  s1.appendChild(h('p', 'chart-sub', 'PDB atas dasar harga berlaku (Rp triliun), 2015–2025. Hanya 2020 yang turun — kontraksi pandemi.'));
  s1.appendChild(lineChart({ values: D.GDP_NOMINAL.values, labels: D.GDP_NOMINAL.years.map(String), unit: '', color: GREEN, height: 280, ymin: 10000, ymax: 25000 }));
  s1.appendChild(sourceLine('BPS — Statistik Indonesia 2024 dan rilis 5 Feb 2026.'));
  root.appendChild(s1);
  const s2 = h('section', 'chart-section');
  s2.appendChild(h('h2', 'chart-title', 'Pertumbuhan: lima tahun di atas 5% setelah pandemi'));
  s2.appendChild(h('p', 'chart-sub', 'Pertumbuhan ekonomi tahunan (%), 2015–2025. 2025 tumbuh 5,11% — lebih cepat dari 2024 (5,03%).'));
  s2.appendChild(barChart({ values: D.GDP_GROWTH.values, labels: D.GDP_GROWTH.years.map((y) => String(y).slice(2)), unit: '%', color: GREEN, height: 260, ymin: -3 }));
  s2.appendChild(sourceLine('BPS.'));
  root.appendChild(s2);
  const s3 = h('section', 'chart-section');
  s3.appendChild(h('h2', 'chart-title', 'Tiap orang Indonesia: Rp83,7 juta setahun'));
  s3.appendChild(h('p', 'chart-sub', 'PDB per kapita — 2025 pertama kali menembus US$5.000.'));
  const grid = h('div', 'sum-grid');
  D.GDP_PER_CAPITA.years.forEach((y, i) => {
    const d = h('div', 'sum-tile');
    d.appendChild(h('p', 'sum-k', 'PDB per kapita ' + y));
    d.appendChild(h('p', 'sum-v', 'Rp' + fmtId(D.GDP_PER_CAPITA.values[i], 1) + ' jt'));
    d.appendChild(h('p', 'sum-n', 'US$' + fmtId(D.GDP_PER_CAPITA.usd[i], 1)));
    grid.appendChild(d);
  });
  s3.appendChild(grid);
  s3.appendChild(h('p', 'chart-sub', 'Penopang terbesar PDB dari sisi pengeluaran adalah konsumsi rumah tangga (53,8%), diikuti investasi (PMTB).'));
  s3.appendChild(sourceLine('BPS via Kadin; rilis 5 Feb 2026.'));
  root.appendChild(s3);
  return root;
}

// ---------- Perdagangan ----------
export function viewPerdagangan() {
  const root = h('div', 'page');
  root.appendChild(sectionTitle('Apa yang dijual Indonesia ke dunia, dan apa yang dibeli?', 'Surplus US$31,04 miliar — tahun kelima beruntun'));
  const s1 = h('section', 'chart-section');
  s1.appendChild(h('h2', 'chart-title', 'Ekspor vs impor, 2021–2024'));
  s1.appendChild(h('p', 'chart-sub', 'US$ miliar. Ekspor 2024 US$264,70 M (+2,29% vs 2023); impor US$233,66 M (+5,31%).'));
  s1.appendChild(groupedBars({ years: D.TRADE.years, series: [['Ekspor', D.TRADE.exports, GREEN], ['Impor', D.TRADE.imports, GOLD]] }));
  s1.appendChild(sourceLine('BPS via Kementerian Keuangan, 16 Jan 2025.'));
  root.appendChild(s1);
  const s2 = h('section', 'chart-section');
  s2.appendChild(h('h2', 'chart-title', 'Surplus menyusut, tapi bertahan'));
  s2.appendChild(h('p', 'chart-sub', 'Surplus perdagangan (US$ miliar). Puncaknya 2022 (US$54,46 M); 2024 US$31,04 M.'));
  s2.appendChild(barChart({ values: D.TRADE.surplus, labels: D.TRADE.years.map(String), unit: '', color: GREEN, height: 240 }));
  s2.appendChild(sourceLine('BPS via Kemenkeu. Angka 2024 sementara.'));
  root.appendChild(s2);
  const s3 = h('section', 'chart-section');
  s3.appendChild(h('h2', 'chart-title', 'Isi perdagangan 2024'));
  const tbl = document.createElement('table');
  tbl.className = 'data-table';
  tbl.innerHTML = '<thead><tr><th>Komponen</th><th>Nilai (US$ miliar)</th><th>Catatan</th></tr></thead>';
  const tb = document.createElement('tbody');
  const notes = { 'Ekspor nonmigas': '94,0% dari total ekspor', 'Ekspor migas': '6,0% dari total ekspor', 'Impor nonmigas': '84,5% dari total impor', 'Impor migas': '15,5% dari total impor' };
  for (const [k, v] of D.TRADE.split2024) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${k}</td><td>${fmtId(v, 2)}</td><td>${notes[k]}</td>`;
    tb.appendChild(tr);
  }
  tbl.appendChild(tb);
  s3.appendChild(tbl);
  s3.appendChild(h('p', 'chart-sub', 'Impor didominasi bahan baku/penolong dan barang modal (90,28%) — barang untuk berproduksi, bukan konsumsi.'));
  s3.appendChild(sourceLine('BPS via Kementerian Perdagangan (PDSI) dan Kemenkeu.'));
  root.appendChild(s3);
  return root;
}

function groupedBars({ years, series }) {
  const W = 640, H = 280, L = 52, R = 16, T = 26, B = 30;
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', role: 'img', 'aria-label': 'Grafik batang berkelompok' });
  const maxV = Math.max(...series.flatMap((s) => s[1])) * 1.12;
  const Y = (v) => T + ((maxV - v) / maxV) * (H - T - B);
  const gw = (W - L - R) / years.length;
  series.forEach(([name, values, color], si) => {
    values.forEach((v, i) => {
      const bw = (gw - 24) / series.length;
      const x = L + i * gw + 12 + si * bw;
      svg.appendChild(el('rect', { x, y: Y(v), width: bw - 4, height: H - B - Y(v), rx: 3, fill: color }));
      svg.appendChild(el('text', { x: x + (bw - 4) / 2, y: Y(v) - 6, 'text-anchor': 'middle', 'font-size': 10, 'font-weight': 700, fill: '#20241f', 'font-family': 'system-ui, sans-serif' }, fmtId(v, 1)));
    });
  });
  svg.appendChild(el('line', { x1: L, y1: H - B, x2: W - R, y2: H - B, stroke: '#d8d2c2', 'stroke-width': 1 }));
  years.forEach((y, i) => svg.appendChild(el('text', { x: L + i * gw + gw / 2, y: H - 10, 'text-anchor': 'middle', 'font-size': 11, fill: '#6b6a5e', 'font-family': 'system-ui, sans-serif' }, String(y))));
  const legend = el('g');
  series.forEach(([name, , color], i) => {
    const x = L + i * 110;
    legend.appendChild(el('rect', { x, y: 4, width: 12, height: 12, rx: 2, fill: color }));
    legend.appendChild(el('text', { x: x + 18, y: 15, 'font-size': 12, fill: '#20241f', 'font-family': 'system-ui, sans-serif' }, name));
  });
  svg.appendChild(legend);
  return svg;
}

// ---------- Harga ----------
export function viewHarga() {
  const root = h('div', 'page');
  root.appendChild(sectionTitle('Berapa cepat harga naik?', 'Inflasi 2,92% — naik, tapi tetap dalam sasaran'));
  const s1 = h('section', 'chart-section');
  s1.appendChild(h('h2', 'chart-title', 'Inflasi Desember, 2020–2025'));
  s1.appendChild(h('p', 'chart-sub', 'Inflasi year-on-year Desember (%). 2022 melonjak ke 5,51% — tertinggi dalam seri ini; 2024 terendah (1,57%); 2025 kembali ke 2,92%.'));
  s1.appendChild(barChart({ values: D.INFLATION.values, labels: D.INFLATION.years.map(String), unit: '%', color: GREEN, height: 260 }));
  s1.appendChild(sourceLine('BPS. Sasaran inflasi 2,5% ± 1%.'));
  root.appendChild(s1);
  const s2 = h('section', 'chart-section');
  s2.appendChild(h('h2', 'chart-title', 'Dua tahun terakhir, bulan demi bulan'));
  s2.appendChild(h('p', 'chart-sub', 'Inflasi bulanan y-on-y (%), Jan 2024–Des 2025. Februari 2025 sempat deflasi tahunan (−0,09%) — satu-satunya bulan negatif dalam dua tahun ini.'));
  s2.appendChild(lineChart({ values: D.INFLATION_MONTHLY.values, labels: D.INFLATION_MONTHLY.labels, unit: '%', color: GREEN, height: 260, ymin: -1, ymax: 3.5 }));
  const comp = h('div', 'sum-grid');
  for (const [k, v] of D.INFLATION_MONTHLY.components2025) {
    const d = h('div', 'sum-tile');
    d.appendChild(h('p', 'sum-k', k + ' (Des 2025)'));
    d.appendChild(h('p', 'sum-v', v));
    d.appendChild(h('p', 'sum-n', k === 'Volatile food' ? 'pendorong utama kenaikan 2025' : k === 'Inflasi inti' ? 'harga yang stabil' : 'harga yang diatur pemerintah'));
    comp.appendChild(d);
  }
  s2.appendChild(comp);
  s2.appendChild(sourceLine('BPS, BRS No. 01/01/Th. XXIX, 5 Jan 2026; Bank Indonesia.'));
  root.appendChild(s2);
  return root;
}

// ---------- Tenaga kerja ----------
export function viewTenagaKerja() {
  const root = h('div', 'page');
  root.appendChild(sectionTitle('Berapa orang yang bekerja, dan di mana?', '146,54 juta orang bekerja — pengangguran 4,85%'));
  const s1 = h('section', 'chart-section');
  s1.appendChild(h('h2', 'chart-title', 'Pengangguran turun di bawah pra-pandemi'));
  s1.appendChild(h('p', 'chart-sub', 'TPT Agustus (% angkatan kerja), 2019–2025. Puncaknya 2020 (7,07%) saat pandemi; Agustus 2025 di 4,85% — di bawah 5,23% pra-pandemi.'));
  s1.appendChild(lineChart({ values: D.UNEMPLOYMENT.values, labels: D.UNEMPLOYMENT.years.map(String), unit: '%', color: GREEN, height: 260, ymin: 4, ymax: 8 }));
  s1.appendChild(sourceLine('BPS. Agu 2025: 7,46 jt penganggur; TPAK 70,59%.'));
  root.appendChild(s1);
  const s2 = h('section', 'chart-section');
  s2.appendChild(h('h2', 'chart-title', 'Di mana orang bekerja?'));
  s2.appendChild(h('p', 'chart-sub', 'Pangsa pekerja menurut lapangan usaha utama, Agustus 2024. Pertanian masih yang terbesar — lebih dari satu dari empat pekerja.'));
  s2.appendChild(donutChart({ parts: D.EMPLOYMENT_SECTORS }));
  s2.appendChild(sourceLine('BPS, Keadaan Angkatan Kerja Agustus 2024.'));
  root.appendChild(s2);
  const s3 = h('section', 'chart-section');
  s3.appendChild(h('h2', 'chart-title', 'Paling tinggi dan paling rendah'));
  s3.appendChild(h('p', 'chart-sub', 'TPT Agustus 2025 menurut provinsi — hanya ujung-ujungnya yang terverifikasi dari publikasi BPS; seri lengkap per provinsi tidak dimuat agar tidak mengarang.'));
  const grid = h('div', 'sum-grid');
  const hi = h('div', 'sum-tile');
  hi.appendChild(h('p', 'sum-k', 'TPT tertinggi — Papua'));
  hi.appendChild(h('p', 'sum-v', '6,96%'));
  hi.appendChild(h('p', 'sum-n', 'Agustus 2025'));
  grid.appendChild(hi);
  const lo = h('div', 'sum-tile');
  lo.appendChild(h('p', 'sum-k', 'TPT terendah — Bali'));
  lo.appendChild(h('p', 'sum-v', '1,49%'));
  lo.appendChild(h('p', 'sum-n', 'Agustus 2025'));
  grid.appendChild(lo);
  s3.appendChild(grid);
  s3.appendChild(sourceLine('BPS, Keadaan Angkatan Kerja Agustus 2025.'));
  root.appendChild(s3);
  return root;
}

// ---------- Manusia ----------
export function viewManusia() {
  const root = h('div', 'page');
  root.appendChild(sectionTitle('Apakah hidup warga Indonesia makin baik?', 'IPM 76,59 — tertinggi sepanjang pencatatan'));
  const s1 = h('section', 'chart-section');
  s1.appendChild(h('h2', 'chart-title', 'IPM naik tujuh tahun beruntun'));
  s1.appendChild(h('p', 'chart-sub', 'Indeks Pembangunan Manusia, 2020–2026. Naik 0,69 poin pada 2026 — didorong membaiknya semua penyusunnya.'));
  s1.appendChild(lineChart({ values: D.HDI.values, labels: D.HDI.years.map(String), unit: '', color: GREEN, height: 260, ymin: 70, ymax: 78 }));
  const comp = h('div', 'sum-grid');
  for (const [k, v, note] of D.HDI_COMPONENTS_2026) {
    const d = h('div', 'sum-tile');
    d.appendChild(h('p', 'sum-k', k + ' (2026)'));
    d.appendChild(h('p', 'sum-v', v));
    d.appendChild(h('p', 'sum-n', note));
    comp.appendChild(d);
  }
  s1.appendChild(comp);
  s1.appendChild(sourceLine('BPS, BRS IPM 5 Nov 2026.'));
  root.appendChild(s1);
  const s2 = h('section', 'chart-section');
  s2.appendChild(h('h2', 'chart-title', 'Kemiskinan turun dua kali setahun, enam tahun berturut-turut'));
  s2.appendChild(h('p', 'chart-sub', 'Tingkat kemiskinan (% penduduk). Maret 2026: 8,07% (22,93 jt orang) — turun 0,43 juta dari September 2025. Puncaknya Maret 2021 (10,14%) saat pandemi.'));
  s2.appendChild(lineChart({ values: D.POVERTY_MARCH.values, labels: D.POVERTY_MARCH.years.map((y) => 'Mar ' + String(y).slice(2)), unit: '%', color: GREEN, height: 240, ymin: 7, ymax: 11 }));
  s2.appendChild(h('p', 'chart-sub', 'September: ' + D.POVERTY_SEPTEMBER.years.map((y, i) => `${y} ${fmtId(D.POVERTY_SEPTEMBER.values[i], 2)}%`).join(' · ') + '. Garis kemiskinan Mar 2026: Rp669.235/kapita/bulan.'));
  s2.appendChild(sourceLine('BPS, Profil Kemiskinan. Rasio gini Sep 2025: 0,363 (Mar 2025: 0,375).'));
  root.appendChild(s2);
  const s3 = h('section', 'chart-section');
  s3.appendChild(h('h2', 'chart-title', 'IPM tertinggi dan terendah, 2026'));
  s3.appendChild(h('p', 'chart-sub', 'Lima provinsi berstatus sangat tinggi; satu provinsi masih rendah. Jarak tertinggi–terendah 30,63 poin.'));
  const tbl = document.createElement('table');
  tbl.className = 'data-table';
  tbl.innerHTML = '<thead><tr><th>Provinsi</th><th>IPM 2026</th><th>Status</th></tr></thead>';
  const tb = document.createElement('tbody');
  for (const [name, v, st] of D.HDI_PROVINCES_2026) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${name}</td><td>${fmtId(v, 2)}</td><td>${st}</td>`;
    tb.appendChild(tr);
  }
  tbl.appendChild(tb);
  s3.appendChild(tbl);
  s3.appendChild(sourceLine('BPS, BRS IPM 5 Nov 2026.'));
  root.appendChild(s3);
  return root;
}

// ---------- Data ----------
export function viewData() {
  const root = h('div', 'page');
  root.appendChild(sectionTitle('Mau angka mentahnya?', 'Semua indikator di satu tempat — cari, lalu unduh'));
  const sec = h('section', 'chart-section');
  sec.appendChild(h('h2', 'chart-title', 'Jelajahi semua indikator'));
  const row = h('div', 'filter-row');
  const search = document.createElement('input');
  search.type = 'search';
  search.placeholder = 'Cari indikator… (mis. inflasi, IPM, ekspor)';
  search.setAttribute('aria-label', 'Cari indikator');
  const csvBtn = h('button', 'btn', 'Unduh semua (CSV)');
  row.appendChild(search);
  row.appendChild(csvBtn);
  sec.appendChild(row);
  const wrap = h('div', 'table-wrap');
  const table = document.createElement('table');
  table.className = 'data-table';
  table.innerHTML = '<thead><tr><th>Indikator</th><th>Nilai terbaru</th><th>Tahun</th><th>Sumber</th></tr></thead><tbody></tbody>';
  wrap.appendChild(table);
  sec.appendChild(wrap);
  const render = () => {
    const q = search.value.trim().toLowerCase();
    const tb = table.querySelector('tbody');
    tb.replaceChildren();
    const rows = D.INDICATOR_INDEX.filter((r) => r.join(' ').toLowerCase().includes(q));
    for (const [name, val, year, src] of rows) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${name}</td><td>${val}</td><td>${year}</td><td>${src}</td>`;
      tb.appendChild(tr);
    }
    if (!rows.length) {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="4">Tidak ada indikator yang cocok — coba kata kunci lain.</td>';
      tb.appendChild(tr);
    }
  };
  search.addEventListener('input', render);
  csvBtn.addEventListener('click', () => downloadCsv('indikator-indonesia.csv', [['Indikator', 'Nilai terbaru', 'Tahun', 'Sumber'], ...D.INDICATOR_INDEX]));
  render();
  sec.appendChild(h('p', 'chart-sub', 'Catatan soal angka: total penduduk UN (287.886.783 jiwa, proyeksi 1 Juli 2026) berbeda tipis dari proyeksi BPS (287,2 jt) karena metodologi proyeksi berbeda — keduanya dicatat apa adanya dengan sumbernya. Angka perdagangan 2024 masih sementara.'));
  root.appendChild(sec);

  const src = h('section', 'chart-section');
  src.appendChild(h('h2', 'chart-title', 'Sumber dan metode'));
  const ul = h('ul', 'source-list');
  for (const [name, desc] of D.SOURCES) {
    const li = h('li');
    li.appendChild(h('strong', null, name));
    li.appendChild(h('span', null, ' — ' + desc));
    ul.appendChild(li);
  }
  src.appendChild(ul);
  src.appendChild(h('p', 'chart-sub', 'Situs ini statis: semua angka tersimpan di file situs sendiri, tidak ada yang diambil dari internet saat dibuka. Angka yang belum terverifikasi dari sumber yang dibaca tidak ditampilkan.'));
  root.appendChild(src);
  return root;
}
