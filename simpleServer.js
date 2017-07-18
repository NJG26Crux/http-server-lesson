'use strict';

const http = require('http');

const server = http.createServer((req, res) => {
  const guests = ['Mary', 'Don'];
  const guestsJSON = JSON.stringify(guests);

  res.setHeader('Content-Type', 'application/json');
  res.end(guestsJSON);
});

const port = 8000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
