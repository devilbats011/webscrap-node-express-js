var puppeteer = require("puppeteer");
var htmlparser = require("node-html-parser");

// use htmlparser and Regex Exp to extract data..
async function things() {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(
    "https://www.smartinvestor.com.my/top-20-malaysia-small-cap-companies-these-are-the-jewels-for-2022/"
  );

  let x = await page.evaluate(() => {
    let stringHtml = document.querySelector(".content-inner").outerHTML;
    return stringHtml;
  });

  await browser.close();
  const root = htmlparser.parse(x);
  return root;
}

(async () => {
  let contentData = await things();
  let smeArray = [];
  contentData = contentData.querySelectorAll("p");
  contentData.forEach((child) => {
    let text = child.text;
    const pattern = /^\d+. [\w]+/i;
    if (pattern.test(text)) {
      smeArray.push(text);
    }
  });
  exports.data = smeArray;
})();
