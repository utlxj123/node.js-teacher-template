const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  fs.writeFile(
    __dirname + "/headers.txt",
    JSON.stringify(req.headers),
    (error) => {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });

      res.end(`
            <h2>OK</h2>
            `);
    }
  );
});

server.listen(3000);
