const http = require('http');

const routes = require('./route');

console.log(routes.someText);
console.log("some more added text");
const server = http.createServer(routes.handler);

server.listen(8080);
