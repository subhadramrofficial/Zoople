const express = require("express");
const app = express();

app.get("/students/:id", (req, res) => {
  // Route Parameter
  const studentId = req.params.id;

  // Query Parameters
  const course = req.query.course;
  const year = req.query.year;

  res.json({
    studentId: studentId,
    course: course,
    year: year,
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
