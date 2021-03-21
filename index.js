const express = require("express");
const upload = require("./helpers/");
const app = express();
const fs = require("fs");
var response = require("./functions/");

app.post("/analyse", upload.single("source"), function (req, res) {
  response
    .f1()
    .then((data1) => {
      response
        .f2(data1)
        .then((results) => {
          fs.unlinkSync("./uploads/temp.jpg");
          res.status(200);
          res.send(results);
        })
        .catch((err) => {
          res.status(500);
          res.send(err);
        });
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
});

app.get("/temp-img*", function (req, res) {
  res.download("./uploads/temp.jpg");
});

app.all(function (req, res) {
  res.status(404);
});

app.listen(process.env.PORT || 3000);
