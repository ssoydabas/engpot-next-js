import React, { useState } from "react";
import styles from "./Screen.module.css";

import DetailScreen from "./detailScreen/DetailScreen";

function Screen() {
  const [screenMode, setScreenMode] = useState(1);

  return (
    <div className={styles["screen"]}>
      <div className={styles["screen-menu"]}>
        <div
          className={screenMode === 1 ? styles["active"] : ""}
          onClick={setScreenMode.bind(null, 1)}
        >
          Concise Intro
        </div>
        <div
          className={screenMode === 2 ? styles["active"] : ""}
          onClick={setScreenMode.bind(null, 2)}
        >
          Education
        </div>
        <div
          className={screenMode === 3 ? styles["active"] : ""}
          onClick={setScreenMode.bind(null, 3)}
        >
          Experience
        </div>
        <div
          className={screenMode === 4 ? styles["active"] : ""}
          onClick={setScreenMode.bind(null, 4)}
        >
          Motivation
        </div>
      </div>
      <DetailScreen screenMode={screenMode} />
    </div>
  );
}

export default Screen;
