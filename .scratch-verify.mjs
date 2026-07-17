import { chromium } from 'playwright';

const browser = await chromium.launch();
const errors = [];

async function shot(width, height, name) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on('pageerror', (e) => errors.push(`[${name}] pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[${name}] console: ${msg.text()}`);
  });
  await page.goto('http://localhost:5175', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `.scratch-${name}.png`, fullPage: false });
  await page.close();
}

await shot(390, 844, 'mobile');
await shot(834, 1194, 'tablet');
await shot(1440, 900, 'desktop');

await browser.close();

console.log('ERRORS:', errors.length ? errors.join('\n') : 'none');
