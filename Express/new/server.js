const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Hello Express");
});
app.get("/about", (req, res) => {
  res.send("Welcome to about!");
  console.log("req_url:",req.url);
  console.log("req_method:",req.method);
  console.log("req_headers:",req.headers);
  console.log("req_body:",req.body);
  
});
app.get("/contact", (req, res) => {
  res.send("Welcome to contact");
});
app.listen(3000, () => {
  console.log("Server running on port 300");
});
