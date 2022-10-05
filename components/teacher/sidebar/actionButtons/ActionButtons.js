import React from "react";
import styles from "./ActionButtons.module.css";

import Button from "../../../ui/components/button/Button";

function ActionButtons(props) {
  const { chosenStudent } = props;
  const { setDisplayActionForm } = props;
  const { setActionFormMode } = props;
  const { setDisplayMobileSidebar } = props;

  const setTeacherActionForm = (mode) => {
    setDisplayActionForm(true);
    setActionFormMode(mode);
    setDisplayMobileSidebar(false);
  };

  return (
    <div className={`${styles["teacher-action-buttons"]} card highlight--dark`}>
      <Button
        classes="button--white"
        type="button"
        text={
          chosenStudent.engPotInfo.nextLesson.hasPlannedLesson
            ? "Conclude"
            : "Plan"
        }
        onClick={setTeacherActionForm.bind(null, "lesson")}
      />
      <Button
        classes="button--white"
        type="button"
        text="Assign Task"
        onClick={setTeacherActionForm.bind(null, "assignment")}
      />
    </div>
  );
}

export default ActionButtons;
