// Task 1 Installation of Node Js

// const http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('hello World!');
// }).listen(8080);

// Task 2 Lets Revise Javascript concepts

let a = 10;
let b = 5;
let res = (x, y) => {return x * y };
console.log(res(a,b));

let student = {
    first_name : "Akshit",
    second_name : "Mandani",
    greet() {
        console.log("Hello " + this.first_name + " " +  this.second_name);
    }
}

student.greet();