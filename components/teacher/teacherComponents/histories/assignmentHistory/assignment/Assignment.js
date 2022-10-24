import { useState } from "react";
import styles from "./Assignment.module.css";

import Form from "react-bootstrap/Form";

import DetailsContainer from "./details/DetailsContainer";

import Backdrop from "../../../../../ui/components/backdrop/Backdrop";
import Button from "../../../../../ui/components/button/Button";

function Assignment({
  showAssignment: assignment,
  setShowAssignment,
  fetchAssignmentHistoryHandler,
  http,
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Backdrop onClick={setShowAssignment.bind(null, false)} />
      <Form className={styles["form"]}>
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
      </Form>
    </>
  );
}

export default Assignment;
