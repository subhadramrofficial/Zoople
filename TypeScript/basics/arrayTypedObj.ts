type User = {
  name: string;
  age: number;
};

const users: User[] = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 31 },
];
users.forEach((user) => {
  console.log(user.name + " is " + user.age);
});
