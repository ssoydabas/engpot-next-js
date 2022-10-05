import React, { Fragment, useEffect, useState } from "react";
import styles from "./AssignmentHistory.module.css";

import AssignmentDetails from "./assignmentDetails/AssignmentDetails";

import Backdrop from "../../../../ui/components/backdrop/Backdrop";

import convertTimestamp from "../../../../../util/dataHelpers/convertTimestamp";

const setAssignmentDateObject = (assignmentHistory) => {
  assignmentHistory = assignmentHistory.map((assignment) => {
    const deadlineDateObject = convertTimestamp(
      assignment.assignmentInfo.deadline
    );
    const assignedDateObject = convertTimestamp(
      assignment.assignmentInfo.assignedDate
    );

    const newAssignment = assignment;
    newAssignment.assignmentInfo.deadlineDateObject = deadlineDateObject;
    newAssignment.assignmentInfo.assignedDateObject = assignedDateObject;

    return newAssignment;
  });

  return assignmentHistory;
};

function AssignmentHistory(props) {
  const [assignmentDetails, setAssignmentDetails] = useState(null);

  const { student } = props;
  const { httpFunctions } = props;
  const { fetchAssignmentHistory } = props;
  let { assignmentHistory } = props;
  let { device } = props;

  if (assignmentHistory) {
    assignmentHistory = setAssignmentDateObject(assignmentHistory);

    if (assignmentHistory[0].assignmentCount === undefined) {
      let iterator = 1;
      for (let assignment of assignmentHistory) {
        assignment.assignmentCount = iterator;
        iterator++;
      }
      assignmentHistory.reverse();
    }

    if (assignmentHistory[0].assignmentCount === 1) {
      assignmentHistory.reverse();
    }
  }

  return (
    <Fragment>
      <div className={`${styles["assignment-history"]} scroll`}>
        {assignmentHistory &&
          assignmentHistory.map((assignment) => (
            <div
              key={assignment._id}
              className={`${styles["assignment"]} card highlight--dark ${
                assignmentHistory.length === 1 ? styles["only-one"] : ""
              }`}
              onClick={setAssignmentDetails.bind(null, assignment)}
            >
              {device === "mobile" && (
                <div className={`${styles["click-me"]}`}>Click Me!</div>
              )}
              <div className={`${styles["date"]} card highlight--dark`}>
                <div className={styles["month"]}>
                  {assignment.assignmentInfo.assignedDateObject.monthName}
                </div>
                <div className={styles["year"]}>
                  {assignment.assignmentInfo.assignedDateObject.year}
                </div>
                <div className={`${styles["day"]} card`}>
                  {assignment.assignmentInfo.assignedDateObject.day}
                </div>
              </div>
              <div className={styles["assignment-details"]}>
                <div className={styles["detail"]}>
                  <label htmlFor="">Title:</label>
                  <div>{assignment.assignmentInfo.title}</div>
                </div>
                <div className={styles["detail"]}>
                  <label htmlFor="">instructions:</label>
                  <div>{assignment.assignmentInfo.instructions}</div>
                </div>
                <div className={styles["detail"]}>
                  <label htmlFor="">Deadline:</label>
                  <div>{`${assignment.assignmentInfo.deadlineDateObject.monthName} ${assignment.assignmentInfo.deadlineDateObject.day} ${assignment.assignmentInfo.deadlineDateObject.year}`}</div>
                </div>
                <div className={styles["detail"]}>
                  <label htmlFor="">Status:</label>
                  <div>
                    {!assignment.assignmentInfo.isDone && "Not Done"}
                    {assignment.assignmentInfo.isDone &&
                      !assignment.teacherInfo &&
                      "Not Marked"}
                    {assignment.assignmentInfo.isDone &&
                      assignment.teacherInfo &&
                      !assignment.assignmentInfo.doneOnTime &&
                      "Missed the deadline"}
                    {assignment.assignmentInfo.isDone &&
                      assignment.teacherInfo &&
                      assignment.assignmentInfo.doneOnTime &&
                      "Done on time"}
                  </div>
                </div>
                <div
                  className={`${styles["assignment-count"]} card highlight--light`}
                >
                  {assignment.assignmentCount}
                </div>
              </div>
            </div>
          ))}
      </div>
      {assignmentDetails && (
        <Fragment>
          <Backdrop onClick={setAssignmentDetails.bind(null, null)} />
          <AssignmentDetails
            student={student}
            assignmentDetails={assignmentDetails}
            setAssignmentDetails={setAssignmentDetails}
            fetchAssignmentHistory={fetchAssignmentHistory}
            httpFunctions={httpFunctions}
          />
        </Fragment>
      )}
    </Fragment>
  );
}

export default AssignmentHistory;
