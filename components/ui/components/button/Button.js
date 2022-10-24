function Button({ children, type, classes, onClick }) {
  return (
    <button
      type={type ? type : "button"}
      className={classes ? `button ${classes}` : "button"}
      onClick={onClick ? onClick : null}
    >
      {children}
    </button>
  );
}

export default Button;
