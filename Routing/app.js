const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Home API" }));
  } else if (req.url === "/flipkart") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Flipkart API" }));
  } else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Contacts " }));
  } else if (req.url === "/products") {
    const products = [
      {
        id: 1,
        name: "iPhone 15",
        price: 79900,
        category: "Mobile",
        inStock: true,
      },
      {
        id: 2,
        name: "Dell XPS 13",
        price: 120000,
        category: "Laptop",
        inStock: false,
      },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  }
});
server.listen(4000, () => {
  console.log("http://localhost:4000");
});
