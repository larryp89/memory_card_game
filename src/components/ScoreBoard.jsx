function ScoreBoard({ score, bestScore }) {
  return (
    <>
      <div className="score-board">
        <h2>Current score: {score}</h2>
        <h2>Best score: {bestScore}</h2>
      </div>
    </>
  );
}

export default ScoreBoard;