"use strict";
// function calculateTotal(price: number, taxRate: number = 0): number {
//   return price + price * taxRate;
// }
// console.log( calculateTotal(7));
const calculateTotal = (price, taxRate = 6) => {
    return price + price * taxRate;
};
console.log(calculateTotal(7));
