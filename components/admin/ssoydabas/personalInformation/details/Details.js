import React from "react";
import styles from "./Details.module.css";

import ExternalLinks from "./externalLinks/ExternalLinks";

function Details() {
  return (
    <div className={styles["details"]}>
      <ExternalLinks />
      <div className={styles["contacts"]}>
        <div>
          <label htmlFor="mobile">Mobile</label>
          <div>+90 542 899 50 24</div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <div>ssoydabas41@gmail.com</div>
        </div>
      </div>
      <div className={styles["expertise"]}>
        <label>Expertise</label>
        <div className={styles["expertise-details"]}>
          <div className={styles["FE"]}>
            <div className={styles["title"]}>Front End</div>
            <li>React JS</li>
            <li>Next JS</li>
            <li>CSS3</li>
            <li className="invisible">placeholder</li>
            <li className="invisible">placeholder</li>
          </div>
          <div className={styles["BE"]}>
            <div className={styles["title"]}>Back End</div>
            <li>Node JS</li>
            <li>Express JS</li>
            <li>Mongo DB</li>
            <li>GIT</li>
            <li>Linux/Ubuntu</li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
