import React, { Fragment, useEffect, useState } from "react";
import styles from "./AssignmentHistory.module.css";

import AssignmentDetails from "./assignmentDetails/AssignmentDetails";

import Backdrop from "../../../../ui/components/backdrop/Backdrop";

import convertTimestamp from "../../../../../util/dataHelpers/convertTimestamp";

function AssignmentHistory(props) {
  const [assignmentDetails, setAssignmentDetails] = useState(null);

  const { teacher } = props;
  const { chosenStudent } = props;
  const { httpFunctions } = props;
  let { assignmentHistory } = props;
  const { setAssignmentHistory } = props;

  const fetchAssignmentHistoryHandler = () => {
    const url = new URL(`${process.env.API_URL}/getAssignmentHistory`);
    url.searchParams.append("teacherId", teacher._id);
    url.searchParams.append("studentId", chosenStudent._id);

    const requestConfig = {
      url: url,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
    };

    const dataProcessingLogic = (data) => {
      httpFunctions.setIsLoading(false);
      const { assignmentHistory } = data;
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
      setAssignmentHistory(assignmentHistory);
    };

    httpFunctions.sendRequest(requestConfig, dataProcessingLogic);
  };

  useEffect(() => {
    if (chosenStudent && teacher) {
      fetchAssignmentHistoryHandler();
    }
  }, [chosenStudent, teacher]);

  if (assignmentHistory && assignmentHistory[0].assignmentCount === undefined) {
    let iterator = 1;
    for (let assignment of assignmentHistory) {
      assignment.assignmentCount = iterator;
      iterator++;
    }

    assignmentHistory.reverse();
  }

  return (
    <Fragment>
      <div className={`${styles["assignment-history"]} scroll`}>
        {assignmentHistory &&
          assignmentHistory.map((assignment) => (
            <div
              key={assignment._id}
              className={`${styles["assignment"]} card highlight--dark`}
              onClick={setAssignmentDetails.bind(null, assignment)}
            >
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
              </div>
              <div
                className={`${styles["assignment-count"]} card highlight--light`}
              >
                {assignment.assignmentCount}
              </div>
            </div>
          ))}
      </div>
      {assignmentDetails && (
        <Fragment>
          <Backdrop onClick={setAssignmentDetails.bind(null, null)} />
          <AssignmentDetails
            teacher={teacher}
            assignmentDetails={assignmentDetails}
            setAssignmentDetails={setAssignmentDetails}
            fetchAssignmentHistoryHandler={fetchAssignmentHistoryHandler}
            httpFunctions={httpFunctions}
          />
        </Fragment>
      )}
    </Fragment>
  );
}

export default AssignmentHistory;
