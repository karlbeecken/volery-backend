const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRouter = require("./routes/users");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);

const mongoDB = "mongodb://localhost/tweets";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

Tweet = require("./tweetModel");
let tweetInstance = new Tweet({ name: "testtweet" });
tweetInstance.save(function (err) {
  if (err) return handleError(err);
});

module.exports = app;
