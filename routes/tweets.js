const express = require("express");
const router = express.Router();
const Tweet = require("../tweetModel");

router.get("/", function (req, res, next) {
  Tweet.find({}, (err, tweets) => {
    if (err) res.send(err);
    res.json(tweets);
  });
});

router.get("/:id", (req, res, next) => {
  Tweet.findOne({ _id: req.params.id }, (err, tweets) => {
    if (err) res.send(err);
    res.json(tweets);
  });
});

router.post("/", (req, res, next) => {
  let tweetInstance = new Tweet({
    name: req.body.name,
    proposals: [{ text: req.body.text }],
  });
  tweetInstance.save((err, tweet) => {
    if (err) console.error(err);

    res.status(200).json(tweet); // TODO: send proper response
  });
});

router.post("/:id/proposal", (req, res, next) => {
  Tweet.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { proposals: { text: req.body.text } } },
    { new: true },
    (err, tweet) => {
      if (err) console.error(err);

      res.status(200).json(tweet); // TODO: send proper response
    }
  );
});

router.put("/:id/finalize", (req, res, next) => {
  Tweet.findOneAndUpdate(
    { _id: req.params.id, "proposals._id": req.body.proposal },
    { finalized: true, $set: { "proposals.$.final": true } },
    { new: true },
    (err, tweet) => {
      if (err) console.log(err);
      res.status(200).json(tweet);
    }
  );
});

module.exports = router;
