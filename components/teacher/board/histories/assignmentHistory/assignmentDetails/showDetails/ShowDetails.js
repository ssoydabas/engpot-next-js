import React, { useState } from "react";
import styles from "./ShowDetails.module.css";

import MarkAssignment from "./markAssignment/MarkAssignment";

function ShowDetails(props) {
  const [detailMode, setDetailMode] = useState("studentAnswer");
  const [markIt, setMarkIt] = useState(null);

  const { assignment } = props;
  const { setAssignmentDetails } = props;
  const { setShowDetails } = props;
  const { fetchAssignmentHistoryHandler } = props;
  const { httpFunctions } = props;

  return (
    <div className={`${styles["show-details"]} card`}>
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
        {!assignment.teacherInfo && (
          <div
            className={
              detailMode === "teacherNote" ? styles["toggle-menu-active"] : ""
            }
            onClick={setMarkIt.bind(null, true)}
          >
            Mark it!
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
      {markIt && (
        <MarkAssignment
          assignment={assignment}
          setAssignmentDetails={setAssignmentDetails}
          setShowDetails={setShowDetails}
          fetchAssignmentHistoryHandler={fetchAssignmentHistoryHandler}
          httpFunctions={httpFunctions}
        />
      )}
    </div>
  );
}

export default ShowDetails;
