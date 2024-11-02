import "../styles/Card.css";
import backImage from "../assets/pokemon-card.png";

function Card({ pokemonName, pokemonImage, handleClick, flipped }) {
  return (
    <div className="grid-item">
      <div
        className={`pokemon-card ${flipped ? "show" : ""}`}
        id={pokemonName}
        onClick={() => handleClick(pokemonName)}
      >
        <div className="card-front">
          <img src={pokemonImage} alt={pokemonName} />
          <p>{pokemonName}</p>
        </div>
        <div className="card-back">
          <img src={backImage} alt="Back of pokemon card" />
        </div>
      </div>
    </div>
  );
}

export default Card;
