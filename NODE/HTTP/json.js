const http = require("http");
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  const user = {
    id: 1,
    name: "John",
    age: 22,
  };
  res.end(JSON.stringify(user));
});
server.listen(3000);
