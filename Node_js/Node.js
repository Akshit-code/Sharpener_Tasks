const http = require('http');

const routes = require('./route');

console.log(routes.someText);

const server = http.createServer(routes.handler);

server.listen(8080);
