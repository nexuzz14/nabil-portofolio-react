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
    console.log("Navigating to pos-bakebliss...");
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    
    // Check if it's a login page
    const emailInput = await page.$('input[type="email"]');
    if (emailInput) {
      console.log("Taking pos login screenshot...");
      await page.screenshot({ path: path.join(__dirname, 'public', 'pos-login.png') });
      
      // We don't have credentials, so we might just leave it at that.
      // Or try some default ones if possible, but let's just stick to login page.
    } else {
      console.log("Taking pos dashboard screenshot...");
      await page.screenshot({ path: path.join(__dirname, 'public', 'pos-dashboard.png') });
    }
    
    console.log("Screenshot taken successfully.");
  } catch (err) {
    console.error("Error during screenshot:", err);
  } finally {
    await browser.close();
  }
})();
