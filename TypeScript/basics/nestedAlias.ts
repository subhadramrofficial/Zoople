type Price = {
  amount: number;
  currency: string;
};
type Product = {
  title: string;
  price: Price;
};
const laptop: Product = {
  title: "Laptop",
  price: { amount: 999, currency: "USD" },
};
console.log(laptop);
