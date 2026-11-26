// views.js — satu pekerjaan: merender tiap halaman dari data.js
// dan memasang kontrolnya (tab, filter, urutan, unduh CSV).
import {
  SOURCE_NOTE, POPULATION, POPULATION_GROWTH, PROVINCES, GDP_GROWTH,
  GDP_NOMINAL, INFLATION, UNEMPLOYMENT, UNEMPLOYMENT_PROVINCES,
  EMPLOYMENT_SECTORS, POVERTY_MARCH, POVERTY_SEPTEMBER, HDI,
  LIFE_EXPECTANCY, SCHOOLING, RELEASES, KEY_FIGURES,
} from './data.js';
import { drawBarChart, drawLineChart, formatNumber } from './charts.js';

function kpiCard(figure) {
  return `<a class="kpi" href="${figure.route}">
    <span class="kpi-label">${figure.label}</span>
    <span class="kpi-value">${figure.value}</span>
    <span class="kpi-sub">${figure.sub}</span>
  </a>`;
}

function chartCard(id, title, note) {
  return `<section class="card chart-card">
    <h2>${title}</h2>
    <canvas id="${id}" class="chart" height="320" aria-label="Grafik ${title}"></canvas>
    ${note ? `<p class="note">${note}</p>` : ''}
  </section>`;
}

function sourceLine() {
  return `<p class="source">${SOURCE_NOTE}</p>`;
}

function home() {
  return `
  <section class="hero">
    <p class="eyebrow">Statistik resmi Indonesia · diperbarui November 2026</p>
    <h1>Indonesia dalam angka, satu tempat.</h1>
    <p class="lede">Penduduk, ekonomi, tenaga kerja, pendidikan, kesehatan, dan kemiskinan —
    angka resmi Badan Pusat Statistik, disajikan supaya mudah dibaca di layar besar maupun di ponsel.</p>
    <div class="hero-links">
      <a class="button" href="#/penduduk">Lihat penduduk</a>
      <a class="button ghost" href="#/ekonomi">Lihat ekonomi</a>
    </div>
  </section>
  <section class="kpi-grid" aria-label="Angka kunci">${KEY_FIGURES.map(kpiCard).join('')}</section>
  <div class="two-col">
    ${chartCard('chart-population', POPULATION.title, POPULATION.note)}
    ${chartCard('chart-growth', GDP_GROWTH.title, GDP_GROWTH.note)}
  </div>
  <section class="card">
    <h2>Rilis terbaru</h2>
    <ul class="releases">
      ${RELEASES.map((r) => `<li><time>${r.date}</time><div><strong>${r.title}</strong><span>${r.detail}</span></div></li>`).join('')}
    </ul>
  </section>
  <section class="card">
    <h2>Jelajahi menurut topik</h2>
    <nav class="topic-grid" aria-label="Topik">
      <a href="#/penduduk"><strong>Penduduk</strong><span>287,2 juta jiwa · 38 provinsi</span></a>
      <a href="#/ekonomi"><strong>Ekonomi</strong><span>PDB, inflasi, pertumbuhan</span></a>
      <a href="#/tenaga-kerja"><strong>Tenaga kerja</strong><span>Pengangguran 4,91%</span></a>
      <a href="#/pendidikan-kesehatan"><strong>Pendidikan &amp; kesehatan</strong><span>IPM 76,59</span></a>
      <a href="#/kemiskinan"><strong>Kemiskinan</strong><span>8,57% · September 2024</span></a>
    </nav>
  </section>
  ${sourceLine()}`;
}

