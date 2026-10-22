
export type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
};

export const users: Student[] = [
  {
    id: 1,
    name: "Charlie",
    email: "charlie@example.com",
    course: "MERN Stack",
  },
  {
    id: 2,
    name: "David",
    email: "david@example.com",
    course: "Python",
  },
  {
    id: 3,
    name: "Emma",
    email: "emma@example.com",
    course: "React",
  },
];
