let word = "javascript";
let result = "";
for (let i = 0; i < word.length; i++) {
  let ch = word[i];
  if (
    ch != "a" &&
    ch != "e" &&
    ch != "i" &&
    ch != "o" &&
    ch != "u" &&
    ch != "A" &&
    ch != "E" &&
    ch != "I" &&
    ch != "O" &&
    ch != "U"
  ) {
    result += ch;
  }
}
console.log(result);

