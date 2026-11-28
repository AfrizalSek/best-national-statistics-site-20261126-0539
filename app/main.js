// main.js — router hash + navigasi. Delapan rute, semua dari data.js.
import { viewHome, viewPenduduk, viewEkonomi, viewPerdagangan, viewHarga, viewTenagaKerja, viewManusia, viewData } from './views.js';

const ROUTES = [
  ['#/', 'Beranda', viewHome],
  ['#/penduduk', 'Penduduk', viewPenduduk],
  ['#/ekonomi', 'Ekonomi', viewEkonomi],
  ['#/perdagangan', 'Perdagangan', viewPerdagangan],
  ['#/harga', 'Harga', viewHarga],
  ['#/tenaga-kerja', 'Tenaga Kerja', viewTenagaKerja],
  ['#/manusia', 'Manusia', viewManusia],
  ['#/data', 'Data', viewData],
];

const app = document.getElementById('app');
const nav = document.getElementById('nav');

for (const [hash, label] of ROUTES) {
  const a = document.createElement('a');
  a.href = hash;
  a.textContent = label;
  a.dataset.route = hash;
  nav.appendChild(a);
}

function render() {
  const hash = location.hash || '#/';
  const route = ROUTES.find(([h]) => h === hash) || ROUTES[0];
  nav.querySelectorAll('a').forEach((a) => a.classList.toggle('active', a.dataset.route === route[0]));
  app.replaceChildren(route[2]());
  window.scrollTo(0, 0);
  document.title = route[1] === 'Beranda' ? 'Indonesia dalam Angka 2026' : `${route[1]} — Indonesia dalam Angka 2026`;
}

window.addEventListener('hashchange', render);
render();
