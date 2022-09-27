import React from "react";
import styles from "./HomeBanner.module.css";

function HomeBanner(props) {
  return (
    <div className={styles["banner"]}>
      <div>
        <span>EngPot English</span>
      </div>
      <div>English Development</div>
      <div>Platform for</div>
      <div>Everyone</div>
    </div>
  );
}

export default HomeBanner;
