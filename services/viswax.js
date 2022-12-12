var puppeteer = require("puppeteer");

(async () => {
  // visWaxData: async () => {}
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://secure.runescape.com/m=forum/forums?75,76,331,66006366"
  );
  exports.data = await page.evaluate(() => {
    const forumBody = document.querySelector(".forum-post__body");

    let x = forumBody.querySelector(".bb.bb-gold");
    let goWhileLoop = true;
    const SLOT1_PATTERN = /slot 1/i;
    const SLOT2_PATTERN = /slot 2/i;
    const SLOT3_PATTERN = /slot 3/i;
    let slotsObj = {};
    slotsObj.slot1 = { slotName: "slot 1", textArray: [] };
    slotsObj.slot2 = { slotName: "slot 2", textArray: [] };

    while (goWhileLoop) {
      if (x.textContent) {
        if (x.textContent != " ") {
          if (SLOT1_PATTERN.test(x.textContent)) {
            goWhileLoop = false;
            while (!SLOT2_PATTERN.test(x.textContent)) {
              if (
                !(
                  x.textContent == " " ||
                  !x.textContent ||
                  SLOT1_PATTERN.test(x.textContent)
                )
              )
                slotsObj.slot1.textArray.push(x.textContent.trim());
              x = x.nextSibling;
            }
            if (SLOT2_PATTERN.test(x.textContent)) {
              while (!SLOT3_PATTERN.test(x.textContent)) {
                if (!(x.textContent == " " || !x.textContent)) {
                  if (!SLOT2_PATTERN.test(x.textContent))
                    slotsObj.slot2.textArray.push(x.textContent.trim());
                }
                x = x.nextSibling;
              }
            }
          }
        }
      }
      if (x);
      x = x.nextSibling;
    }
    // return forumBody.innerHTML;
    return slotsObj;
  });

  await browser.close();
})();
