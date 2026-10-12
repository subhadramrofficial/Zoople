type Address = {
  city: string;
  country: string;
};

type Employee = {
  name: string;
  department: string;
  address: Address;
};

function summarize(employees: Employee[]): void {
  employees.forEach((emp) => {
    console.log(emp.name + "(" + emp.department + ")-" + emp.address.city);
  });
}
const team: Employee[] = [
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
