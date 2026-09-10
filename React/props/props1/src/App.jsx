// import React from "react";

// function UserCard({ name, role }) {
//   return (
//     <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
//       <h2>{name}</h2>
//       <p>{role}</p>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div>
//       <UserCard name="Syam" role="Software Developer" />
//       <UserCard name="Hasna" role="Mern  Developer" />
//       <UserCard name="Hari" role="UI/Ux Designer" />
//       <UserCard name="Alan" role="Software Testing" />
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";

function UserCard({ name, role, changeRole }) {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px"
      }}
    >
      <h2>{name}</h2>
      <p>{role}</p>

      <button onClick={() => changeRole("Senior Developer")}>
        Change Role
      </button>
    </div>
  );
}

function App() {
  const [role, setRole] = useState("Software Developer");

  return (
    <div>
      <UserCard
        name="Syam"
        role={role}
        changeRole={setRole}
      />
    </div>
  );
}

export default App;