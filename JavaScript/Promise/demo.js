let checkAge = new Promise((resolve, reject) => {
  let age = 12;
  if (age > 18) {
    resolve("You can vote!");
  } else {
    reject("You are too young to vote!");
  }
});

checkAge
  .then((d) => {
    console.log(d);
  })
  .catch((e) => console.log(e))
