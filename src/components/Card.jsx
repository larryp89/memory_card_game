import { useState, useEffect } from "react";

// Returns a pokemon card
function Card({ pokemonName, pokemonImage }) {
  return (
    <>
      <div className="pokemon-card">
        <img src={pokemonImage} alt={pokemonName} />
      </div>
    </>
  );
}

export default Card;
