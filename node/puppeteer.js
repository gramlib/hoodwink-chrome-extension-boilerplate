const puppeteer = require('puppeteer');
const path = require('path');

module.exports = async (url) => {
  const pathToExtension = path.join(__dirname, '../extension');
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--window-size=${1920},${1920}`,
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
    devtools: false,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1920,
    deviceScaleFactor: 1,
  });
  await page.goto(url);
};
