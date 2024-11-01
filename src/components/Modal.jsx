import Button from "./Button";

function Modal({ handleDifficultyClick, closeModal, isModalOpen, text }) {
  return (
    <>
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
