import React, { Fragment, useState } from "react";
import styles from "./Teacher.module.css";

import Board from "./board/Board";
import Sidebar from "./sidebar/Sidebar";
import LessonActionForm from "./actionForms/lessonActionForm/LessonActionForm";
import AssignmentActionForm from "./actionForms/assignmentActionForm/AssignmentActionForm";

import Backdrop from "../ui/components/backdrop/Backdrop";

function TeacherPanel(props) {
  const [chosenStudent, setChosenStudent] = useState(null);
  const [displayActionForm, setDisplayActionForm] = useState(false);
  const [actionFormMode, setActionFormMode] = useState(false);

  const { teacher } = props;
  const { students } = props;
  const { fetchStudents } = props;
  const { httpFunctions } = props;

  const closeTeacherActionFormHandler = () => {
    setDisplayActionForm(false);
  };

  return (
    <div className={styles["teacher-page"]}>
      <Board
        teacher={teacher}
        chosenStudent={chosenStudent}
        setChosenStudent={setChosenStudent}
        httpFunctions={httpFunctions}
      />
      <Sidebar
        students={students}
        chosenStudent={chosenStudent}
        setChosenStudent={setChosenStudent}
        setDisplayActionForm={setDisplayActionForm}
        setActionFormMode={setActionFormMode}
      />
      {chosenStudent && displayActionForm && (
        <Fragment>
          <Backdrop onClick={closeTeacherActionFormHandler} />
          {actionFormMode === "lesson" && (
            <LessonActionForm
              teacher={teacher}
              chosenStudent={chosenStudent}
              setChosenStudent={setChosenStudent}
              httpFunctions={httpFunctions}
              fetchStudents={fetchStudents}
              setDisplayActionForm={setDisplayActionForm}
            />
          )}
          {actionFormMode === "assignment" && (
            <AssignmentActionForm
              teacher={teacher}
              chosenStudent={chosenStudent}
              setChosenStudent={setChosenStudent}
              httpFunctions={httpFunctions}
              fetchStudents={fetchStudents}
              setDisplayActionForm={setDisplayActionForm}
            />
          )}
        </Fragment>
      )}
    </div>
  );
}

export default TeacherPanel;
