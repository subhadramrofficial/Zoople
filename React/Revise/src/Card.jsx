import ProfilePng from "./assets/Zoople.png";

function Card() {
  return (
    <div className="card">
      <img className="card-image" src={ProfilePng} alt="Profile Picture" />
      <h2 className="card-title">Zoople</h2>
      <p className="card-text">Mern Stack Development</p>
    </div>
  );
}

export default Card;