function population() {
  return `
  <header class="page-head"><h1>Penduduk</h1>
  <p>Indonesia berpenduduk 287,2 juta jiwa pada pertengahan 2026, naik 0,97% dari tahun sebelumnya.
  Laju pertumbuhan melambat setiap tahun sejak 2022.</p></header>
  <div class="two-col">
    ${chartCard('chart-population', POPULATION.title, POPULATION.note)}
    ${chartCard('chart-pop-growth', POPULATION_GROWTH.title, 'Laju 2022 sebesar 1,13% — tertinggi dalam seri ini.')}
  </div>
  <section class="card">
    <h2>Provinsi berpenduduk terbanyak, 2024</h2>
    <div class="controls">
      <label>Cari provinsi <input id="province-search" type="search" placeholder="mis. Jawa" autocomplete="off"></label>
      <div class="seg" role="group" aria-label="Urutan tabel">
        <button type="button" data-sort="pop-desc" class="active">Terbanyak dulu</button>
        <button type="button" data-sort="pop-asc">Tersedikit dulu</button>
        <button type="button" data-sort="name">A–Z</button>
      </div>
      <button type="button" id="download-csv" class="button small">Unduh CSV</button>
    </div>
    <div class="table-wrap"><table id="province-table">
      <thead><tr><th>Provinsi</th><th>Pulau</th><th>Jumlah penduduk (ribu jiwa)</th><th>Kepadatan (jiwa/km²)</th></tr></thead>
      <tbody></tbody>
    </table></div>
    <p class="note">Kepadatan ditampilkan bila tersedia dari tabel BPS 2024.
    Tiga provinsi di Pulau Jawa — Jawa Barat, Jawa Timur, Jawa Tengah — menampung sekitar 46% penduduk nasional.
    Pulau Jawa menampung 55,9% penduduk di atas ±7% luas daratan.</p>
  </section>
  ${sourceLine()}`;
}

function economy() {
  return `
  <header class="page-head"><h1>Ekonomi</h1>
  <p>PDB 2024 mencapai Rp22.139,0 triliun dan tumbuh 5,03%. Inflasi Desember 2024 sebesar 1,57%,
  di dalam sasaran. Pilih grafik di bawah untuk melihat tiap indikator.</p></header>
  <section class="card">
    <div class="seg tabs" role="group" aria-label="Pilih grafik">
      <button type="button" data-chart="growth" class="active">Pertumbuhan ekonomi</button>
      <button type="button" data-chart="nominal">PDB nominal</button>
      <button type="button" data-chart="inflation">Inflasi</button>
    </div>
    <div id="economy-chart-slot"></div>
  </section>
  <section class="kpi-grid small">
    <div class="kpi static"><span class="kpi-label">PDB per kapita 2024</span><span class="kpi-value">Rp78,6 jt</span><span class="kpi-sub">USD 4.960,3</span></div>
    <div class="kpi static"><span class="kpi-label">Konsumsi rumah tangga</span><span class="kpi-value">54,04%</span><span class="kpi-sub">dari PDB 2024</span></div>
    <div class="kpi static"><span class="kpi-label">Industri pengolahan</span><span class="kpi-value">18,98%</span><span class="kpi-sub">lapangan usaha terbesar</span></div>
    <div class="kpi static"><span class="kpi-label">Pertumbuhan 2025</span><span class="kpi-value">5,11%</span><span class="kpi-sub">lebih tinggi dari 2024</span></div>
  </section>
  ${sourceLine()}`;
}

function labour() {
  return `
  <header class="page-head"><h1>Tenaga kerja</h1>
  <p>Tingkat Pengangguran Terbuka Agustus 2024 sebesar 4,91% — di bawah level pra-pandemi.
  Ada 7,47 juta penganggur dari angkatan kerja 152,11 juta orang; TPAK 70,63%.</p></header>
  <div class="two-col">
    ${chartCard('chart-unemployment', UNEMPLOYMENT.title, UNEMPLOYMENT.note)}
    ${chartCard('chart-sectors', 'Pekerja menurut lapangan usaha, Agustus 2024 (%)', 'Pertanian masih menyerap pekerja terbanyak: 28,18%. Upah rata-rata buruh Rp3,27 juta per bulan.')}
  </div>
  <section class="card">
    <h2>TPT menurut provinsi, Agustus 2024</h2>
    <div class="controls">
      <div class="seg" role="group" aria-label="Tampilkan">
        <button type="button" data-filter="all" class="active">Semua</button>
        <button type="button" data-filter="top3">3 tertinggi</button>
        <button type="button" data-filter="low3">3 terendah</button>
      </div>
    </div>
    <div class="table-wrap"><table id="tpt-table">
      <thead><tr><th>Provinsi</th><th>TPT (%)</th><th>Terhadap nasional (4,91%)</th></tr></thead>
      <tbody></tbody>
    </table></div>
    <p class="note">Jawa Barat mencatat TPT tertinggi (6,75%); Papua Pegunungan terendah (1,32%).</p>
  </section>
  ${sourceLine()}`;
}

