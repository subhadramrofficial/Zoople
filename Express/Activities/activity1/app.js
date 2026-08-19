const express = require("express");
const app = express();
const PORT = 3000;

/*temp db*/
const students = [
  {
    id: 1,
    name: "John",
    age: 20,
    course: "MERN",
    city: "Kochi",
  },
  {
    id: 2,
    name: "Aisha",
    age: 22,
    course: "Python",
    city: "Calicut",
  },
  {
    id: 3,
    name: "Rahul",
    age: 19,
    course: "Flutter",
    city: "Thrissur",
  },
  {
    id: 4,
    name: "John",
    age: 24,
    course: "Python",
    city: "Kochi",
  },
  {
    id: 5,
    name: "Anjaly",
    age: 21,
    course: "MERN",
    city: "Kannur",
  },
  {
    id: 6,
    name: "Arun",
    age: 23,
    course: "Flutter",
    city: "Calicut",
  },
  {
    id: 7,
    name: "Fathima",
    age: 18,
    course: "Python",
    city: "Kochi",
  },
  {
    id: 8,
    name: "Nikhil",
    age: 26,
    course: "MERN",
    city: "Palakkad",
  },
  {
    id: 9,
    name: "Sneha",
    age: 25,
    course: "Flutter",
    city: "Thrissur",
  },
  {
    id: 10,
    name: "John",
    age: 27,
    course: "MERN",
    city: "Calicut",
  },
];

/*Routes*/
app.get("/", (req, res) => {
  res.send("Student Management API");
});

// 1. get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// 3. search student by name
app.get("/students/search", (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json({
      message: "Please provide a student name.",
    });
  }

  const result = students.filter(
    (student) => student.name.toLowerCase() === name.toLowerCase(),
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No students found.",
    });
  }

  res.json(result);
});

// 4. filter by course
app.get("/students/course", (req, res) => {
  const course = req.query.course;

  if (!course) {
    return res.status(400).json({
      message: "Please provide a course.",
    });
  }

  const result = students.filter(
    (student) => student.course.toLowerCase() === course.toLowerCase(),
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No students found.",
    });
  }

  res.json(result);
});

// 5. filter by city
app.get("/students/city", (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({
      message: "Please provide a city.",
    });
  }

  const result = students.filter(
    (student) => student.city.toLowerCase() === city.toLowerCase(),
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "No students found.",
    });
  }

  res.json(result);
});

// 6. students older
app.get("/students/age", (req, res) => {
  const age = Number(req.query.age);

  if (!age) {
    return res.status(400).json({
      message: "Please provide an age.",
    });
  }

  const result = students.filter((student) => student.age > age);

  if (result.length === 0) {
    return res.status(404).json({
      message: "No students found.",
    });
  }

  res.json(result);
});

// 2. get student by id
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.json(student);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
