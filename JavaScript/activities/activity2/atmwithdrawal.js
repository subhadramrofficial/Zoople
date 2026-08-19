let balance = 0;
let widthdrawAmount = 90;

if (balance>0 && widthdrawAmount > 0) {
  console.log("Transaction Successful");
} else if (balance === 0) {
  console.log("Insufficient Balance");
} else if (widthdrawAmount < 0) {
  console.log("Invalid amount");
}
