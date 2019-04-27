const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////


module.exports.router = (req, res, next = () => {}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {
    var command = messages.dequeue();
    if (command !== undefined) {
      res.writeHead(200, headers);
      res.end(command);
    } 
    if (req.url === '/background.jpg'){
      fs.readFile('./background.jpg', (err, data) => {
        if (err) throw err;
        // res.writeHead(200, headers);
        res.end(data);
      });
    } else {
      res.writeHead(200, headers);
      res.end();
    }
  }
};

