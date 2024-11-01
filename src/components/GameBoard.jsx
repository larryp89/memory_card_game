import "../styles.css/GameBoard.css";
import Card from "./Card";
import ScoreBoard from "./ScoreBoard";
import Button from "./Button";

function GameBoard({
  pokemonData,
  handleClick,
  resetBoard,
  score,
  bestScore,
  flipped,
  handleDifficultyClick,
}) {
  return (
    <>
      <ScoreBoard score={score} bestScore={bestScore} />
      <Button
        className="button"
        text="Easy"
        handleClick={handleDifficultyClick}
      />
      <Button
        className="button"
        text="Medium"
        handleClick={handleDifficultyClick}
      />
      <Button
        className="button"
        text="Hard"
        handleClick={handleDifficultyClick}
      />
      <Button
        className="button"
        text="Insane"
        handleClick={handleDifficultyClick}
      />

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
      <button className="difficulty-button" onClick={resetBoard}>Reset</button>
    </>
  );
}

export default GameBoard;
