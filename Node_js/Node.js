// Task 1 Installation of Node Js

const http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Akshit Mandani');
}).listen(8080);