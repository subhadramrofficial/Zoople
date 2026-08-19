let a = 10;
let b = 2;
let operator = "+";
let result;
if (operator == "+") {
  result = a + b;
  console.log(`Addition:${result}`);
} else if (operator == "-") {
  result = a - b;
  console.log(`Subtraction:${result}`);
} else if (operator == "*") {
  result = a * b;
  console.log(`Product:${result}`);
} else {
  console.log("Invalid Operator");
}
