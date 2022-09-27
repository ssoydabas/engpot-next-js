import React from "react";
import styles from "./Schedule.module.css";

function Schedule(props) {
  return (
    <div className={styles["schedule"]}>
      <div className={styles["header"]}>
        <div>←</div>
        <div>→</div>
      </div>
      {/* <Board /> */}
      <div className={styles["footer"]}>
        <div>Clean All</div>
      </div>
    </div>
  );
}

export default Schedule;
