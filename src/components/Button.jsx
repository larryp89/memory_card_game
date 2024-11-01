import "../styles.css/Button.css";
function Button({ id, className, text, handleClick }) {
  return (
    <button id={id} className={className} onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;
