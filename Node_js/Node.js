// Task 1 Installation of Node Js

const http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    if (url === '/home') {
      res.write('Welcome home');
    } else if (url === '/about') {
      res.write('Welcome to About Us page');
    } else if (url === '/node') {
      res.write('Welcome to my Node Js project');
    } else {
      res.write('Hello world !!');
    }
  
    res.end();
}).listen(8080);