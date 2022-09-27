import React from "react";
import styles from "../../styles/Error.module.css";

import Button from "../button/Button";

function Error(props) {
  return (
    <div className={styles["error"]}>
      <div className={styles["text"]}>{props.text}</div>
      <Button
        classes="button--white"
        type="button"
        text="Okay"
        onClick={props.onClick}
      />
    </div>
  );
}

export default Error;
