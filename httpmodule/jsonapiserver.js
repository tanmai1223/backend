const http = require("http");

const products = [
  { userId: 1, name: "Laptop", price: 9999.9 },
  { userId: 2, name: "Mobile", price: 8999.9 },
  { userId: 3, name: "Tablet", price: 7999.9 },
  { userId: 4, name: "Desktop", price: 6999.9 },
];

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "GET" && req.url === "/api/products") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: true,
        data: products,
        timeStamp: new Date().toISOString(),
      })
    );
  } else if (req.method === "GET" && req.url.startsWith ("/api/products/")) {
    const urlPart = req.url.split("/");
    const productId = parseInt(urlPart[3]);
    const product = products.find((product) => product.userId === productId);

    if (product) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: true,
          data: product,
          timeStamp: new Date().toISOString(),
        })
      );
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: false,
          message: "Product not found",
        })
      );
    }
  }  else if (req.method === "POST" && req.url === "/api/products") {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    try {
      const postData = JSON.parse(data);
      products.push(postData); 
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        status: true,
        message: "Product added",
        data: postData
      }));
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        status: false,
        message: "Invalid data"
      }));
    }
  });
}  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "failed",
        message: "Error",
      })
    );
  }
});

server.listen(3002, () => {
  console.log(`This API is running on http://localhost:3002`);
});
