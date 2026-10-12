"use strict";
function createUser(name, role = "user", isActive = true) {
    console.log(`${name} (${role},active: ${isActive})`);
}
console.log(createUser("Alice"));
console.log(createUser("Bob", "admin"));
console.log(createUser("Charlie", "moderator", false));
