const express = require("express");
const app = express();
const PORT = 3000;
const books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    price: 450,
    available: true,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Help",
    price: 550,
    available: true,
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    genre: "Finance",
    price: 400,
    available: false,
  },
  {
    id: 4,
    title: "Harry Potter",
    author: "J.K. Rowling",
    genre: "Fantasy",
    price: 650,
    available: true,
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    price: 600,
    available: true,
  },
  {
    id: 6,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    genre: "Self Help",
    price: 500,
    available: false,
  },
  {
    id: 7,
    title: "Ikigai",
    author: "Hector Garcia",
    genre: "Self Help",
    price: 350,
    available: true,
  },
  {
    id: 8,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    price: 480,
    available: true,
  },
  {
    id: 9,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Mystery",
    price: 520,
    available: false,
  },
  {
    id: 10,
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    genre: "Biography",
    price: 300,
    available: true,
  },
  {
    id: 11,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    price: 450,
    available: true,
  },
  {
    id: 12,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    genre: "Self Help",
    price: 580,
    available: true,
  },
  {
    id: 13,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    price: 420,
    available: false,
  },
  {
    id: 14,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    price: 470,
    available: true,
  },
  {
    id: 15,
    title: "Sherlock Holmes",
    author: "Arthur Conan Doyle",
    genre: "Mystery",
    price: 550,
    available: true,
  },
];

// 1. display all books
app.get("/books", (req, res) => {
  res.json(books);
});
/*URL: http://localhost:3000/books*/

/*------------------------------------------------*/

// 2. search books by title
app.get("/books/search", (req, res) => {
  const title = req.query.title;

  if (!title) {
    return res.status(400).json({
      message: "Please provide a book title.",
    });
  }

  const result = books.filter(
    (book) => book.title.toLowerCase() === title.toLowerCase(),
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No books found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/books/search?title=Harry Potter*/

/*------------------------------------------------*/

// 3. display books written by a particular author
app.get("/books/author", (req, res) => {
  const author = req.query.author;

  if (!author) {
    return res.status(400).json({
      message: "Please provide an author.",
    });
  }

  const result = books.filter(
    (book) => book.author.toLowerCase() === author.toLowerCase(),
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No books found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/books/author?author=James Clear*/

/*------------------------------------------------*/

// 4. display books belonging to a specific genre
app.get("/books/genre", (req, res) => {
  const genre = req.query.genre;

  if (!genre) {
    return res.status(400).json({
      message: "Please provide a genre.",
    });
  }

  const result = books.filter(
    (book) => book.genre.toLowerCase() === genre.toLowerCase(),
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No books found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/books/genre?genre=Fantasy*/

/*------------------------------------------------*/

// 5. Display books costing less than a specified price
app.get("/books/price", (req, res) => {
  const price = Number(req.query.price);

  if (!price) {
    return res.status(400).json({
      message: "Please provide a price.",
    });
  }

  const result = books.filter((book) => book.price < price);

  if (result.length === 0) {
    return res.status(404).json({
      message: "No books found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/books/price?price=500*/

/*------------------------------------------------*/

// 6. display only available books
app.get("/books/available", (req, res) => {
  const result = books.filter((book) => book.available === true);

  if (result.length === 0) {
    return res.status(404).json({
      message: "No available books found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/books/available*/

/*------------------------------------------------*/

// 7. display one book using id
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  res.json(book);
});
/*URL: http://localhost:3000/books/5*/

/*------------------------------------------------*/

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
