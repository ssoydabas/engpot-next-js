import { useState } from "react";
import styles from "./DetailsContainer.module.css";

import Backdrop from "../../../../../../ui/components/backdrop/Backdrop.js";
import Button from "../../../../../../ui/components/button/Button.js";

import MarkAssignment from "../markAssignment/MarkAssignment.js";

function DetailsContainer({
  assignment,
  setShowAssignment,
  setShowDetails,
  fetchAssignmentHistoryHandler,
  http,
}) {
  const [detailMode, setDetailMode] = useState("studentAnswer");
  const [markAssignment, setMarkAssignment] = useState(null);

  return (
    <>
      <Backdrop onClick={setShowDetails.bind(null, false)} />
      <div className={styles["details-container"]}>
        <div className={styles["toggle-menu"]}>
          <div
            className={
              detailMode === "studentAnswer" ? styles["toggle-menu-active"] : ""
            }
            onClick={setDetailMode.bind(null, "studentAnswer")}
          >
            Student Answer
          </div>
          {assignment.teacherInfo && (
            <div
              className={
                detailMode === "teacherNote" ? styles["toggle-menu-active"] : ""
              }
              onClick={setDetailMode.bind(null, "teacherNote")}
            >
              Teacher Note
            </div>
          )}
        </div>
        {detailMode === "studentAnswer" && (
          <div className={styles["student-answer"]}>
            <div className={styles["student-answer-title"]}>
              {assignment.studentInfo.title}
            </div>
            <div className={`${styles["student-answer-text"]} scroll`}>
              {assignment.studentInfo.answer}
            </div>
          </div>
        )}
        {detailMode === "teacherNote" && (
          <div className={styles["teacher-note"]}>
            <div className={styles["mark"]}>
              <label htmlFor="">Teacher Mark</label>
              <div>{assignment.teacherInfo.mark}</div>
            </div>
            <div className={styles["note"]}>
              <label htmlFor="">Teacher Note</label>
              <div className="scroll">{assignment.teacherInfo.teacherNote}</div>
            </div>
          </div>
        )}

        {!assignment.teacherInfo && (
          <Button onClick={setMarkAssignment.bind(null, true)}>Mark it!</Button>
        )}
        {markAssignment && (
          <MarkAssignment
            assignment={assignment}
            setShowAssignment={setShowAssignment}
            setMarkAssignment={setMarkAssignment}
            fetchAssignmentHistoryHandler={fetchAssignmentHistoryHandler}
            http={http}
          />
        )}
      </div>
    </>
  );
}

export default DetailsContainer;
