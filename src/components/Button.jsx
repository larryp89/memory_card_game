function Button({ text, handleClick }) {
  return (
    <>
      <button id={text} onClick={handleClick}>
        {text}
      </button>
    </>
  );
}

export default Button;
