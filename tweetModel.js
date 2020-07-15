const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

let tweetSchema = mongoose.Schema({
  id: {
    type: ObjectId,
    required: true,
    default: uuidv4(),
  },
  name: {
    type: String,
    default: "Unnamed Tweet",
  },
  proposals: [
    {
      text: String,
      date: Date,
      score: Number,
    },
  ],
  finalized: Boolean,
  created: {
    type: Date,
    default: Date.now,
  },
});

let Tweet = (module.exports = mongoose.model("tweet", tweetSchema));

module.exports.get = function (callback, limit) {
  Tweet.find(callback).limit(limit);
};
