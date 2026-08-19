let number = 501;

if (number < 0) {
  console.log("Negative");
} else if (number >= 0 && number <= 100) {
  console.log("Range from 0-100");
} else if (number >= 101 && number <= 500) {
  console.log("Range from 101-500");
} else {
  console.log("Above 500");
}