function educationHealth() {
  return `
  <header class="page-head"><h1>Pendidikan &amp; kesehatan</h1>
  <p>IPM 2026 mencapai 76,59 — kategori tinggi — didorong membaiknya ketiga dimensi:
  umur panjang dan hidup sehat, pengetahuan, serta standar hidup layak.</p></header>
  <section class="card">
    <div class="seg tabs" role="group" aria-label="Pilih indikator">
      <button type="button" data-series="hdi" class="active">IPM</button>
      <button type="button" data-series="life">Umur harapan hidup</button>
      <button type="button" data-series="expected">Harapan lama sekolah</button>
      <button type="button" data-series="average">Rata-rata lama sekolah</button>
    </div>
    <div id="edu-chart-slot"></div>
  </section>
  <section class="kpi-grid small">
    <div class="kpi static"><span class="kpi-label">IPM 2026</span><span class="kpi-value">76,59</span><span class="kpi-sub">2024: 75,02 · 2025: 75,90</span></div>
    <div class="kpi static"><span class="kpi-label">Umur harapan hidup 2026</span><span class="kpi-value">74,68 th</span><span class="kpi-sub">2020: 73,37 tahun</span></div>
    <div class="kpi static"><span class="kpi-label">Harapan lama sekolah 2026</span><span class="kpi-value">13,34 th</span><span class="kpi-sub">setara tahun ke-2 kuliah</span></div>
    <div class="kpi static"><span class="kpi-label">Rata-rata lama sekolah 2026</span><span class="kpi-value">9,16 th</span><span class="kpi-sub">setara kelas 9 (SMP)</span></div>
  </section>
  ${sourceLine()}`;
}

function poverty() {
  return `
  <header class="page-head"><h1>Kemiskinan</h1>
  <p>Tingkat kemiskinan September 2024 sebesar 8,57%, turun dari 9,36% pada September 2023
  dan 10,19% pada September 2020. Rasio gini Maret 2024 sebesar 0,379, membaik dari 0,388 pada 2023.</p></header>
  <section class="card">
    <div class="seg tabs" role="group" aria-label="Pilih periode">
      <button type="button" data-period="march" class="active">Survei Maret</button>
      <button type="button" data-period="september">Survei September</button>
    </div>
    <div id="poverty-chart-slot"></div>
  </section>
  <section class="kpi-grid small">
    <div class="kpi static"><span class="kpi-label">Kemiskinan ekstrem</span><span class="kpi-value">0,83%</span><span class="kpi-sub">Maret 2024 · 2023: 1,12%</span></div>
    <div class="kpi static"><span class="kpi-label">Rasio gini</span><span class="kpi-value">0,379</span><span class="kpi-sub">Maret 2024 · 2023: 0,388</span></div>
    <div class="kpi static"><span class="kpi-label">Penurunan 2020 → 2024</span><span class="kpi-value">−1,62 pp</span><span class="kpi-sub">September, dari 10,19% ke 8,57%</span></div>
  </section>
  ${sourceLine()}`;
}

