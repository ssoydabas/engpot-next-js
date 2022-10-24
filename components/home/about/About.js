import styles from "./About.module.css";

import { useState } from "react";

import Container from "react-bootstrap/Container";

import Engpot from "./engpot/Engpot";
import Sertan from "./sertan/Sertan";

function About() {
  const [about, setAbout] = useState("engpot");

  return (
    <Container fluid className={styles["about"]}>
      <div className={styles["about-toggler"]}>
        <div
          className={about === "engpot" ? styles["about-active"] : ""}
          onClick={setAbout.bind(null, "engpot")}
        >
          EngPot
        </div>
        <div
          className={about === "sertan" ? styles["about-active"] : ""}
          onClick={setAbout.bind(null, "sertan")}
        >
          Sertan
        </div>
      </div>
      {about === "engpot" && <Engpot />}
      {about === "sertan" && <Sertan />}
    </Container>
  );
}

export default About;
