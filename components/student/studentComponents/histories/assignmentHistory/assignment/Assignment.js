import { useState } from "react";
import styles from "./Assignment.module.css";

import Form from "react-bootstrap/Form";

import DetailsContainer from "./details/DetailsContainer";
import DoAssignment from "./doAssignment/DoAssignment";

import Backdrop from "../../../../../ui/components/backdrop/Backdrop";
import Button from "../../../../../ui/components/button/Button";

function Assignment({
  student,
  showAssignment: assignment,
  setShowAssignment,
  fetchAssignmentHistoryHandler,
  http,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [doAssignment, setDoAssignment] = useState(false);

  return (
    <>
    <Backdrop onClick={setShowAssignment.bind(null, null)} />
      <div className={styles["form"]}>
        <div className={styles["title"]}>{assignment.assignmentInfo.title}</div>
        <Form.Group className={styles["input-container"]}>
          <Form.Label>Instructions</Form.Label>
          <div>{assignment.assignmentInfo.instructions}</div>
        </Form.Group>
        <Form.Group className={styles["input-container"]}>
          <Form.Label>Deadline</Form.Label>
          <div>{`${assignment.assignmentInfo.deadlineDateObject.monthName} ${assignment.assignmentInfo.deadlineDateObject.day} ${assignment.assignmentInfo.deadlineDateObject.year}`}</div>
        </Form.Group>
        <Form.Group className={styles["input-container"]}>
          <Form.Label>Assignment Status</Form.Label>
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
        </Form.Group>
        {assignment.assignmentInfo.isDone && (
          <Button type="button" onClick={setShowDetails.bind(null, assignment)}>
            Show Details
          </Button>
        )}
        {showDetails && (
          <DetailsContainer
            assignment={assignment}
            setShowAssignment={setShowAssignment}
            setShowDetails={setShowDetails}
            fetchAssignmentHistoryHandler={fetchAssignmentHistoryHandler}
            http={http}
          />
        )}
        {!assignment.assignmentInfo.isDone && (
          <Button onClick={setDoAssignment.bind(null, assignment)}>
            Do it!
          </Button>
        )}
        {doAssignment && (
          <DoAssignment
            student={student}
            assignment={assignment}
            setShowAssignment={setShowAssignment}
            fetchAssignmentHistoryHandler={fetchAssignmentHistoryHandler}
            http={http}
          />
        )}
      </div>
    </>
  );
}

export default Assignment;
