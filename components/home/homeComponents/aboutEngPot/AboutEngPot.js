import React from "react";
import styles from "./AboutEngPot.module.css";

import Image from "next/image";

import Button from "../../../ui/components/button/Button";

function AboutEngPot() {
  return (
    <div className={styles["about-engpot"]}>
      <div>
        What is <span>EngPot English</span>?
      </div>
      <div>
        <div>
          We teach English, Programming, Coding, and many more! If you want to
          learn more
        </div>
        <Button classes="button--white" type="button" text="Visit" />
      </div>
      {/* <Image src="" alt="EngPot English Official Logo" /> */}
    </div>
  );
}

export default AboutEngPot;
