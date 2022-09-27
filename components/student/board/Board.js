import React, { useState } from "react";
import styles from "./Board.module.css";

import ModeToggler from "./modeToggler/ModeToggler";
import LessonHistory from "./histories/lessonHistory/LessonHistory";
import AssignmentHistory from "./histories/assignmentHistory/AssignmentHistory";

function Board(props) {
  const [historyMode, setHistoryMode] = useState("lesson");

  const { student } = props;
  const { lessonHistory } = props;
  const { assignmentHistory } = props;
  const { fetchAssignmentHistory } = props;
  const { httpFunctions } = props;

  const toggleHistoryModeHandler = () => {
    let target = historyMode === "lesson" ? "assignment" : "lesson";
    setHistoryMode(target);
  };

  return (
    <div className={styles["board"]}>
      <ModeToggler
        text={historyMode === "lesson" ? "Lesson" : "Assignment"}
        student={student}
        onClick={toggleHistoryModeHandler}
      />
      {historyMode === "lesson" && student && (
        <LessonHistory
          student={student}
          httpFunctions={httpFunctions}
          lessonHistory={lessonHistory}
        />
      )}
      {historyMode === "assignment" && student && (
        <AssignmentHistory
          student={student}
          assignmentHistory={assignmentHistory}
          fetchAssignmentHistory={fetchAssignmentHistory}
          httpFunctions={httpFunctions}
        />
      )}
    </div>
  );
}

export default Board;
