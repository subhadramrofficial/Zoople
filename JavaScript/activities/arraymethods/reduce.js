const students = [
  { name: "Ali", marks: 85 },
  { name: "Sara", marks: 45 },
  { name: "John", marks: 92 },
  { name: "Abel", marks: 35 },
  { name: "Emma", marks: 67 },
];
let sum = students.reduce((total, stud) => total + stud.marks, 0);
console.log(sum);
