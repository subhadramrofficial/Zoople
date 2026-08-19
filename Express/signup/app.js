const express = require("express");
const app = express();
const users = [];

function middlewareA(req, res, next) {
  console.log("method:", req.method);
  console.log("url:", req.url);
  next();
}
app.use(middlewareA);
app.use(express.json());

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  console.log("username:", username);
  console.log("password:", password);

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).send("User already exists");
  }
  users.push({ username, password });
  console.log("users:", users);

  res.status(201).send("Signup Successful!");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Username:", username);
  console.log("Password:", password);

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).send("User not found");
  }

  if (user.password !== password) {
    return res.status(400).send("Incorrect password");
  }
  res.send("Welcome to Home Page!");
});
app.listen(4001, () => {
  console.log("Server running on port 4001");
});
