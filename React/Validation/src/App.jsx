import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function handleSubmit(e) {
    e.preventDefault();
    if (username.length < 3) {
      setError("Username must be atleast 3 characters.");
    } else if (password.length < 8) {
      setError("Password must be atleast 8 characters");
    }
    else if (!pattern.test(email)) {
      setError("Invalid Email Format");
    }
    else {
      setError("Form submitted successfully");
      console.log("Form submitted successfully");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <input
        className="border border-amber-300"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />{" "}
      <br />
      <label>Email</label>
      <input
        className="border border-amber-300"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <br />
      <label>Password</label>
      <input
        className="border border-amber-300"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br />
      <button type="submit">Submit</button>
      <p className="text-red-300">{error}</p>
    </form>
  );
}

export default App;
