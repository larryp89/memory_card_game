import { useState, useEffect } from "react";
import "../styles.css/Card.css";

// Returns a pokemon card
function Card({ pokemonName, pokemonImage, handleClick }) {
  return (
    <>
      <div
        className="pokemon-card"
        id={pokemonName}
        onClick={() => handleClick(pokemonName)}
      >
        <img src={pokemonImage} alt={pokemonName} />
        <p>{pokemonName}</p>
      </div>
    </>
  );
}

export default Card;
