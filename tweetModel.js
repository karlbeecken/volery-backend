const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

var Schema = mongoose.Schema;

let tweetSchema = new Schema({
  _id: {
    type: String,
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
      final: Boolean,
    },
  ],
  finalized: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

let Tweet = (module.exports = mongoose.model("tweet", tweetSchema));

module.exports.get = function (callback, limit) {
  Tweet.find(callback).limit(limit);
};
