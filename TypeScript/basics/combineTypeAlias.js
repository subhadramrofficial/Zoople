"use strict";
function applyDiscount(product, percent) {
    return {
        name: product.name,
        price: product.price * (1 - percent / 100),
        inStock: product.inStock,
    };
}
const shirt = { name: "T-Shirt", price: 29.99, inStock: true };
const discounted = applyDiscount(shirt, 20);
console.log(discounted.name + " $" + discounted.price.toFixed(2));
