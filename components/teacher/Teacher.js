import React, { Fragment, useState, useEffect } from "react";
import styles from "./Teacher.module.css";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import setDeviceScreenMode from "../../util/dataHelpers/setDeviceScreenMode";

import Board from "./board/Board";
import Sidebar from "./sidebar/Sidebar";
import LessonActionForm from "./actionForms/lessonActionForm/LessonActionForm";
import AssignmentActionForm from "./actionForms/assignmentActionForm/AssignmentActionForm";

import Backdrop from "../ui/components/backdrop/Backdrop";

function TeacherPanel(props) {
  const [chosenStudent, setChosenStudent] = useState(null);
  const [displayActionForm, setDisplayActionForm] = useState(false);
  const [actionFormMode, setActionFormMode] = useState(false);
  const [displayMobileSidebar, setDisplayMobileSidebar] = useState(true);
  const [device, setDevice] = useState();

  const { teacher } = props;
  const { students } = props;
  const { fetchStudents } = props;
  const { httpFunctions } = props;

  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    setDeviceScreenMode(windowDimensions, setDevice);
  }, [windowDimensions]);

  const sideBarToggler = (
    <div
      className={styles["sidebar-toggler"]}
      onClick={setDisplayMobileSidebar.bind(null, !displayMobileSidebar)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevrons-up"
        className={`${displayMobileSidebar ? styles["upside-down"] : ""}`}
      >
        <polyline points="17 11 12 6 7 11"></polyline>
        <polyline points="17 18 12 13 7 18"></polyline>
      </svg>
    </div>
  );

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
        device={device}
      />
      <Sidebar
        students={students}
        chosenStudent={chosenStudent}
        setChosenStudent={setChosenStudent}
        setDisplayActionForm={setDisplayActionForm}
        setActionFormMode={setActionFormMode}
        displayMobileSidebar={displayMobileSidebar}
        setDisplayMobileSidebar={setDisplayMobileSidebar}
      />
      {device === "mobile" && sideBarToggler}
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
