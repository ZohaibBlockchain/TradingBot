import express from 'express';
const app = express();
const port = 3001;
import {main} from './trade.js';

main('h');

import bodyParser from 'body-parser';
app.use(bodyParser.json());
// app.use(json());

// GET route
app.get('/', (req, res) => {
  res.send('Welcome to the Test Service');
});

// POST route
app.post('/signal', (req, res) => {
  const message = req.body.message;
  main(message);
  res.sendStatus(200);  
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