function about() {
  return `
  <header class="page-head"><h1>Tentang DataNusa</h1>
  <p>DataNusa adalah visualisasi independen atas angka resmi Indonesia.
  Situs ini bukan situs resmi Badan Pusat Statistik dan tidak terafiliasi dengannya.</p></header>
  <section class="card">
    <h2>Dari mana angkanya</h2>
    <p>Semua angka diambil dari rilis Berita Resmi Statistik dan publikasi Badan Pusat Statistik
    (bps.go.id): Proyeksi Penduduk Indonesia, Produk Domestik Bruto, Inflasi, Sakernas,
    Profil Kemiskinan, dan Indeks Pembangunan Manusia. Tahun, cakupan, dan catatan ditulis
    di tiap grafik dan tabel. Angka proyeksi ditandai sebagai proyeksi.</p>
    <h2>Cara membaca</h2>
    <ul class="plain">
      <li><strong>y-on-y</strong> — dibandingkan dengan periode yang sama tahun sebelumnya.</li>
      <li><strong>TPT</strong> — Tingkat Pengangguran Terbuka: penganggur terhadap angkatan kerja.</li>
      <li><strong>TPAK</strong> — Tingkat Partisipasi Angkatan Kerja.</li>
      <li><strong>IPM</strong> — Indeks Pembangunan Manusia (0–100); ≥70 kategori tinggi.</li>
      <li><strong>ADHB</strong> — atas dasar harga berlaku (nominal).</li>
    </ul>
    <h2>Teknologi</h2>
    <p>Situs statis tanpa pelacak dan tanpa permintaan jaringan: seluruh halaman, gaya,
    data, dan grafik tersimpan sebagai berkas lokal. Grafik digambar di kanvas oleh kode
    situs sendiri.</p>
  </section>
  ${sourceLine()}`;
}

export const ROUTES = {
  '/': { html: home, title: 'Beranda' },
  '/penduduk': { html: population, title: 'Penduduk' },
  '/ekonomi': { html: economy, title: 'Ekonomi' },
  '/tenaga-kerja': { html: labour, title: 'Tenaga kerja' },
  '/pendidikan-kesehatan': { html: educationHealth, title: 'Pendidikan & kesehatan' },
  '/kemiskinan': { html: poverty, title: 'Kemiskinan' },
  '/tentang': { html: about, title: 'Tentang' },
};

// --- Pemasang kontrol tiap halaman (dijalankan setelah render) ---

function drawInto(canvas, draw, series, color) {
  if (canvas) draw(canvas, series, color);
}

export function mountHome() {
  drawInto(document.getElementById('chart-population'), drawLineChart, POPULATION, '#0b6e4f');
  drawInto(document.getElementById('chart-growth'), drawBarChart, GDP_GROWTH, '#1d3557');
}

function renderProvinceRows(rows) {
  const body = document.querySelector('#province-table tbody');
  if (!body) return;
  body.innerHTML = rows.map((p) => `<tr>
    <td>${p.name}</td><td>${p.island}</td>
    <td>${formatNumber(p.population)}</td>
    <td>${p.density === null ? '—' : formatNumber(p.density)}</td>
  </tr>`).join('');
}

export function mountPopulation() {
  drawInto(document.getElementById('chart-population'), drawLineChart, POPULATION, '#0b6e4f');
  drawInto(document.getElementById('chart-pop-growth'), drawBarChart, POPULATION_GROWTH, '#1d3557');
  let sort = 'pop-desc';
  let query = '';
  const apply = () => {
    let rows = PROVINCES.filter((p) => p.name.toLowerCase().includes(query));
    if (sort === 'pop-desc') rows = [...rows].sort((a, b) => b.population - a.population);
    if (sort === 'pop-asc') rows = [...rows].sort((a, b) => a.population - b.population);
    if (sort === 'name') rows = [...rows].sort((a, b) => a.name.localeCompare(b.name, 'id'));
    renderProvinceRows(rows);
  };
  apply();
  document.getElementById('province-search')?.addEventListener('input', (e) => {
    query = e.target.value.trim().toLowerCase();
    apply();
  });
  document.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-sort]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      sort = btn.dataset.sort;
      apply();
    });
  });
  document.getElementById('download-csv')?.addEventListener('click', () => {
    const lines = ['Provinsi,Pulau,Jumlah penduduk 2024 (ribu jiwa),Kepadatan (jiwa/km2)'];
    PROVINCES.forEach((p) => lines.push(`${p.name},${p.island},${p.population},${p.density ?? ''}`));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'penduduk-provinsi-2024.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  });
}

const ECONOMY_CHARTS = {
  growth: { series: GDP_GROWTH, draw: drawBarChart, color: '#1d3557' },
  nominal: { series: GDP_NOMINAL, draw: drawBarChart, color: '#0b6e4f' },
  inflation: { series: INFLATION, draw: drawLineChart, color: '#c05621' },
};

function showEconomyChart(key) {
  const cfg = ECONOMY_CHARTS[key];
  const slot = document.getElementById('economy-chart-slot');
  if (!slot) return;
  slot.innerHTML = chartCard('economy-chart', cfg.series.title, cfg.series.note);
  drawInto(document.getElementById('economy-chart'), cfg.draw, cfg.series, cfg.color);
}

export function mountEconomy() {
  showEconomyChart('growth');
  document.querySelectorAll('[data-chart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-chart]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      showEconomyChart(btn.dataset.chart);
    });
  });
}

