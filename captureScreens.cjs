const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await page.waitForSelector('canvas');
  await page.screenshot({ path: 'portfolio_mode.png', fullPage: true });
  // Click the Enterprise toggle (button text changes depending on current mode)
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent?.includes('Enterprise')); if (btn) btn.click();
  });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'enterprise_mode.png', fullPage: true });
  await browser.close();
})();