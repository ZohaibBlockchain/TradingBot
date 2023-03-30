const express = require('express');
const app = express();
const port = 3000;

// GET route
app.get('/', (req, res) => {
  res.send('Welcome to the Test Service');
});

// POST route
app.post('/signal', (req, res) => {
  const message = req.body.message;
  console.log(message);
  res.send('Message received');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
