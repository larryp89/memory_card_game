import "../styles.css/GameBoard.css";
import Card from "./Card";
import ScoreBoard from "./ScoreBoard";
function GameBoard({
  pokemonData,
  handleClick,
  resetBoard,
  score,
  bestScore,
}) {
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
          />
        ))}
      </div>
      <button onClick={resetBoard}>Reset</button>
    </>
  );
}

export default GameBoard;
