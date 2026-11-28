// charts.js — grafik SVG buatan tangan, tanpa pustaka.
// Satu pekerjaan per fungsi: line, bar, donat, piramida. Semua grafik punya
// label langsung (bukan hanya warna) dan tooltip saat kursor menyentuh mark.

const NS = 'http://www.w3.org/2000/svg';
export const GREEN = '#0e5a43';
export const GOLD = '#a67c00';
export const BRICK = '#a83a22';
export const INK = '#20241f';
export const MUTED = '#6b6a5e';

export function el(tag, attrs = {}, text = null) {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (text !== null) n.textContent = text;
  return n;
}

// Format angka Indonesia: 1.234,56
export function fmtId(n, digits = 0) {
  return n.toLocaleString('id-ID', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function axis(svg, x0, y0, x1, y1) {
  svg.appendChild(el('line', { x1: x0, y1: y0, x2: x1, y2: y1, stroke: '#d8d2c2', 'stroke-width': 1 }));
}

function tooltip(svg) {
  const g = el('g', { class: 'tip', visibility: 'hidden' });
  const rect = el('rect', { rx: 4, fill: INK, opacity: 0.94 });
  const text = el('text', { fill: '#faf5ec', 'font-size': 12, 'font-family': 'system-ui, sans-serif' });
  g.appendChild(rect);
  g.appendChild(text);
  svg.appendChild(g);
  return {
    show(x, y, label) {
      text.textContent = label;
      const w = text.getComputedTextLength() + 16;
      const px = Math.max(4, Math.min(x + 10, 560 - w));
      rect.setAttribute('x', px);
      rect.setAttribute('y', Math.max(4, y - 28));
      rect.setAttribute('width', w);
      rect.setAttribute('height', 22);
      text.setAttribute('x', px + 8);
      text.setAttribute('y', Math.max(4, y - 28) + 15);
      g.setAttribute('visibility', 'visible');
    },
    hide() { g.setAttribute('visibility', 'hidden'); },
  };
}

function hoverZone(svg, x, y, w, h, onMove, onLeave) {
  const z = el('rect', { x, y, width: w, height: h, fill: 'transparent' });
  z.addEventListener('mousemove', (e) => {
    const r = svg.getBoundingClientRect();
    onMove(e.clientX - r.left, e.clientY - r.top);
  });
  z.addEventListener('mouseleave', onLeave);
  svg.appendChild(z);
}

// Line chart dengan crosshair + tooltip dan label langsung di titik pertama
// dan terakhir. values: angka; labels: label tiap titik.
export function lineChart({ values, labels, unit = '', color = GREEN, height = 260, ymin = null, ymax = null, yTicks = 4 }) {
  const W = 640, H = height, L = 52, R = 64, T = 18, B = 30;
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', role: 'img', 'aria-label': 'Grafik garis' });
  const lo = ymin ?? Math.min(...values) * 0.92;
  const hi = ymax ?? Math.max(...values) * 1.04;
  const X = (i) => L + (i * (W - L - R)) / (values.length - 1);
  const Y = (v) => T + ((hi - v) / (hi - lo)) * (H - T - B);
  for (let t = 0; t <= yTicks; t++) {
    const v = lo + ((hi - lo) * t) / yTicks;
    const y = Y(v);
    svg.appendChild(el('line', { x1: L, y1: y, x2: W - R, y2: y, stroke: '#e6e0d0', 'stroke-width': 1 }));
    svg.appendChild(el('text', { x: L - 8, y: y + 4, 'text-anchor': 'end', 'font-size': 11, fill: MUTED, 'font-family': 'system-ui, sans-serif' }, fmtId(v, unit === '%' ? 2 : 0)));
  }
  axis(svg, L, H - B, W - R, H - B);
  const pts = values.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
  svg.appendChild(el('polyline', { points: pts, fill: 'none', stroke: color, 'stroke-width': 2.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
  values.forEach((v, i) => {
    svg.appendChild(el('circle', { cx: X(i), cy: Y(v), r: 4, fill: '#faf5ec', stroke: color, 'stroke-width': 2 }));
  });
  const first = el('text', { x: X(0) + 8, y: Y(values[0]) - 12, 'font-size': 13, 'font-weight': 700, fill: INK, 'font-family': 'Georgia, serif' }, fmtId(values[0], 1) + unit);
  const last = el('text', { x: X(values.length - 1) - 8, y: Y(values[values.length - 1]) - 12, 'text-anchor': 'end', 'font-size': 13, 'font-weight': 700, fill: INK, 'font-family': 'Georgia, serif' }, fmtId(values[values.length - 1], 1) + unit);
  svg.appendChild(first);
  svg.appendChild(last);
  labels.forEach((lb, i) => {
    if (i % Math.ceil(labels.length / 8) === 0 || i === labels.length - 1) {
      svg.appendChild(el('text', { x: X(i), y: H - 10, 'text-anchor': 'middle', 'font-size': 11, fill: MUTED, 'font-family': 'system-ui, sans-serif' }, lb));
    }
  });
  const tip = tooltip(svg);
  const cross = el('line', { y1: T, y2: H - B, stroke: '#b9b29c', 'stroke-width': 1, 'stroke-dasharray': '3 3', visibility: 'hidden' });
  svg.appendChild(cross);
  hoverZone(svg, L, T, W - L - R, H - T - B, (mx) => {
    let best = 0, bd = 1e9;
    values.forEach((_, i) => { const d = Math.abs(X(i) - mx); if (d < bd) { bd = d; best = i; } });
    cross.setAttribute('x1', X(best));
    cross.setAttribute('x2', X(best));
    cross.setAttribute('visibility', 'visible');
    tip.show(X(best), Y(values[best]), `${labels[best]}: ${fmtId(values[best], 2)}${unit}`);
  }, () => { tip.hide(); cross.setAttribute('visibility', 'hidden'); });
  return svg;
}

// Bar chart vertikal, label nilai di atas tiap bar, tooltip per bar.
export function barChart({ values, labels, unit = '', color = GREEN, height = 260, ymin = null }) {
  const W = 640, H = height, L = 52, R = 16, T = 26, B = 30;
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', role: 'img', 'aria-label': 'Grafik batang' });
  const lo = ymin ?? Math.min(0, Math.min(...values));
  const hi = Math.max(...values) * 1.12;
  const n = values.length;
  const bw = (W - L - R) / n;
  const Y = (v) => T + ((hi - v) / (hi - lo)) * (H - T - B);
  const Y0 = Y(0);
  svg.appendChild(el('line', { x1: L, y1: Y0, x2: W - R, y2: Y0, stroke: '#d8d2c2', 'stroke-width': 1 }));
  values.forEach((v, i) => {
    const x = L + i * bw + 6;
    const w = bw - 12;
    const neg = v < 0;
    const bar = el('rect', { x, y: neg ? Y0 : Y(v), width: w, height: Math.abs(Y(v) - Y0), rx: 3, fill: neg ? BRICK : color });
    svg.appendChild(bar);
    svg.appendChild(el('text', { x: x + w / 2, y: (neg ? Y(v) + 16 : Y(v) - 6), 'text-anchor': 'middle', 'font-size': 11, 'font-weight': 700, fill: INK, 'font-family': 'system-ui, sans-serif' }, fmtId(v, 2) + unit));
    svg.appendChild(el('text', { x: x + w / 2, y: H - 10, 'text-anchor': 'middle', 'font-size': 11, fill: MUTED, 'font-family': 'system-ui, sans-serif' }, labels[i]));
  });
  const tip = tooltip(svg);
  values.forEach((v, i) => {
    const x = L + i * bw;
    hoverZone(svg, x, T, bw, H - T - B, () => tip.show(x + bw / 2, Y(v), `${labels[i]}: ${fmtId(v, 2)}${unit}`), () => tip.hide());
  });
  return svg;
}

// Donat dengan legenda berlabel persen penuh (identitas bukan warna saja).
export function donutChart({ parts, colors = [GREEN, GOLD, BRICK, '#7a7466'], size = 240 }) {
  const wrap = document.createElement('div');
  wrap.className = 'donut-wrap';
  const svg = el('svg', { viewBox: `0 0 ${size} ${size}`, width: size, height: size, role: 'img', 'aria-label': 'Grafik donat' });
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, ir = r * 0.58;
  const total = parts.reduce((s, p) => s + p.value, 0);
  let a0 = -Math.PI / 2;
  parts.forEach((p, i) => {
    const a1 = a0 + (p.value / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + ir * Math.cos(a1), yi1 = cy + ir * Math.sin(a1);
    const xi0 = cx + ir * Math.cos(a0), yi0 = cy + ir * Math.sin(a0);
    svg.appendChild(el('path', {
      d: `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} L ${xi1} ${yi1} A ${ir} ${ir} 0 ${large} 0 ${xi0} ${yi0} Z`,
      fill: colors[i % colors.length], stroke: '#faf5ec', 'stroke-width': 2,
    }));
    const mid = (a0 + a1) / 2;
    const lx = cx + ((r + ir) / 2) * Math.cos(mid), ly = cy + ((r + ir) / 2) * Math.sin(mid);
    const pct = (p.value / total) * 100;
    if (pct >= 9) svg.appendChild(el('text', { x: lx, y: ly + 4, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 700, fill: '#faf5ec', 'font-family': 'system-ui, sans-serif' }, `${fmtId(pct, 1)}%`));
    a0 = a1;
  });
  const totalText = el('text', { x: cx, y: cy - 2, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 700, fill: INK, 'font-family': 'Georgia, serif' }, '100%');
  svg.appendChild(totalText);
  svg.appendChild(el('text', { x: cx, y: cy + 16, 'text-anchor': 'middle', 'font-size': 11, fill: MUTED, 'font-family': 'system-ui, sans-serif' }, 'pekerja'));
  wrap.appendChild(svg);
  const legend = document.createElement('ul');
  legend.className = 'donut-legend';
  parts.forEach((p, i) => {
    const li = document.createElement('li');
    const sw = document.createElement('span');
    sw.className = 'swatch';
    sw.style.background = colors[i % colors.length];
    li.appendChild(sw);
    li.appendChild(document.createTextNode(`${p.name} — ${fmtId(p.value, 2)}%`));
    legend.appendChild(li);
  });
  wrap.appendChild(legend);
  return wrap;
}

// Piramida penduduk: batang horizontal laki-laki ke kiri, perempuan ke kanan.
// mode 'jt' (juta jiwa) atau 'pct' (persen dari total). Tooltip per baris.
export function pyramidChart({ groups, mode = 'jt' }) {
  const W = 640, rowH = 24, T = 34, B = 8;
  const H = T + groups.length * rowH + B;
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', role: 'img', 'aria-label': 'Piramida penduduk' });
  const total = groups.reduce((s, g) => s + g.male + g.female, 0);
  const maxV = Math.max(...groups.map((g) => Math.max(g.male, g.female)));
  const mid = W / 2;
  const val = (n) => (mode === 'pct' ? (n / total) * 100 : n / 1e6);
  const maxShown = mode === 'pct' ? (maxV / total) * 100 : maxV / 1e6;
  const X = (v) => (v / maxShown) * (mid - 70);
  svg.appendChild(el('text', { x: mid - 90, y: 20, 'text-anchor': 'end', 'font-size': 12, 'font-weight': 700, fill: INK, 'font-family': 'system-ui, sans-serif' }, 'Laki-laki'));
  svg.appendChild(el('text', { x: mid + 90, y: 20, 'font-size': 12, 'font-weight': 700, fill: INK, 'font-family': 'system-ui, sans-serif' }, 'Perempuan'));
  groups.forEach((g, i) => {
    const y = T + i * rowH;
    const vm = val(g.male), vf = val(g.female);
    svg.appendChild(el('rect', { x: mid - X(vm) - 46, y: y + 2, width: X(vm), height: rowH - 6, rx: 2, fill: GREEN }));
    svg.appendChild(el('rect', { x: mid + 46, y: y + 2, width: X(vf), height: rowH - 6, rx: 2, fill: GOLD }));
    svg.appendChild(el('text', { x: mid, y: y + 17, 'text-anchor': 'middle', 'font-size': 11, fill: INK, 'font-family': 'system-ui, sans-serif' }, g.label));
  });
  svg.appendChild(el('line', { x1: mid - 46, y1: T - 4, x2: mid - 46, y2: H - B, stroke: '#d8d2c2', 'stroke-width': 1 }));
  svg.appendChild(el('line', { x1: mid + 46, y1: T - 4, x2: mid + 46, y2: H - B, stroke: '#d8d2c2', 'stroke-width': 1 }));
  const tip = tooltip(svg);
  groups.forEach((g, i) => {
    const y = T + i * rowH;
    hoverZone(svg, 0, y, W, rowH, () => {
      const m = mode === 'pct' ? `${fmtId((g.male / total) * 100, 2)}%` : `${fmtId(g.male / 1e6, 2)} jt`;
      const f = mode === 'pct' ? `${fmtId((g.female / total) * 100, 2)}%` : `${fmtId(g.female / 1e6, 2)} jt`;
      tip.show(mid + 120, y + 12, `${g.label} thn — L ${m} · P ${f}`);
    }, () => tip.hide());
  });
  return svg;
}
