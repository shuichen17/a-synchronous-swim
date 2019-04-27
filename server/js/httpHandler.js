const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

// module.exports.router = (req, res, next = ()=>{}) => {
//   console.log('Serving request type ' + req.method + ' for url ' + req.url);
//   console.log(req);
//   res.writeHead(200, headers);
//   res.end();
// };


module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  
  if (req.method === 'GET'){
    console.log('get received')

  var command = messages.dequeue();
  if (command !== undefined){
    res.writeHead(200, headers);
    res.write(command);
    res.end();
  } else {
  res.writeHead(200, headers);
  res.end();
  }
  }
};

