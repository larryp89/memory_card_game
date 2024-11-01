import Button from "./Button";
import "../styles.css/Modal.css";

function Modal({ handleDifficultyClick, closeModal, isModalOpen, text }) {
  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <h2>
              Click as many Pokémon as you can without choosing the same one
              twice!
            </h2>
            <h3>{text}</h3>
            <Button
              id="Easy"
              className="button"
              text="Easy"
              handleClick={handleDifficultyClick}
            />
            <Button
              id="Medium"
              className="button"
              text="Medium"
              handleClick={handleDifficultyClick}
            />
            <Button
              id="Hard"
              className="button"
              text="Hard"
              handleClick={handleDifficultyClick}
            />
            <Button
              id="Insane"
              className="button"
              text="Insane"
              handleClick={handleDifficultyClick}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
