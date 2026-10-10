// Usage: node render.mjs <beats.js> <out.mp4>            render the beat script to an MP4
//        node render.mjs <beats.js> stills 2,14.5,30     PNG stills at those seconds, next to out dir stills-<name>/
import { createRequire } from 'module';
import { execFileSync } from 'child_process';
import path from 'path'; import fs from 'fs'; import { fileURLToPath, pathToFileURL } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(here + '/');
const { chromium } = require('playwright-core');
const [script, out, times] = process.argv.slice(2);
if (!script || !out) { console.error('usage: node render.mjs <beats.js> <out.mp4|stills> [seconds,...]'); process.exit(1); }
const src = path.resolve(script), name = path.basename(src, '.js');
const FPS = 30, BEAT = 4, TR = 0.6;
const which = c => { try { return execFileSync('which', [c]).toString().trim(); } catch { return ''; } };
const chrome = process.env.CHROME_BIN || which('google-chrome') || which('chromium') || which('chromium-browser');
const browser = await chromium.launch({ executablePath: chrome || undefined, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(`${pathToFileURL(path.join(here, 'engine.html'))}?data=${encodeURIComponent(pathToFileURL(src))}`);
await page.waitForFunction('window.__ready');
const beats = await page.evaluate('window.__beats');
const at = t => page.evaluate(`window.__renderAt(${t * 1000})`);
if (out === 'stills') {
  const dir = path.join(path.dirname(src), `stills-${name}`); fs.mkdirSync(dir, { recursive: true });
  for (const t of times.split(',')) { await at(Number(t)); await page.screenshot({ path: `${dir}/still-${t}.png` }); }
  await browser.close(); console.log('stills in', dir); process.exit(0);
}
const dir = fs.mkdtempSync(path.join(path.dirname(path.resolve(out)), `.frames-${name}-`));
const list = []; let n = 0;
const shot = async (t, dur) => { await at(t); const f = `${dir}/f${String(n++).padStart(5, '0')}.png`; await page.screenshot({ path: f }); list.push(`file '${f}'\nduration ${dur.toFixed(4)}`); };
for (let i = 0; i < beats.length; i++) {
  const t0 = i * BEAT;
  if (beats[i].anim) { for (let k = 0; k < BEAT * FPS; k++) await shot(t0 + k / FPS, 1 / FPS); } // animated beat: every frame
  else { const tf = Math.round(TR * FPS); for (let k = 0; k < tf; k++) await shot(t0 + k / FPS, 1 / FPS); await shot(t0 + TR + 0.05, BEAT - tf / FPS); } // transition, then one held frame
}
list.push(`file '${dir}/f${String(n - 1).padStart(5, '0')}.png'`);
fs.writeFileSync(`${dir}/list.txt`, list.join('\n'));
await browser.close();
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', `${dir}/list.txt`, '-vf', 'fps=30,format=yuv420p', '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-movflags', '+faststart', path.resolve(out)], { stdio: 'inherit' });
fs.rmSync(dir, { recursive: true, force: true });
console.log('wrote', out, beats.length, 'beats', (beats.length * BEAT / 60).toFixed(1), 'min');
