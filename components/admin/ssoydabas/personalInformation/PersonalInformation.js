import React from "react";
import styles from "./PersonalInformation.module.css";

import Picture from "./picture/Picture";
import Details from "./details/Details";

function PersonalInformation() {
  return (
    <div className={styles["personal-information"]}>
      <div className={styles["image-wrapper"]}>
        <Picture />
      </div>
      <Details />
    </div>
  );
}

export default PersonalInformation;
