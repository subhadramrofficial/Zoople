const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(`[App-level] ${req.method} ${req.url}`);
  next();
});

function checkAuth(req, res, next) {
  const token = req.query.token;
  if (token === "secret123") {
    console.log("[Route-level] Auth success");
    next();
  } else {
    res.status(403).send("Forbidden: Invalid or missing token");
  }
}

app.get("/", (req, res) => {
  res.send("Welcome to Middleware Demo! Visit /protected or /form");
});

app.get("/protected", checkAuth, (req, res) => {
  res.send("This is a protected route. You passed authentication");
});

app.post("/form", (req, res) => {
  res.json({
    message: "Form data received",
    data: req.body,
  });
});

app.use((req, rex, next) => {
  const err = new Error("Page not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error("[Error-handling]", err.stack);
  res.status(err.status || 500).send(err.message);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
