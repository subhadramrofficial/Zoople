"use strict";
function summarize(employees) {
    employees.forEach((emp) => {
        console.log(emp.name + "(" + emp.department + ")-" + emp.address.city);
    });
}
const team = [
    {
        name: "Alice",
        department: "Engineering",
        address: { city: "Berlin", country: "DE" },
    },
    {
        name: "Bob",
        department: "Design",
        address: { city: "Lisbon", country: "PT" },
    },
];
summarize(team);
