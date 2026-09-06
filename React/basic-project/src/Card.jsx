import React from "react";

function Card() {
  console.log("Running!");
  return (
    <div style={{ border: "1px solid black", padding: "10px",margin:"10px" }}>
      <h3>Product Title</h3>
      <p>Price: $1000</p>
    </div>
  );
}

export default Card;