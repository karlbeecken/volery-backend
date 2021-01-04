const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

var Schema = mongoose.Schema;

let tweetSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: function genUUID() {
      return uuidv4();
    },
  },
  name: {
    type: String,
    default: "Unnamed Tweet",
  },
  proposals: [
    {
      text: {
        type: String,
        default: "",
      },
      date: {
        type: Date,
        default: Date.now,
      },
      score: {
        type: Number,
        default: 0,
      },
      final: {
        type: Boolean,
        default: false,
      },
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
