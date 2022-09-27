import React from "react";

function Button(props) {
  return (
    <button className={`${props.classes}`} type={props.type} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;
