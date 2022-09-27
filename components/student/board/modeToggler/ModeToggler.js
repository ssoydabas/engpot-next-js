import React, { Fragment } from "react";
import styles from "./ModeToggler.module.css";

function ModeToggler(props) {
  const { student } = props;
  const { text } = props;
  const { onClick } = props;

  return (
    <Fragment>
      {student && (
        <div className={styles["mode-toggler"]} onClick={onClick}>
          {text}
        </div>
      )}
    </Fragment>
  );
}

export default ModeToggler;
