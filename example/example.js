const puppeteer = require("puppeteer");
//test..
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://secure.runescape.com/m=forum/forums?75,76,331,66006366"
  );
  // await page.screenshot({path: 'example.png'});
  const result = await page.evaluate(() => {
    const forumBody = document.querySelector(".forum-post__body");

    return forumBody.innerHTML;
  });
  await browser.close();
  
  console.log(result);

})();
