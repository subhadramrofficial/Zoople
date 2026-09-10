import React from "react";

function StudentCard({ name, course,id }) {
  return (
    <div className="border p-r rounded-lg">
      <p>{id}</p>
      <h2 className="text-xl font-bold">{name}</h2>
      <p>{course}</p>
    </div>
  );
}

function App() {
  const students = [
    { id: 1, name: "Arun", course: "MERN" },
    { id: 2, name: "Rahul", course: "MERN" },
    { id: 3, name: "Meera", course: "React" },
  ];
  return (
    <div>
      <h1>Students</h1>
      {students.map((student) => (
        <StudentCard
          key={student.id}
          id={student.id}
          name={student.name}
          course={student.course}
        />
      ))}
    </div>
  );
}

export default App;
