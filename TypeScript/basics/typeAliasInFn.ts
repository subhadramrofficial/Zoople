type User = {
  name: string;
  age: number;
};
function greetUser(user: User): string {
  return "Hello, " + user.name + "! Your are " + user.age + " years old";
}
const alice: User = { name: "Alice", age: 28 };
console.log(greetUser(alice));
