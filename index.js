import express from "express";
const app = express();
const port = 3000;
import { open, close } from "./trade.js";

import bodyParser from "body-parser";
app.use(bodyParser.json());



app.get("/", (req, res) => {
  res.send("Welcome to the Test Service");
});

// POST route
app.post("/signalopen", (req, res) => {
  const message = req.body.message;
  open(message);
  res.sendStatus(200);
});


app.post("/signalclose", (req, res) => {
  const message = req.body.message;
  close(message);
  res.sendStatus(200);
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


process.on('uncaughtException', function (err) {
  console.log(err);
});


process.on('TypeError', function (err) {
  console.log(err);
});