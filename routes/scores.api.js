const express = require("express");
const scores = express.Router();
const pool = require("../connections/connection");

function selectAllScores(req, res) {
  pool.query("select * from scores order by score desc;").then(result => {
    res.send(result.rows);
  });
}
scores.get("/scores", selectAllScores);

scores.post("/scores", (req, res) => {
  pool
    .query("insert into scores (username, score) values ($1::text, $2::int)", [
      req.body.username,
      req.body.score
    ])
    .then(() => {
      selectAllScores(req, res);
    });
  console.log("POST is working");
});

module.exports = scores;
