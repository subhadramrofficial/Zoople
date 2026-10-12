"use strict";
const scores = [10, 20, 30];
scores.push(40);
const doubled = scores.map((n) => n * 2);
console.log(doubled);
const found = scores.find((n) => n > 15);
console.log(found);
