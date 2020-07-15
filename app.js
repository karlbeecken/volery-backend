const express = require("express");
const logger = require("morgan");
const bodyParser = require('body-parser');

const usersRouter = require("./routes/users");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);

module.exports = app;
