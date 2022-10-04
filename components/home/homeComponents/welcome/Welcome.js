import React from "react";
import styles from "./Welcome.module.css";

import HomeBanner from "./HomeBanner";
import Icons from "./Icons";
import Arrow from "./Arrow";

function Welcome(props) {
  const { scrollToAboutEngPot } = props;

  return (
    <div className={styles["welcome"]}>
      <HomeBanner />
      <Icons />
      <Arrow scrollToAboutEngPot={scrollToAboutEngPot} />
    </div>
  );
}

export default Welcome;
