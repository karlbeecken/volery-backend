var express = require("express");
var router = express.Router();
const Tweet = require("../tweetModel");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ message: "hello world" });
});

module.exports = router;
