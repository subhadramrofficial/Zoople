const students = [
  { name: "Ali", marks: 85 },
  { name: "Sara", marks: 45 },
  { name: "John", marks: 92 },
  { name: "Emma", marks: 67 },
];
let grade = students.map(function (stud) {
  if (stud.marks > 85) return "A";
  else if (stud.marks > 67) return "B";
  else return "C";
});
console.log(grade);
