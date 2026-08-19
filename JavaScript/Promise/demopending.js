const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Done!");
  }, 2000);
});
console.log(promise);
promise.then((result) => {
  console.log(result);
});

