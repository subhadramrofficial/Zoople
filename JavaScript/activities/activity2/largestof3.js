let a = 10;
let b = 20;
let c = 30;
if (a > b) {
  if (a > c) {
    console.log(`${a} is larger`);
  } else {
    console.log(`${c} is larger`);
  }
} else {
  if (b > c) {
    console.log(`${b} is larger`);
  } else {
    console.log(`${c} is larger`);
  }
}
