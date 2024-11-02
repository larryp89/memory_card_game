import "../styles/GameBoard.css";
import Card from "./Card";
import ScoreBoard from "./ScoreBoard";

function GameBoard({ pokemonData, handleClick, score, bestScore, flipped }) {
  return (
    <>
      <ScoreBoard score={score} bestScore={bestScore} />

      <div className="gameboard">
        {pokemonData.map((pokemon) => (
          <Card
            key={pokemon.name}
            pokemonName={pokemon.name}
            pokemonImage={pokemon.image}
            handleClick={handleClick}
            flipped={flipped}
          />
        ))}
      </div>
    </>
  );
}

export default GameBoard;
