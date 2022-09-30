import React, { Fragment } from "react";
import styles from "./RemoveLesson.module.css";

import Backdrop from "../../../ui/components/backdrop/Backdrop";

function RemoveLesson(props) {
  const { setRemoveLesson } = props;

  const cancelRemoval = () => {
    setRemoveLesson(null);
  };

  return (
    <Fragment>
      <Backdrop onClick={cancelRemoval} />
      <div className={styles["add-lesson"]}></div>
    </Fragment>
  );
}

export default RemoveLesson;
