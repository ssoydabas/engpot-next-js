import React, { useState } from "react";
import styles from "./ExternalLinks.module.css";

function ExternalLinks() {
  const [showExternalLink, setShowExternalLink] = useState("linkedIn");

  return (
    <div className={styles["external-links"]}>
      <div className={styles["links-menu"]}>
        <div
          className={`${
            showExternalLink === "linkedIn" ? styles["active"] : ""
          }`}
          onClick={setShowExternalLink.bind(null, "linkedIn")}
        >
          LinkedIn
        </div>
        <div
          className={`${showExternalLink === "gitHub" ? styles["active"] : ""}`}
          onClick={setShowExternalLink.bind(null, "gitHub")}
        >
          GitHub
        </div>
      </div>
      <a
        href={
          showExternalLink === "linkedIn"
            ? "https://www.linkedin.com/in/ssoydabas/"
            : "https://github.com/ssoydabas"
        }
        target="_blank"
        rel="noreferer"
        className={styles["link"]}
      >
        {showExternalLink === "linkedIn"
          ? "LinkedIn/ssoydabas"
          : "GitHub/ssoydabas"}
      </a>
    </div>
  );
}

export default ExternalLinks;
