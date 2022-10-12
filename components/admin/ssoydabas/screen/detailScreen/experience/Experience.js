import React from "react";
import styles from "./Experience.module.css";

function Experience() {
  return (
    <div className={styles["experience"]}>
      <div className={styles["item"]}>
        <div>EngPot English - English Learning and Teaching Platform</div>
        <div className={styles["responsibilities"]}>
          <div>Responsibilities and qualities:</div>
          <ul>
            <li>Maintaining the   production server</li>
            <li>Developing new features that suits student needs</li>
            <li>Extending and maintaining RestfulAPIs</li>
            <li>Scaling the database when needed</li>
            <li>Being passionate about designing clean performant code.</li>
            <li>Enjoying all things CSS</li>
          </ul>
        </div>
      </div>
      <div className={styles["important-note"]}>
        Currently, I only have experience in my own company EngPot English,
        however, I am actively looking for new opportunities to take part in
        something bigger and greater.
      </div>
    </div>
  );
}

export default Experience;
