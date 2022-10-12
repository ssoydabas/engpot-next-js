import React from "react";
import styles from "./SertanSoydabas.module.css";

import PersonalInformation from "./personalInformation/PersonalInformation";
import Screen from "./screen/Screen";

function SertanSoyadabas() {
  return (
    <div className={styles["main-container"]}>
      <PersonalInformation />
      <Screen />
    </div>
  );
}

export default SertanSoyadabas;
