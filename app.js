require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url =
    "https://us13.api.mailchimp.com/3.0/lists/" + process.env.AUDIENCE;
  const options = {
    method: "POST",
    auth: process.env.AUTH,
  };
  const request = https.request(url, options, function (response) {
    if (res.statusCode === 200) {
      res.sendFile(__dirname + "/index.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log("data");
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure.html", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function (req, res) {
  console.log("server is connected to port 3000");
});
