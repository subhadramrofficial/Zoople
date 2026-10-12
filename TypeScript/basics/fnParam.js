"use strict";
function displayUser(user) {
    console.log(user.name.toUpperCase());
    console.log("Age: " + user.age);
}
displayUser({ name: "Alice", age: 28 });
displayUser({ name: "Bob", age: 30 });
