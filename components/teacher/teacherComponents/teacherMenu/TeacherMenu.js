import { useState } from "react";
import styles from "./TeacherMenu.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Button from "../../../ui/components/button/Button.js";

import SingleGear from "../../../../public/svg/SingleGear.js";

function TeacherMenu({
  selectedStudent,
  setSelectStudentMode,
  setDisplayActionForm,
  historyMode,
  toggleHistoryMode,
  isMobile,
}) {
  const [noAnimation, setNoAnimation] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const hasPlannedLesson =
    selectedStudent && selectedStudent.engPotInfo.nextLesson.hasPlannedLesson
      ? true
      : false;

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
        className={`${styles["teacher-menu"]} ${
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
                setSelectStudentMode(true);
                setShowMenu(false);
              }}
            >
              Select Student
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
                setDisplayActionForm("lesson");
                setShowMenu(false);
              }}
            >
              {hasPlannedLesson ? "Conclude Lesson" : "Plan Lesson"}
            </Button>
          </div>
          <div
            className={`${styles["button-wrapper"]} ${
              noAnimation && styles["no-animation"]
            }`}
          >
            <Button
              onClick={() => {
                setDisplayActionForm("assignment");
                setShowMenu(false);
              }}
            >
              Assign Task
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

export default TeacherMenu;
