"use strict";
function greetUser(user) {
    return "Hello, " + user.name + "! Your are " + user.age + " years old";
}
const alice = { name: "Alice", age: 28 };
console.log(greetUser(alice));
