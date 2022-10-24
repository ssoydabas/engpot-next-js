import { useState } from "react";
import styles from "./StudentMenu.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Button from "../../../ui/components/button/Button";

import SingleGear from "../../../../public/svg/SingleGear";

function StudentMenu({ student, historyMode, toggleHistoryMode, setDisplayStatistics }) {
  const [noAnimation, setNoAnimation] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className={styles["menu-button"]}>
        <SingleGear
          className={`${showMenu && styles["rotated"]}`}
          onClick={() => {
            setShowMenu(!showMenu);
            setNoAnimation(false);
          }}
        />
      </div>

      <Container
        className={`${styles["student-menu"]} ${
          showMenu ? styles["animation-in"] : styles["animation-out"]
        } ${noAnimation && styles["no-animation"]}`}
      >
        <Row className={styles["row"]}>
          <div
            className={`${styles["button-wrapper"]} ${
              noAnimation && styles["no-animation"]
            }`}
          >
            <Button
              onClick={() => {
                setDisplayStatistics(true);
                setShowMenu(false);
              }}
            >
              Statistics
            </Button>
          </div>
        </Row>
        <Row className={styles["row"]}>
          <div
            className={`${styles["button-wrapper"]} ${
              noAnimation && styles["no-animation"]
            } invisible`}
          >
            <Button
              onClick={() => {
                setShowMenu(false);
              }}
            >
              XXXX
            </Button>
          </div>
          <div
            className={`${styles["button-wrapper"]} ${
              noAnimation && styles["no-animation"]
            } invisible`}
          >
            <Button
              onClick={() => {
                setShowMenu(false);
              }}
            >
              XXXX
            </Button>
          </div>
        </Row>
        <Row className={styles["row"]}>
          <div
            className={`${styles["button-wrapper"]} ${
              noAnimation && styles["no-animation"]
            }`}
          >
            <Button
              onClick={() => {
                toggleHistoryMode();
                setShowMenu(false);
              }}
            >
              Show {historyMode === "lesson" ? "Assignments" : "Lessons"}
            </Button>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default StudentMenu;
