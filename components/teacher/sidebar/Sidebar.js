import React, { Fragment, useRef } from "react";
import styles from "./Sidebar.module.css";

import Select from "./select/Select";
import NextLesson from "./nextLesson/NextLesson";
import ActionButtons from "./actionButtons/ActionButtons";

function Sidebar(props) {
  const { students } = props;
  const { chosenStudent } = props;
  const { setChosenStudent } = props;
  const { setDisplayActionForm } = props;
  const { setActionFormMode } = props;

  return (
    <Fragment>
      <div className={styles["side-bar"]}>
        <Select students={students} setChosenStudent={setChosenStudent} />
        {chosenStudent && <NextLesson chosenStudent={chosenStudent} />}
        {chosenStudent && (
          <ActionButtons
            chosenStudent={chosenStudent}
            setDisplayActionForm={setDisplayActionForm}
            setActionFormMode={setActionFormMode}
          />
        )}
      </div>
    </Fragment>
  );
}

export default Sidebar;
