import React, { Fragment, useState } from "react";
import styles from "./Student.module.css";

import Board from "./board/Board";
import SideBar from "./sidebar/Sidebar";

function Student(props) {

  const { student } = props;
  const { lessonHistory } = props;
  const { assignmentHistory } = props;
  const { fetchAssignmentHistory } = props;
  const { httpFunctions } = props;

  return (
    <div className={styles["student-page"]}>
      <Board
        student={student}
        lessonHistory={lessonHistory}
        assignmentHistory={assignmentHistory}
        fetchAssignmentHistory={fetchAssignmentHistory}
        httpFunctions={httpFunctions}
      />
      <SideBar student={student} />
    </div>
  );
}

export default Student;
