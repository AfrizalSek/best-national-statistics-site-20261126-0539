// main.js — satu pekerjaan: router hash dan judul halaman.
import { ROUTES, MOUNTS } from './views.js';

const view = document.getElementById('view');
const navLinks = [...document.querySelectorAll('.site-nav a')];

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return ROUTES[hash] ? hash : '/';
}

function render() {
  const route = currentRoute();
  const page = ROUTES[route];
  view.innerHTML = page.html();
  document.title = `${page.title} · DataNusa — Statistik Indonesia`;
  navLinks.forEach((a) => {
    const target = a.getAttribute('href').replace(/^#/, '');
    a.classList.toggle('current', target === route);
    if (target === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  const mount = MOUNTS[route];
  if (mount) requestAnimationFrame(() => mount());
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
window.addEventListener('resize', () => {
  const mount = MOUNTS[currentRoute()];
  if (mount) mount();
});
render();
