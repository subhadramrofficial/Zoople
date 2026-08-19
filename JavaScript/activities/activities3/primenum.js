let num = 17;
let prime = true;
for (let i = 2; i < num; i++) {
  if (num % i == 0) {
    prime = false;
  }
}
if (prime) {
  console.log("Prime Number");
} else {
  console.log("Not Prime Number");
}
