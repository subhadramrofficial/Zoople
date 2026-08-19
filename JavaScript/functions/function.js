// function add() {
//   let num1 = 10;
//   let num2 = 20;
//   let sum = num1 + num2;
//   console.log("Sum:", sum);
// }
// add()

// function add1(num1,num2) {
//   let sum = num1 + num2;
//   console.log("Sum:", sum);
// }
// add1(34,5)
// add1(55,23)
// add1(33,98)

// function add(num1, num2) {
//   let sum = num1 + num2;
//   return sum;
// }
// let result = add(34, 2);
// if (result > 0) {
//   console.log("Positive");
// } else {
//   console.log("Negative");
// }

// const add = function (num1, num2) {
//   let sum = num1 + num2;
//   return sum;
// };
// let result = add(12, 55);
// console.log("Sum:", result);

// const add1 = (num1, num2) => {
//   let sum1 = num1 + num2;
//   return sum1;
// };
// let result1 = add(12, 95);
// console.log("Sum:", result1);

// function add(num1 = 0, num2 = 0) {
//   let sum = num1 + num2;
//   return sum;
// }
// let result = add(12, 35);
// console.log(result);

// function calculateTotal(qty, price) {
//   console.log("Qty", qty);
//   console.log("Price", price);
//   let total = qty * price;
//   return total;
// }
// let total = calculateTotal(2, 100);
// console.log(total);

function add(num1, num2) {
  let sum = num1 + num2;
  console.log("Sum:", sum);
}
function product(num1, num2) {
  let product = num1 * num2;
  console.log("Product:", product);
}
function sub(num1, num2) {
  let diff = num1 - num2;
  console.log("Difference:", diff);
}
function div(num1, num2) {
  let div = num1 / num2;
  console.log("Quotient:", div);
}
add(20, 10);
product(5, 2);
sub(90, 60);
div(10, 2);
