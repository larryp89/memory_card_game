import "../styles.css/GameBoard.css";
import Card from "./Card";
function GameBoard({ pokemonData, setPokemonData }) {
  return (
    <div className="gameboard">
      {pokemonData.map((pokemon) => (
        <Card
          key={pokemon.name}
          pokemonName={pokemon.name}
          pokemonImage={pokemon.image}
        />
      ))}
    </div>
  );
}

export default GameBoard;
