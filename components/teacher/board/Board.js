import React, { useState } from "react";
import styles from "./Board.module.css";

import ModeToggler from "./modeToggler/ModeToggler";
import LessonHistory from "./histories/lessonHistory/LessonHistory";
import AssignmentHistory from "./histories/assignmentHistory/AssignmentHistory";

function Board(props) {
  const [historyMode, setHistoryMode] = useState("lesson");
  const [lessonHistory, setLessonHistory] = useState(null);
  const [assignmentHistory, setAssignmentHistory] = useState(null);

  const { teacher } = props;
  const { httpFunctions } = props;
  const { chosenStudent } = props;
  const { device } = props;

  const toggleHistoryModeHandler = () => {
    let target = historyMode === "lesson" ? "assignment" : "lesson";
    setHistoryMode(target);
  };

  return (
    <div className={styles["board"]}>
      <ModeToggler
        text={historyMode === "lesson" ? "Lesson" : "Assignment"}
        chosenStudent={chosenStudent}
        onClick={toggleHistoryModeHandler}
      />
      {historyMode === "lesson" && chosenStudent && (
        <LessonHistory
          teacher={teacher}
          chosenStudent={chosenStudent}
          httpFunctions={httpFunctions}
          setHistoryMode={setHistoryMode}
          lessonHistory={lessonHistory}
          setLessonHistory={setLessonHistory}
        />
      )}
      {historyMode === "assignment" && chosenStudent && (
        <AssignmentHistory
          teacher={teacher}
          chosenStudent={chosenStudent}
          httpFunctions={httpFunctions}
          setHistoryMode={setHistoryMode}
          assignmentHistory={assignmentHistory}
          setAssignmentHistory={setAssignmentHistory}
          device={device}
        />
      )}
    </div>
  );
}

export default Board;
