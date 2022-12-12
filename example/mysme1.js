var puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch(); //{ headless: true }
  const page = await browser.newPage();
  await page.goto(
    "https://www.smartinvestor.com.my/top-20-malaysia-small-cap-companies-these-are-the-jewels-for-2022/"
  );

  let data = await page.evaluate(() => {
    //use Regex Exp to extract text data...
    let contentData = document.querySelector(".content-inner");
    const pattern = /\d{1,2}\. [\w ]+/gi;
    return contentData.textContent.match(pattern);
  });

  //Buang Unuseable Data..
  // console.log(exports.data.slice(1));
  exports.data = data.slice(1);
  await browser.close();
})();
