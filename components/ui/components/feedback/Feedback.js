import React from "react";
import styles from "./Feedback.module.css";

import Backdrop from "../backdrop/Backdrop";
import Button from "../button/Button";

function Feedback({ feedbackMessage, onClick }) {
  return (
    <>
      <Backdrop onClick={onClick} />
      <div className={styles["feedback"]}>
        <div className={styles["text"]}>{feedbackMessage}</div>
        <Button type="button" onClick={onClick}>
          Okay
        </Button>
      </div>
    </>
  );
}

export default Feedback;
