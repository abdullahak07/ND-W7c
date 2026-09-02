import fs from 'node:fs';
import path from 'node:path';

const parts = fs.readdirSync('.').filter(n => /^payload\d+\.txt$/.test(n)).sort();
if (!parts.length) throw new Error('No payload files found');
const html = parts.map(n => fs.readFileSync(n, 'utf8')).join('');
for (const marker of ['Quantum Crypto Studio','miniQuiz10','Final assessment','Flip for details']) {
  if (!html.includes(marker)) throw new Error(`Missing expected marker: ${marker}`);
}
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync(path.join('dist','index.html'), html, 'utf8');
console.log(`Built COMP6013 Week 7 static site from ${parts.length} chunks (${html.length} characters).`);
