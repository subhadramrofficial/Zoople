const express = require("express");
const app = express();
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("username:", password);
  console.log("password:", password);
  if (!username || !password) {
    return res.status(400).send("Username anpassword are required");
  }
  const DBusername = "Subhadra";
  const DBpassword = "12345";
  if (username !== DBusername) {
    return res.status(400).send("User not found");
  }
  if (password !== DBpassword) {
    return res.status(400).send("Incorred password");
  }
  res.send("Home Page");
});
app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
    
})
