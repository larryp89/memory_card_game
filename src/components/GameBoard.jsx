import "../styles.css/GameBoard.css";
import Card from "./Card";
function GameBoard({ pokemonData, handleClick, resetBoard }) {
  return (
    <div className="gameboard">
      {pokemonData.map((pokemon) => (
        <Card
          key={pokemon.name}
          pokemonName={pokemon.name}
          pokemonImage={pokemon.image}
          handleClick={handleClick}
        />
      ))}
      <button onClick={resetBoard}>Reset</button>
    </div>
  );
}

export default GameBoard;
