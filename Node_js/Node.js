const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    // Read the content from message.txt if it exists
    let read_file = '';
    try {
      read_file = fs.readFileSync('message.txt', 'utf8');
    } catch (error) {
      console.log('File does not exist. Creating a new one.');
    }

    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body>');
    res.write(`<h1>${read_file}</h1>`);
    res.write(`
      <form action="/message" method="POST">
        <input type="text" name="message">
        <button type="submit">Send</button>
      </form>
    `);
    res.write('</body></html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];

      // Write to message.txt asynchronously
      fs.writeFile('message.txt', message, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('File updated with new message');
      });

      // Redirect to the home page
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
  }
});

server.listen(8080);
