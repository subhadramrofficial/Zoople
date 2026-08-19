let password = "admin123456";
let len = password.length;

if (len <= 6) {
  console.log("Weak");
} else if (len > 6 && len < 10) {
  console.log("Medium");
} else {
  console.log("Strong");
}
