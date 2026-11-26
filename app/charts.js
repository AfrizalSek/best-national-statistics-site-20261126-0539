// charts.js — grafik kanvas buatan sendiri, tanpa library luar.
// Satu pekerjaan: menggambar grafik garis dan batang dari seri data.
const INK = '#1d3557';
const GRID = '#dbe4ee';
const ACCENT = '#0b6e4f';
const ACCENT2 = '#c05621';
const MUTED = '#5b6b7f';

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 640;
  const height = canvas.clientHeight || 320;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function niceMax(max, min) {
  const span = max - min || 1;
  const step = Math.pow(10, Math.floor(Math.log10(span)));
  return { top: Math.ceil(max / step) * step, bottom: Math.floor(min / step) * step };
}

function axes(ctx, box, labels, min, max, unit) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const v = min + ((max - min) * i) / steps;
    const y = box.bottom - ((v - min) / (max - min)) * box.height;
    ctx.beginPath();
    ctx.moveTo(box.left, y);
    ctx.lineTo(box.right, y);
    ctx.stroke();
    ctx.fillText(formatNumber(v), box.left - 8, y);
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  labels.forEach((label, i) => {
    const x = box.left + ((i + 0.5) / labels.length) * box.width;
    ctx.fillText(String(label), x, box.bottom + 8);
  });
}

export function formatNumber(v) {
  const abs = Math.abs(v);
  const text = abs >= 100 ? v.toFixed(0) : abs >= 10 ? v.toFixed(1) : v.toFixed(2);
  return text.replace('.', ',');
}

export function drawBarChart(canvas, series, color) {
  const { ctx, width, height } = setupCanvas(canvas);
  const values = series.values;
  const min = Math.min(0, ...values);
  const max = Math.max(...values);
  const pad = { left: 56, right: 16, top: 14, bottom: 28 };
  const box = {
    left: pad.left,
    right: width - pad.right,
    top: pad.top,
    bottom: height - pad.bottom,
    width: width - pad.left - pad.right,
    height: height - pad.top - pad.bottom,
  };
  const nice = niceMax(max, min);
  axes(ctx, box, series.years, nice.bottom, nice.top, series.unit);
  const slot = box.width / values.length;
  const barWidth = Math.min(56, slot * 0.62);
  values.forEach((v, i) => {
    const x = box.left + i * slot + (slot - barWidth) / 2;
    const y0 = box.bottom - ((0 - nice.bottom) / (nice.top - nice.bottom)) * box.height;
    const y = box.bottom - ((v - nice.bottom) / (nice.top - nice.bottom)) * box.height;
    ctx.fillStyle = v < 0 ? ACCENT2 : color || ACCENT;
    ctx.fillRect(x, Math.min(y, y0), barWidth, Math.abs(y0 - y) || 1);
    ctx.fillStyle = INK;
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(formatNumber(v), x + barWidth / 2, Math.min(y, y0) - 4);
  });
}

export function drawLineChart(canvas, series, color) {
  const { ctx, width, height } = setupCanvas(canvas);
  const values = series.values;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = { left: 56, right: 16, top: 18, bottom: 28 };
  const box = {
    left: pad.left,
    right: width - pad.right,
    top: pad.top,
    bottom: height - pad.bottom,
    width: width - pad.left - pad.right,
    height: height - pad.top - pad.bottom,
  };
  const margin = (max - min) * 0.12 || 1;
  const nice = niceMax(max + margin, min - margin);
  axes(ctx, box, series.years, nice.bottom, nice.top, series.unit);
  const point = (i) => ({
    x: box.left + (i / (values.length - 1)) * box.width,
    y: box.bottom - ((values[i] - nice.bottom) / (nice.top - nice.bottom)) * box.height,
  });
  ctx.strokeStyle = color || ACCENT;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  values.forEach((_, i) => {
    const p = point(i);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
  values.forEach((v, i) => {
    const p = point(i);
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = color || ACCENT;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = INK;
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(formatNumber(v), p.x, p.y - 9);
  });
}
