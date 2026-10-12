const prices = [9.99, 14.5, 3.75];
prices.push("free");
prices.push(true);

const total = prices.reduce((sum, p) => sum + p, 0);
console.log("Total:", total);
