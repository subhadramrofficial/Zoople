const sales = [1200, 1500, 1800, 900, 2000];

let total = sales.reduce((total, val) => total + val, 0);

let averageSales = total / sales.length;

let highestSale = sales.reduce((max, sale) => (sale > max ? sale : max));

let lowestSale = sales.reduce((min, sale) => (sale < min ? sale : min));

let aboveAverage = sales.filter((sale) => sale > averageSales);

let report = sales.map((sale, index) => ({
  Month: index + 1,
  Sale: sale,
  Status: sale > averageSales ? "Above Average" : "Below Average",
}));

console.log("Total Sales:", total);
console.log("Average Sales:", averageSales);
console.log("Highest Sale:", highestSale);
console.log("Lowest Sale:", lowestSale);
console.log("Sales Above Average:", aboveAverage);
console.log("Sales Report:", report);
