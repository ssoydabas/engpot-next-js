import React, { Fragment, useState, useEffect } from "react";
import styles from "./Student.module.css";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import setDeviceScreenMode from "../../util/dataHelpers/setDeviceScreenMode";

import Board from "./board/Board";
import SideBar from "./sidebar/Sidebar";

function Student(props) {
  const [displayMobileSidebar, setDisplayMobileSidebar] = useState(false);
  const [device, setDevice] = useState();

  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    setDeviceScreenMode(windowDimensions, setDevice);
  }, [windowDimensions]);

  const { student } = props;
  const { lessonHistory } = props;
  const { assignmentHistory } = props;
  const { fetchAssignmentHistory } = props;
  const { httpFunctions } = props;

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

  return (
    <div className={styles["student-page"]}>
      <Board
        student={student}
        lessonHistory={lessonHistory}
        assignmentHistory={assignmentHistory}
        fetchAssignmentHistory={fetchAssignmentHistory}
        httpFunctions={httpFunctions}
        device={device}
      />
      <SideBar student={student} displayMobileSidebar={displayMobileSidebar} />
      {device === "mobile" && sideBarToggler}
    </div>
  );
}

export default Student;
