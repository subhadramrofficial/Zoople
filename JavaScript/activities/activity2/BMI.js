let weight = 65;
let height = 170;

let bmi = (weight * 10000) / (height * height);
if (bmi < 18.5) {
  console.log("Underweight");
} else if (bmi > 18.5 && bmi < 24.9) {
  console.log("Normal");
} else if (bmi > 25 && bmi < 29.9) {
  console.log("Overweight");
} else {
  console.log("Obese");
}
