import fs from 'node:fs';
import path from 'node:path';
import { gunzipSync } from 'node:zlib';

const encoded = fs.readFileSync('site.gz.b64', 'utf8').trim();
const html = gunzipSync(Buffer.from(encoded, 'base64')).toString('utf8');

for (const marker of ['Quantum Crypto Studio','miniQuiz10','Final assessment','Flip for details']) {
  if (!html.includes(marker)) throw new Error(`Missing expected marker: ${marker}`);
}

fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync(path.join('dist', 'index.html'), html, 'utf8');
console.log(`Built COMP6013 Week 7 static site (${html.length} characters).`);
