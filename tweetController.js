// Import tweet model
Tweet = require("./tweetModel");

exports.index = function (req, res) {
  Tweet.get(function (err, tweets) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Tweets retrieved successfully",
      data: tweets,
    });
  });
};

exports.new = function (req, res) {
  var tweet = new Tweet();
  tweet.name = req.body.name ? req.body.name : tweet.name;
  tweet.gender = req.body.gender;
  tweet.email = req.body.email;
  tweet.phone = req.body.phone;
  tweet.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New tweet created!",
      data: tweet,
    });
  });
};

exports.view = function (req, res) {
  Tweet.findById(req.params.tweet_id, function (err, tweet) {
    if (err) res.send(err);
    res.json({
      message: "Tweet details loading..",
      data: tweet,
    });
  });
}; // Handle update tweet info
exports.update = function (req, res) {
  Tweet.findById(req.params.tweet_id, function (err, tweet) {
    if (err) res.send(err);
    tweet.name = req.body.name ? req.body.name : tweet.name;
    tweet.gender = req.body.gender;
    tweet.email = req.body.email;
    tweet.phone = req.body.phone; // save the tweet and check for errors
    tweet.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "Tweet Info updated",
        data: tweet,
      });
    });
  });
}; // Handle delete tweet
exports.delete = function (req, res) {
  Tweet.remove(
    {
      _id: req.params.tweet_id,
    },
    function (err, tweet) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Tweet deleted",
      });
    }
  );
};
