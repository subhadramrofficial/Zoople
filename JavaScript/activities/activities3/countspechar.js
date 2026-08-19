let word = "malayalam";
let count = 0;
for (i = 1; i <= word.length; i++) {
  if (word[i] === "a" || word[i] === "A") {
    count++;
  }
}
console.log(`Number of how many times a repeated:${count}`);
