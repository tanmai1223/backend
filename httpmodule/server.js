const http = require("http");
const { CLIENT_RENEG_LIMIT } = require("tls");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(`Hello world!\n `);
  } else if (req.url === "/home") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Home Page</h1>");
  } else if (req.url === "/api/data") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: true,
        id: 1,
        name: "Teju",
        age: 28,
      })
    );
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: false,
        message: "Error",
      })
    );
  }
});

server.listen(3000, () => {
  console.log(`Website is running on http://localhost:3000/`);
});

server.on("connection",(socket)=>{
    console.log("New Connection Established")
})

server.on("error",(err)=>{
    console.log("Server Error :",err);
})
