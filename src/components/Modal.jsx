import Button from "./Button";

function Modal({ handleDifficultyClick, closeModal, isModalOpen, text }) {
  return (
    <>
      <p>
        Click as many Pokémon as you can without choosing the same one twice!
      </p>
      {isModalOpen && (
        <div className="modal">
          <h3 onClick={closeModal}>{text}</h3>
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
        </div>
      )}
    </>
  );
}

export default Modal;
