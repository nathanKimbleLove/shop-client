/* eslint-disable */
const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./.env") });
const cors = require("cors");
const axios = require("axios");

const port = process.env.PORT || 8080;
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
const authOptions = { headers: { Authorization: process.env.REACT_APP_AUTH } };

app.post("/", (req, res) => {
  console.log(req.url);
  console.log(req.body);

  axios
    .post(process.env.REACT_APP_API + req.url, req.body, authOptions)
    .then((answer) => {
      res.status(202);
    })
    .catch((err) => console.log(err));
});

app.get("/*", (req, res) => {
  console.log(req.url);
  axios
    .get(process.env.REACT_APP_API + req.url, authOptions)
    .then((answer) => {
      res.send(answer.data);
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => console.log("listening on ", port));
