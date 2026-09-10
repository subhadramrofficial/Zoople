import React from "react";

function StudentCard({ name, course }) {
  return (
    <div className="border p-r rounded-lg">
      <h2 className="text-xl font-bold">{name}</h2>
      <p>{course}</p>
    </div>
  );
}

function App() {
  const students = [
    { name: "Arun", course: "MERN" },
    { name: "Rahul", course: "MERN" },
    { name: "Meera", course: "React" },
  ];
  return (
    <div>
      <h1>Students</h1>
      {students.map((student) => (
        <StudentCard name={student.name} course={student.course} />
      ))}
    </div>
  );
}

export default App;
