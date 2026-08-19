const express = require("express");
const app = express();
const PORT = 3000;
const movies = [
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    language: "English",
    rating: 8.8,
  },
  {
    id: 2,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    language: "English",
    rating: 8.7,
  },
  {
    id: 3,
    title: "Drishyam",
    genre: "Thriller",
    year: 2013,
    language: "Malayalam",
    rating: 8.6,
  },
  {
    id: 4,
    title: "Premam",
    genre: "Romance",
    year: 2015,
    language: "Malayalam",
    rating: 8.3,
  },
  {
    id: 5,
    title: "Leo",
    genre: "Action",
    year: 2023,
    language: "Tamil",
    rating: 7.4,
  },
  {
    id: 6,
    title: "Jailer",
    genre: "Action",
    year: 2023,
    language: "Tamil",
    rating: 7.8,
  },
  {
    id: 7,
    title: "KGF Chapter 2",
    genre: "Action",
    year: 2022,
    language: "Kannada",
    rating: 8.4,
  },
  {
    id: 8,
    title: "Baahubali",
    genre: "Action",
    year: 2015,
    language: "Telugu",
    rating: 8.0,
  },
  {
    id: 9,
    title: "3 Idiots",
    genre: "Comedy",
    year: 2009,
    language: "Hindi",
    rating: 8.4,
  },
  {
    id: 10,
    title: "Dangal",
    genre: "Drama",
    year: 2016,
    language: "Hindi",
    rating: 8.3,
  },
  {
    id: 11,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    language: "English",
    rating: 9.0,
  },
  {
    id: 12,
    title: "Avengers: Endgame",
    genre: "Action",
    year: 2019,
    language: "English",
    rating: 8.4,
  },
  {
    id: 13,
    title: "Titanic",
    genre: "Romance",
    year: 1997,
    language: "English",
    rating: 7.9,
  },
  {
    id: 14,
    title: "Minnal Murali",
    genre: "Superhero",
    year: 2021,
    language: "Malayalam",
    rating: 8.0,
  },
  {
    id: 15,
    title: "Pushpa",
    genre: "Action",
    year: 2021,
    language: "Telugu",
    rating: 7.6,
  },
];

// 1. display all movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

// 2. search movies by title
app.get("/movies/search", (req, res) => {
  const title = req.query.title;

  if (!title) {
    return res.status(400).json({
      message: "Please provide a movie title.",
    });
  }

  const result = movies.filter(
    (movie) => movie.title.toLowerCase() === title.toLowerCase(),
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No movies found.",
    });
  }

  res.json(result);
});

/*URL: http://localhost:3000/movies/search?title=Inception*/

/*------------------------------------------------*/

// 3. display movies by genre
app.get("/movies/genre", (req, res) => {
  const genre = req.query.genre;

  if (!genre) {
    return res.status(400).json({
      message: "Please provide a genre.",
    });
  }

  const result = movies.filter(
    (movie) => movie.genre.toLowerCase() === genre.toLowerCase(),
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No movies found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/movies/genre?genre=Action*/

/*------------------------------------------------*/

// 4. display movies by year
app.get("/movies/year", (req, res) => {
  const year = Number(req.query.year);

  if (!year) {
    return res.status(400).json({
      message: "Please provide a year.",
    });
  }

  const result = movies.filter((movie) => movie.year === year);

  if (result.length === 0) {
    return res.status(404).json({
      message: "No movies found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/movies/year?year=2023*/

/*------------------------------------------------*/

// 5. display movies with rating greater than or equal to a given value
app.get("/movies/rating", (req, res) => {
  const rating = Number(req.query.rating);

  if (!rating) {
    return res.status(400).json({
      message: "Please provide a rating.",
    });
  }

  const result = movies.filter((movie) => movie.rating >= rating);

  if (result.length === 0) {
    return res.status(404).json({
      message: "No movies found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/movies/rating?rating=8.5*/

/*------------------------------------------------*/

// 6. display movies by language
app.get("/movies/language", (req, res) => {
  const language = req.query.language;

  if (!language) {
    return res.status(400).json({
      message: "Please provide a language.",
    });
  }

  const result = movies.filter(
    (movie) => movie.language.toLowerCase() === language.toLowerCase(),
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No movies found.",
    });
  }

  res.json(result);
});
/*URL: http://localhost:3000/movies/language?language=Malayalam*/

/*------------------------------------------------*/

// 7. display movies by id
app.get("/movies/:id", (req, res) => {
  const id = Number(req.params.id);

  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found",
    });
  }

  res.json(movie);
});
/*URL: http://localhost:3000/movies/5*/

/*------------------------------------------------*/

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
