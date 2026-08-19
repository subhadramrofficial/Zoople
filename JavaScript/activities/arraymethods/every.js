const students = [
  { name: "Ali", marks: 85 },
  { name: "Sara", marks: 45 },
  { name: "John", marks: 92 },
  { name: "Abel", marks: 35 },
  { name: "Emma", marks: 67 },
];
let all = students.every((stud) => stud.marks > 45);
console.log(all);
