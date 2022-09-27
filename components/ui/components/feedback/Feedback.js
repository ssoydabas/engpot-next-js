import React from "react";
import styles from "../../styles/Feedback.module.css";

import Button from "../button/Button";

function Feedback(props) {
  return (
    <div className={styles["feedback"]}>
      <div className={styles["text"]}>{props.feedbackMessage}</div>
      <Button
        classes="button--white"
        type="button"
        text="Okay"
        onClick={props.onClick}
      />
    </div>
  );
}

export default Feedback;
