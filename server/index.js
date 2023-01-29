/* eslint-disable */
const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./.env") });
const cors = require("cors");
const axios = require("axios");
const { application } = require("express");

const port = process.env.PORT || 8080;
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
const authOptions = { headers: { Authorization: process.env.REACT_APP_AUTH } };

app.post("/", (req, res) => {
  // console.log("app.post request url: ", req.url);
  axios
    .post(process.env.REACT_APP_API + req.url, req.body, authOptions)
    .then((answer) => {
      res.status(202);
    })
    .catch((err) => console.log(err));
});

app.get("/*", (req, res) => {
  // console.log("app.get request url: ", req.url);
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
  console.log("in app.post at server/index url is " + url);
  console.log("in app.post req.body is ", req.body);
  console.log(typeof req.body);
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

// enables marking question helpful
app.put("/*", (req, res) => {
  let url = process.env.REACT_APP_API + req.url;
  console.log("in app.put at server/index url is " + url);
  console.log("in app.put req.body is ", req.body);
  console.log(typeof req.body);
  axios
    .put(url, {}, authOptions)
    .then((answer) => {
      console.log("successfully put app.put in server/index.js");
      res.statusCode = answer.status;
      res.send(answer.statusText);
    })
    .catch((err) => {
      console.log("failed to put in server/index app.put");
    });
});

// app.get("/qa/questions/", (req, res) => {
//   let url = process.env.REACT_APP_API + req.url;
//   console.log(url);
//   axios
//     .post(url, req.body, authOptions)
//     .then((answer) => {
//       res.statusCode = answer.status;
//       res.send(answer.statusText);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// unneecessary for app.post answers to work
// app.post("/qa/questions/*", (req, res) => {
//   let url = process.env.REACT_APP_API + req.url;
//   console.log("app.post in server/index " + url);
//   axios
//     .post(url, req.body, authOptions)
//     .then((answer) => {
//       res.statusCode = answer.status;
//       res.send(answer.statusText);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.listen(port, () => console.log("listening on ", port));
