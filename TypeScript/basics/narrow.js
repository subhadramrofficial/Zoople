"use strict";
function doubleOrShout(value) {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    else {
        return String(value * 2);
    }
}
console.log(doubleOrShout("Hello"));
console.log(doubleOrShout(20));
