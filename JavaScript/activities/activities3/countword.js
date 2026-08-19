let sentence = "I love JavaScript programming";
let count=1;
for (let i = 0; i < sentence.length; i++) {
  if (sentence[i] == " ") {
    count++;
  }
}
console.log(count);
