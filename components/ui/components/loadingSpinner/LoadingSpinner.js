import React from "react";
import styles from "../../styles/LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={`${styles["loading-spinner"]}`}>
      <div className={styles["load"]}>
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
