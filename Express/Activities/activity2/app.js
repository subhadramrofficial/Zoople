const express=require("express");
const app=express();
const PORT=3000;
const products = [
  {
    id: 1,
    name: "iPhone 15",
    category: "Mobile",
    brand: "Apple",
    price: 79999,
    rating: 4.8,
    stock: 20,
  },
  {
    id: 2,
    name: "Galaxy S24",
    category: "Mobile",
    brand: "Samsung",
    price: 74999,
    rating: 4.7,
    stock: 15,
  },
  {
    id: 3,
    name: "MacBook Air M3",
    category: "Laptop",
    brand: "Apple",
    price: 119999,
    rating: 4.9,
    stock: 10,
  },
  {
    id: 4,
    name: "Inspiron 15",
    category: "Laptop",
    brand: "Dell",
    price: 58999,
    rating: 4.5,
    stock: 12,
  },
  {
    id: 5,
    name: "ThinkPad E14",
    category: "Laptop",
    brand: "Lenovo",
    price: 64999,
    rating: 4.6,
    stock: 8,
  },
  {
    id: 6,
    name: "Bravia 55",
    category: "TV",
    brand: "Sony",
    price: 69999,
    rating: 4.8,
    stock: 6,
  },
  {
    id: 7,
    name: "Smart LED TV",
    category: "TV",
    brand: "LG",
    price: 55999,
    rating: 4.6,
    stock: 9,
  },
  {
    id: 8,
    name: "Boat Rockerz 450",
    category: "Headphones",
    brand: "Boat",
    price: 1999,
    rating: 4.3,
    stock: 50,
  },
  {
    id: 9,
    name: "WH-1000XM5",
    category: "Headphones",
    brand: "Sony",
    price: 28999,
    rating: 4.9,
    stock: 7,
  },
  {
    id: 10,
    name: "AirPods Pro",
    category: "Earbuds",
    brand: "Apple",
    price: 24999,
    rating: 4.8,
    stock: 18,
  },
  {
    id: 11,
    name: "Galaxy Buds 3",
    category: "Earbuds",
    brand: "Samsung",
    price: 12999,
    rating: 4.5,
    stock: 0,
  },
  {
    id: 12,
    name: "Apple Watch Series 10",
    category: "Smartwatch",
    brand: "Apple",
    price: 45999,
    rating: 4.9,
    stock: 11,
  },
  {
    id: 13,
    name: "Galaxy Watch 7",
    category: "Smartwatch",
    brand: "Samsung",
    price: 32999,
    rating: 4.7,
    stock: 14,
  },
  {
    id: 14,
    name: "iPad Air",
    category: "Tablet",
    brand: "Apple",
    price: 59999,
    rating: 4.8,
    stock: 0,
  },
  {
    id: 15,
    name: "Galaxy Tab S9",
    category: "Tablet",
    brand: "Samsung",
    price: 54999,
    rating: 4.7,
    stock: 16,
  },
];

// 1. display all products
app.get("/products", (req,res)=>{
    res.json(products);
})

// 2. search products using name
app.get("/products/search", (req, res) => {
  const name = String(req.query.name);

  if (!name) {
    return res.status(400).json({
      message: "Please provide a product name.",
    });
  }

  const result = products.filter(
    (pro) => pro.name.toLowerCase() === name.toLowerCase(),
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No products found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/products/search?name=iPhone 15*/ 

/*------------------------------------------------*/

// 3. display products belonging to a specific category

app.get("/products/category", (req, res) => {
  const category = req.query.category;

  if (!category) {
    return res.status(400).json({
      message: "Please provide a category.",
    });
  }

  const result = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase(),
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No products found.",
    });
  }

  res.json(result);
});

/*URL: http://localhost:3000/products/category?category=Laptop*/ 
/*------------------------------------------------*/


// 4. product belong to a brand
app.get("/products/brand", (req, res) => {
  const brand = req.query.brand;

  if (!brand) {
    return res.status(400).json({
      message: "Please provide a brand.",
    });
  }

  const result = products.filter(
    (product) =>
      product.brand.toLowerCase() === brand.toLowerCase()
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No products found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/products/brand?brand=Apple*/ 
/*------------------------------------------------*/


// 5. price less than given price 
app.get("/products/price", (req, res) => {
  const price = Number(req.query.price);

  if (!price) {
    return res.status(400).json({
      message: "Please provide a price.",
    });
  }

  const result = products.filter(
    (product) => product.price < price
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No products found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/products/price?price=60000*/ 
/*------------------------------------------------*/

// 6. products with rating greater than or equal to a given rating
app.get("/products/rating", (req, res) => {
  const rating = Number(req.query.rating);

  if (!rating) {
    return res.status(400).json({
      message: "Please provide a rating.",
    });
  }

  const result = products.filter(
    (product) => product.rating >= rating
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No products found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/products/rating?rating=4.8*/ 
/*------------------------------------------------*/

// 7. unavailable products
app.get("/products/unavailable", (req, res) => {

  const result = products.filter(
    (product) => product.stock === 0
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No unavailable products found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/products/unavailable*/ 
/*------------------------------------------------*/


// 8. display using id
app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
