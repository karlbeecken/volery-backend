const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRouter = require("./routes/users");
const tweetsRouter = require("./routes/tweets");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", usersRouter);
app.use("/tweets?", tweetsRouter);

const mongoDB = "mongodb://localhost/tweets";
mongoose.set("useFindAndModify", false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

Tweet = require("./tweetModel");
// let tweetInstance = new Tweet({ name: "testtweet" });
// Tweet.find({}, (err, docs) => {
//   docs.forEach(doc => doc.deleteOne());
// })

module.exports = app;
