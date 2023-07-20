const http = require("node:http");

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  res.end(`
    <h2>Hola  333</h2>
    <p>${req.url}</p>
    `);
});

server.listen(3000);
