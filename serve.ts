// serve.ts — peladen statis kecil untuk pengembangan lokal saja.
// Bukan bagian dari entri. Jalankan: node serve.ts [--port 8080]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.argv.find((a) => a.startsWith('--port='))?.split('=')[1] ?? 8080);
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml' };

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/+/, '') || 'index.html';
  try {
    const file = await readFile(join(here, 'app', path));
    res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' });
    res.end(file);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
}).listen(port, () => console.log(`http://localhost:${port}`));
