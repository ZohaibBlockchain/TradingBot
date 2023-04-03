import express from "express";
const app = express();
const port = 3000;
import { tradeFuture,UD,tradeCounter} from "./trade.js";

import bodyParser from "body-parser";
app.use(bodyParser.json());



app.get("/", (req, res) => {
  res.send("Welcome to the Test Service");
});

// POST route
app.post("/signalopen", (req, res) => {
  const data = req.body.message;
  tradeFuture(data);
  res.sendStatus(200);
});


// app.post("/signalclose", (req, res) => {
//   const message = req.body.message;
//   close(message);
//   res.sendStatus(200);
// });


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
  console.log('Current Instruments are: ',UD.length);
  console.log('BOT Health 100 % and total number of trade are: ',tradeCounter);
  setTimeout(botCore, 5000);
}

botCore();