let side1 = 11;
let side2 = 12;
let side3 = 12;
if (side1 + side2 > side3 && side2 + side3 > side1 && side1 + side3 > side2) {
  console.log("Valid Traingle");
} else {
  console.log("Invalid Triangle");
}
if (side1 === side2 && side2 === side3 && side3 === side1) {
  console.log("Equilateral Triangle");
} else if (side1 === side2 || side1 === side3 || side2 === side3) {
  console.log("Isosceles Triangle");
} else {
  console.log("Scalene Triangle");
}
