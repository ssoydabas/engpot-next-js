import React, { Fragment } from "react";
import styles from "./AddLesson.module.css";

import Backdrop from "../../../ui/components/backdrop/Backdrop";

function AddLesson(props) {
  const { setAddLesson } = props;

  const cancelAddition = () => {
    setAddLesson(null);
  };

  return (
    <Fragment>
      <Backdrop onClick={cancelAddition} />
      <div className={styles["add-lesson"]}>
        
      </div>
    </Fragment>
  );
}

export default AddLesson;
