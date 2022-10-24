import React from "react";
import styles from "./Error.module.css";

import Backdrop from "../backdrop/Backdrop";
import Button from "../button/Button";

function Error({ text, onClick }) {
  return (
    <>
      <Backdrop onClick={onClick} level={"index-10"} />
      <div className={styles["error"]}>
        <div className={styles["text"]}>{text}</div>
        <Button type="button" onClick={onClick}>
          Okay
        </Button>
      </div>
    </>
  );
}

export default Error;
