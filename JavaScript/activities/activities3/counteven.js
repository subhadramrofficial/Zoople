let num = 2846389;
let count = 0;
while (num > 0) {
  let digit = num % 10;
  if (digit % 2 == 0) {
    count++;
  }
  num = Math.floor(num / 10);
}
console.log(count);
