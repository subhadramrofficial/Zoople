for (let num = 2; num <= 100; num++) {
  let prime = true;
  for (let i = 2; i < num; i++) {
    if (num % i == 0) {
      prime = false;
    }
  }
  if (prime) {
    console.log(num);
  }
}