function renderTptRows(rows) {
  const body = document.querySelector('#tpt-table tbody');
  if (!body) return;
  body.innerHTML = rows.map((p) => {
    const diff = p.value - 4.91;
    const label = p.name === 'Indonesia'
      ? '—'
      : `${diff > 0 ? '+' : ''}${formatNumber(diff)} pp`;
    return `<tr><td>${p.name}</td><td>${formatNumber(p.value)}%</td><td>${label}</td></tr>`;
  }).join('');
}

export function mountLabour() {
  drawInto(document.getElementById('chart-unemployment'), drawLineChart, UNEMPLOYMENT, '#c05621');
  const sectorSeries = {
    title: 'Pekerja menurut lapangan usaha, Agustus 2024 (%)',
    unit: '%',
    years: EMPLOYMENT_SECTORS.map((s) => s.name.split(',')[0]),
    values: EMPLOYMENT_SECTORS.map((s) => s.value),
  };
  drawInto(document.getElementById('chart-sectors'), drawBarChart, sectorSeries, '#1d3557');
  const sorted = [...UNEMPLOYMENT_PROVINCES].sort((a, b) => b.value - a.value);
  renderTptRows(sorted);
  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (btn.dataset.filter === 'top3') renderTptRows(sorted.slice(0, 3));
      else if (btn.dataset.filter === 'low3') renderTptRows(sorted.slice(-3).reverse());
      else renderTptRows(sorted);
    });
  });
}

const EDU_SERIES = {
  hdi: { series: HDI, draw: drawLineChart, color: '#0b6e4f' },
  life: { series: LIFE_EXPECTANCY, draw: drawLineChart, color: '#1d3557' },
  expected: { series: SCHOOLING.expected, draw: drawLineChart, color: '#0b6e4f' },
  average: { series: SCHOOLING.average, draw: drawLineChart, color: '#c05621' },
};

function showEduChart(key) {
  const cfg = EDU_SERIES[key];
  const slot = document.getElementById('edu-chart-slot');
  if (!slot) return;
  slot.innerHTML = chartCard('edu-chart', cfg.series.title, cfg.series.note || '');
  drawInto(document.getElementById('edu-chart'), cfg.draw, cfg.series, cfg.color);
}

export function mountEducationHealth() {
  showEduChart('hdi');
  document.querySelectorAll('[data-series]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-series]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      showEduChart(btn.dataset.series);
    });
  });
}

const POVERTY_SERIES = {
  march: { series: POVERTY_MARCH, draw: drawLineChart, color: '#0b6e4f' },
  september: { series: POVERTY_SEPTEMBER, draw: drawLineChart, color: '#1d3557' },
};

function showPovertyChart(key) {
  const cfg = POVERTY_SERIES[key];
  const slot = document.getElementById('poverty-chart-slot');
  if (!slot) return;
  slot.innerHTML = chartCard('poverty-chart', cfg.series.title, cfg.series.note);
  drawInto(document.getElementById('poverty-chart'), cfg.draw, cfg.series, cfg.color);
}

export function mountPoverty() {
  showPovertyChart('march');
  document.querySelectorAll('[data-period]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-period]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      showPovertyChart(btn.dataset.period);
    });
  });
}

export const MOUNTS = {
  '/': mountHome,
  '/penduduk': mountPopulation,
  '/ekonomi': mountEconomy,
  '/tenaga-kerja': mountLabour,
  '/pendidikan-kesehatan': mountEducationHealth,
  '/kemiskinan': mountPoverty,
  '/tentang': null,
};
