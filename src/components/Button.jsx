import "../styles.css/Button.css";
function Button({ text, handleClick }) {
  return (
    <>
      <button className="difficulty-button" id={text} onClick={handleClick}>
        {text}
      </button>
    </>
  );
}

export default Button;
