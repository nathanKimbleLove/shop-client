/* eslint-disable */
const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const cors = require("cors");
const axios = require("axios");
// const { application } = require("express"); // what is this doing?

const port = process.env.PORT || 8080;
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
const authOptions = { headers: { Authorization: process.env.REACT_APP_AUTH } };
app.use('/', express.static(path.join(__dirname, "../client/build/")));
console.log("dirname " + __dirname);
console.log(path.join(__dirname, "../client/build/"));

app.post("/*", (req, res) => {
  axios
    .post(process.env.REACT_APP_API + req.url, req.body, authOptions)
    .then((answer) => {
      res.sendStatus(202);
      console.log(answer);
    })
    .catch((err) => console.log(err));
});

app.get("/*", (req, res) => {
  axios
    .get(process.env.REACT_APP_API + req.url, authOptions)
    .then((answer) => {
      res.statusCode = 200;
      res.send(answer.data);
    })
    .catch((err) => console.log(err));
});

// enables posting a question
app.post("/qa/questions*", (req, res) => {
  let url = process.env.REACT_APP_API + req.url;
  axios
    .post(url, req.body, authOptions)
    .then((answer) => {
      console.log("successfully posted app.post in server/index.js");
      res.statusCode = answer.status;
      res.send(answer.statusText);
    })
    .catch((err) => {
      console.log(err);
    });
});

// enables marking questions helpful / reporting
app.put("/*", (req, res) => {
  let url = process.env.REACT_APP_API + req.url;
  axios
    .put(url, {}, authOptions)
    .then((answer) => {
      console.log("successfully put app.put in server/index.js");
      res.statusCode = answer.status;
      res.send(answer.statusText);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => console.log("listening on ", port));
