const lang = ["HTML CSS", "JavaScript React"];
let result = lang.flatMap(function (lan) {
  return lan.split(" ");
});
console.log(result);
