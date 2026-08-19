const http = require("http");
// const { request } = require("https")
// const server = http.createServer((request, response)=>{
//     response.end("Hello from node server")
// })
// server.listen(3000,()=>{
//     console.log("Server running on port http://localhost:3000/");

// })

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(`
        <h1>Welcome</h1>
        <p>This is my first server</p>`);
});
server.listen(3000, () => {
  console.log("Server running on port http://localhost:3000/");
});
