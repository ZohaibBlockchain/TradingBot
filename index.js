const express = require('express');
const app = express();
const port = 80;


const bodyParser = require('body-parser');
app.use(bodyParser.json());

// GET route
app.get('/', (req, res) => {
  res.send('Welcome to the Test Service');
});

// POST route
app.post('/signal', (req, res) => {
  const message = req.body.message;
  console.log(message);
  res.send(message);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
