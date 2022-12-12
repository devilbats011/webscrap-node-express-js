var express = require("express");
var router = express.Router();
var path = require("path");
var viswax = require("../services/viswax");
var smeMsiaList = require("../services/sme");

const apiRoute = "api";
const testScrapRoute = "/test/scrap"

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "sometimes, you need a right amount of shock for your wake up call",
  });
});

router.get(`${testScrapRoute}/sme`, async (req, res) => {
  //path must be absolute or specify root to res.sendFile
   res.sendFile(path.join(__dirname, '../views/scrap_sme.html'));
   
});

router.get(`${testScrapRoute}/viswax`, async (req, res) => {
   res.sendFile(path.join(__dirname, '../views/scrap_viswax.html'));
   
});

router.get(`/${apiRoute}/viswax`, async (req, res) => {
  res.json({ ...await viswax.data });
});

router.get(`/${apiRoute}/sme`, async (req, res) => {
  res.json( await smeMsiaList.data );
});


module.exports = router;
