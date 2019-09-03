const express = require("express");
const questions = express.Router();
const pool = require("../connections/connection");

questions.get("/questions", (req, res) => {
  pool
    .query("select * from questions order by random() limit 10")
    .then(result => {
      res.send(result.rows);
    });
});

module.exports = questions;
