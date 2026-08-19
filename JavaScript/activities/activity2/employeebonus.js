let yearsOfService = 11;
let salary = 5000;
let bonus;

if (yearsOfService >= 10) {
  bonus = salary * 0.2;
  console.log("Bonus Amount:" + bonus);
} else if (yearsOfService >= 5 && yearsOfService <= 9) {
  bonus = salary * 0.1;
  console.log("Bonus Amount:" + bonus);
} else {
  bonus = salary * 0.05;
  console.log("Bonus Amount:" + bonus);
}
