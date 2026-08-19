function validateForm(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");
  error.textContent = "";
  if (username === "") {
    error.textContent = "Username is required";
    return false;
  }
  if (username.length < 4) {
    error.textContent = "Username must be atleast 4 characters";
    return false;
  }
  if (password === "") {
    error.textContent=("Password is required");
    return false;
  }
  if (password.length < 6) {
    error.textContent=("Password must be atleast 6 characters ");
    return false;
  }
  alert("Form successfully submitted!");
  return true;
}
