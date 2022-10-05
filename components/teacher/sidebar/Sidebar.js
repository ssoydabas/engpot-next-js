import React, { Fragment, useRef } from "react";
import styles from "./Sidebar.module.css";

import Select from "./select/Select";
import NextLesson from "./nextLesson/NextLesson";
import Extra from "./extra/Extra";
import ActionButtons from "./actionButtons/ActionButtons";

function Sidebar(props) {
  const { students } = props;
  const { chosenStudent } = props;
  const { setChosenStudent } = props;
  const { setDisplayActionForm } = props;
  const { setActionFormMode } = props;
  const { displayMobileSidebar } = props;
  const { setDisplayMobileSidebar } = props;

  return (
    <Fragment>
      <div
        className={`${styles["side-bar"]} ${
          !displayMobileSidebar ? styles["top-100"] : styles["top-0"]
        }`}
      >
        <Select students={students} setChosenStudent={setChosenStudent} setDisplayMobileSidebar={setDisplayMobileSidebar} />
        {chosenStudent && <NextLesson chosenStudent={chosenStudent} />}
        {chosenStudent && <Extra />}
        {chosenStudent && (
          <ActionButtons
            chosenStudent={chosenStudent}
            setDisplayActionForm={setDisplayActionForm}
            setActionFormMode={setActionFormMode}
            setDisplayMobileSidebar={setDisplayMobileSidebar}
          />
        )}
      </div>
    </Fragment>
  );
}

export default Sidebar;
