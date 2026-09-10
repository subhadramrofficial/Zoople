///-----------NUMBERS-----------///
// import { useState } from "react";
// function App() {
//   const [count, setCount] = useState(0);
//   const increaseCount = () => {
//     setCount(count + 1);
//   };
//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={increaseCount}>Increase</button>
//     </div>
//   );
// }
// export default App;

///------------STRING-------------////
// import { useState } from "react";
// function App() {
//   const [name, setName] = useState("");
//   return (
//     <div>
//       <h1>Name:{name}</h1>
//       <button onClick={() => setName("Arun")}>Show your name</button>
//     </div>
//   );
// }
// export default App;

///-------------BOOLEAN------------///
// import { useState } from "react";
// function App() {
//   const [isOn, setIsOn] = useState(false);
//   const changeIsOn = () => {
//     setIsOn(!isOn);
//   };
//   return (
//     <div>
//       <h1>Toggle Example</h1>
//       <p>Status:{isOn ? "ON" : "OFF"}</p>
//       <button onClick={changeIsOn}>Toggle</button>
//     </div>
//   );
// }
// export default App;

////---------ARRAY-----------/////
// import { useState } from "react";
// function App() {
//   const [students, setStudents] = useState([]);
//   return (
//     <div>
//       <button onClick={() => setStudents(["Arun", "Rahul", "Meera"])}>
//         Show Students
//       </button>
//       {students.map((student) => (
//         <p>{student}</p>
//       ))}
//     </div>
//   );
// }
// export default App

///------OBJECTS------//////
// import { useState } from "react";
// function App() {
//   const [user, setUser] = useState({ name: "Arun", age: 22 });
//   const changeUser = () => {
//     setUser({ name: "Rahul", age: 25 });
//   };
//   return (
//     <div>
//       <h1>{user.name}</h1>
//       <p>Age:{user.age}</p>
//       <button onClick={changeUser}>Change User</button>
//     </div>
//   );
// }
// export default App;

/////------------MULTIPLE USESTATES-------///////
// import { useState } from "react";
// function App() {
//   const [name, setName] = useState("Arun");
//   const [age, setAge] = useState(22);
//   const changeName = () => {
//     setName("Rahul");
//   };
//   const changeAge = () => {
//     setAge(age + 1);
//   };
//   return (
//     <div>
//       <h1>{name}</h1>
//       <p>Age:{age}</p>
//       <button onClick={changeName}>Change Name</button>
//       <button onClick={changeAge}>Change Age</button>
//     </div>
//   );
// }
// export default App;

/////-------COUNTER-------------///
// import { useState } from "react";
// function App() {
//   const [counter, setCounter] = useState(0);
//   const Increment = () => {
//     setCounter(counter + 1);
//   };
//   const Decrement = () => {
//     setCounter(counter - 1);
//   };
//   return (
//     <div>
//       <h1>{counter}</h1>
//       <button onClick={Increment}>+</button>
//       <button onClick={Decrement}>-</button>
//     </div>
//   );
// }

// export default App;

///////----REAL-TIME VALUE CHANGE-----//////
// import { useState } from "react";

// function App() {
//   const [text, setText] = useState("");
//   const handleChange = (event) => {
//     setText(event.target.value);
//   };
//   return (
//     <div>
//       <input type="text" value={text} onChange={handleChange} />
//       <p>Hello {text}</p>
//     </div>
//   );
// }

// export default App;
