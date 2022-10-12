import React from "react";
import styles from "./DetailScreen.module.css";

import ForRecruiters from "./conciseIntro/ConciseIntro";
import Education from "./education/Education";
import Experience from "./experience/Experience";
import Motivation from "./motivation/Motivation";

function DetailScreen(props) {
  const { screenMode } = props;

  return (
    <div className={`${styles["detail-screen"]} scroll`}>
      {screenMode === 1 && <ForRecruiters />}
      {screenMode === 2 && <Education />}
      {screenMode === 3 && <Experience />}
      {screenMode === 4 && <Motivation />}
    </div>
  );
}

export default DetailScreen;
