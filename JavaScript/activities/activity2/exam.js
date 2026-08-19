let maths = 40;
let science = 70;
let english = 50;
let avg = (maths + english + science) / 3;

if (maths < 40 || science < 40 || english < 40) {
  console.log("Fail");
} else if (avg >= 90) {
  console.log("Pass-Distinction");
} else if (avg >= 75) {
  console.log("Pass-First Class");
} else if (avg >= 60) {
  console.log("Pass-Second Class");
} else {
  console.log("Pass");
}
