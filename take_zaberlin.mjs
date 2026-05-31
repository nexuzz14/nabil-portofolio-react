import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: "new",
    defaultViewport: { width: 1280, height: 720 }
  });
  const page = await browser.newPage();
  
  try {
    console.log("Navigating to zaberlin...");
    await page.goto('http://localhost:8083', { waitUntil: 'networkidle2' });
    
    console.log("Taking zaberlin screenshot...");
    await page.screenshot({ path: path.join(__dirname, 'public', 'zaberlin-home.png') });
    console.log("Screenshot taken successfully.");
  } catch (err) {
    console.error("Error during screenshot:", err);
  } finally {
    await browser.close();
  }
})();
