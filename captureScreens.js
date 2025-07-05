const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await page.waitForSelector('canvas');
  await page.screenshot({ path: 'portfolio_mode.png' });

  // click enterprise toggle button
  await page.click('button:has-text("Enterprise Mode")');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'enterprise_mode.png' });

  await browser.close();
})();