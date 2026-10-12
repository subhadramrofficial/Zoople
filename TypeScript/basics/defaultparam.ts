// function calculateTotal(price: number, taxRate: number = 0): number {
//   return price + price * taxRate;
// }

// console.log( calculateTotal(7));

const calculateTotal = (price: number, taxRate: number = 6): number => {
  return price + price * taxRate;
};
console.log(calculateTotal(7));
