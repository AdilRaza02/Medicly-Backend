const express = require("express");
const upload = require("./helpers/");
const app = express();
var fs = require("fs");

app.post("/analyse", upload.single("source"), function (req, res, next) {
  let response = require("./functions/");
  console.log(response);
  response
    .then((data) => {
      fs.unlinkSync("./uploads/temp.jpg");
      res.status(200);
      res.send(data);
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
