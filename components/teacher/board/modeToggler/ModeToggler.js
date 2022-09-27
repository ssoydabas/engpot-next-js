import React, { Fragment } from "react";
import styles from "./ModeToggler.module.css";

function ModeToggler(props) {
  const { text } = props;
  const { onClick } = props;
  const { chosenStudent } = props;

  return (
    <Fragment>
      {chosenStudent && (
        <div className={styles["mode-toggler"]} onClick={onClick}>
          {text}
        </div>
      )}
    </Fragment>
  );
}

export default ModeToggler;
