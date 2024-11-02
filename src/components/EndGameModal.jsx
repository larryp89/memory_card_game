import "../styles/EndGameModal.css";
import Button from "./Button";

function EndGameModal({ closeEndGameModal, isWinner }) {
  return (
    isWinner !== null && (
      <div className="end-game-modal-overlay">
        <div className="end-game-modal">
          {isWinner === true && (
            <>
              <h1>You Win!</h1>
              <Button
                id="play-again"
                className="button"
                text="Play again?"
                handleClick={closeEndGameModal}
              />
            </>
          )}
          {isWinner === false && (
            <>
              <h1>Sucks to suck!</h1>
              <Button
                id="play-again"
                className="button"
                text="Play again?"
                handleClick={closeEndGameModal}
              />
            </>
          )}
        </div>
      </div>
    )
  );
}

export default EndGameModal;
