import ComponentC from "./ComponentC.jsx";

function ComponentB() {
  return (
    <div className="box">
      <h1>ComponentA</h1>
      <ComponentC />
    </div>
  );
}

export default ComponentB;
