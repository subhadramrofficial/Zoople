let word = "madam";
let reverse = "";
for (let i = word.length - 1; i >= 0; i--) {
  reverse += word[i];
}
if (word === reverse) {
  console.log("Palindrome");
} else {
  console.log("Not Palindrome");
}
