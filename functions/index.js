const functions = require("firebase-functions");
const puppeteer = require('puppeteer');
const express = require("express");
const cors = require("cors");

const beefyOpts = {timeoutSeconds: 120,memory: "2GB",};
/* Api1 */ 
const app1 = express();
app1.get("*", async function (req, res) {
  const browser = await puppeteer.launch({args: ['--no-sandbox'],headless:false,});
  const page = await browser.newPage();
  res.send("browser open");
});

const openBrowser = functions.runWith(beefyOpts).https.onRequest(app1);

/* Api2 */
const app2 = express();
app2.use(cors({ origin: true }));
app2.get("*", async function (req, res) {
  await page.goto('https://example.com/');
  res.send("Hello from api 2");
});

const openWebPage = functions.runWith(beefyOpts).https.onRequest(app2);

module.exports = {
  openBrowser,
  openWebPage,
};