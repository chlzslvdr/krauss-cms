const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const filePath = `file:${path.join(__dirname, 'coverage/lcov-report/index.html')}`;

  await page.goto(filePath, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: 'coverage-report.pdf',
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
})();
