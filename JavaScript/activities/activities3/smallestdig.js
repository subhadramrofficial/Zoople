let num = 57294;
let smallest = 100;
while (num > 0) {
  let digit = num % 10;
  if (digit < smallest) {
    smallest = digit;
  }
  num = Math.floor(num / 10);
}
console.log("Smallest Digit = " + smallest);
