import express from "express";
const app = express();
const port = 3000;
import { tradeFuture,UD,tradeCounter,resetBot,tradeEngine} from "./trade.js";

import bodyParser from "body-parser";
app.use(bodyParser.json());



app.get("/", (req, res) => {
  res.send("Welcome to the Test Service");
});

// POST route
app.post("/tradeFuture", (req, res) => {
  const data = req.body;
  tradeFuture(data);
  res.sendStatus(200);
});


app.post("/resetBot", (req, res) => {
  resetBot();
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


function botCore() {
   console.clear();
   console.log('V3 AI Bot +_+ : ');
  console.log('Current Instruments are: ',UD.length);
  console.log('BOT Health 100 % and total number of trade are: ',tradeCounter);
  
  tradeEngine();
  setTimeout(botCore, 1000);
}

botCore();