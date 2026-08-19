import { findByUsername } from "../models/user.model.js";
export function loginController(req, res) {
  const { username, password } = req.body;
  console.log("Username:", username);
  console.log("Password:", password);

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const user = findByUsername(username);

  if (!user) {
    return res.status(400).send("User not found");
  }

  if (password !== user.password) {
    return res.status(400).send("Incorrect password");
  }

  res.send("Home Page!");
}
