import { useEffect, useState } from "react";
import styles from "./AssignmentHistory.module.css";

import ISO_to_Obj from "../../../../../util/ISO_to_Obj.js";
import Container from "react-bootstrap/Container";

import Assignment from "./assignment/Assignment.js";

function AssignmentHistory({ teacher, selectedStudent, http, isMobile }) {
  const [assignmentHistory, setAssignmentHistory] = useState(null);
  const [showAssignment, setShowAssignment] = useState(null);

  const fetchAssignmentHistoryHandler = () => {
    const url = new URL(
      `${process.env.API_URL}/v1/student/fetchAssignmentHistory`
    );
    url.searchParams.append("teacherId", teacher._id);
    url.searchParams.append("studentId", selectedStudent._id);

    const requestConfig = {
      url: url,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
    };

    const dataProcessingLogic = ({ assignmentHistory }) => {
      http.setIsLoading(false);
      assignmentHistory = assignmentHistory.map((assignment) => {
        const deadlineDateObject = ISO_to_Obj(
          assignment.assignmentInfo.deadline
        );
        const assignedDateObject = ISO_to_Obj(
          assignment.assignmentInfo.assignedDate
        );

        const newAssignment = assignment;
        newAssignment.assignmentInfo.deadlineDateObject = deadlineDateObject;
        newAssignment.assignmentInfo.assignedDateObject = assignedDateObject;

        return newAssignment;
      });
      setAssignmentHistory(assignmentHistory);
    };

    http.sendRequest(requestConfig, dataProcessingLogic);
  };

  useEffect(() => {
    if (selectedStudent && teacher) {
      fetchAssignmentHistoryHandler();
    }
  }, [selectedStudent, teacher]);

  if (
    assignmentHistory &&
    assignmentHistory.length !== 0 &&
    assignmentHistory[0].assignmentCount === undefined
  ) {
    let iterator = 1;
    for (let assignment of assignmentHistory) {
      assignment.assignmentCount = iterator;
      iterator++;
    }

    assignmentHistory.reverse();
  }

  return (
    <>
      <Container fluid className={styles["assignment-history"]}>
        {assignmentHistory &&
          assignmentHistory.map((assignment) => (
            <div
              key={assignment._id}
              className={`${styles["assignment"]} ${
                assignmentHistory.length === 1 ? styles["only-one"] : ""
              }`}
              onClick={setShowAssignment.bind(null, assignment)}
            >
              <div className={`${styles["date"]}`}>
                <div className={styles["month"]}>
                  {assignment.assignmentInfo.assignedDateObject.monthName}
                </div>
                <div className={styles["year"]}>
                  {assignment.assignmentInfo.assignedDateObject.year}
                </div>
                <div className={`${styles["day"]}`}>
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
              <div className={`${styles["assignment-count"]}`}>
                {assignment.assignmentCount}
              </div>
            </div>
          ))}
      </Container>
      {showAssignment && (
        <Assignment
          showAssignment={showAssignment}
          setShowAssignment={setShowAssignment}
          fetchAssignmentHistoryHandler={fetchAssignmentHistoryHandler}
          http={http}
        />
      )}
    </>
  );
}

export default AssignmentHistory;
