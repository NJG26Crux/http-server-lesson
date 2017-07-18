'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const guestsPath = path.join(__dirname, 'guests.json');

// Create a new HTTP server
const server = http.createServer((req, res) => {
  // Match request method and url before proceeding
  if (req.method === 'GET' && req.url === '/guests') {
    fs.readFile(guestsPath, 'utf8', (err, guestsJSON) => {
      if (err) {
        console.error(err.stack);

        // If a read error occurred, send 500 response
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');

        return; // return out of callback
      }

      // If reading JSON successful, send in body of response
      res.setHeader('Content-Type', 'application/json');
      res.end(guestsJSON);
    });
  }
  
  // If request method and url did not match, respond with 404
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

const port = 8000;

// Tells node to start server loop listening for incoming HTTP requests
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
