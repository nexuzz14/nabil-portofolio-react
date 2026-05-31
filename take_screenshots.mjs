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
    console.log("Navigating to login...");
    await page.goto('http://localhost:8081/login', { waitUntil: 'networkidle2' });
    
    // Fill credentials
    console.log("Filling credentials...");
    await page.type('#identifier', 'admin@sistem.com');
    await page.type('input[type="password"], input[name="password"]', 'Admin123!');
    
    // Submit
    console.log("Submitting...");
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);
    
    console.log("Taking dashboard screenshot...");
    await page.screenshot({ path: path.join(__dirname, 'public', 'absensi-dashboard.png') });
    
    // Maybe try to go to another page like attendance or employees if they exist
    console.log("Screenshots taken successfully.");
  } catch (err) {
    console.error("Error during screenshot:", err);
  } finally {
    await browser.close();
  }
})();
