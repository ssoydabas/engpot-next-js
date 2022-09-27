import React, { Fragment, useState } from "react";
import styles from "./AssignmentDetails.module.css";

import Button from "../../../../../ui/components/button/Button";

import DoAssignment from "./doAssignment/DoAssignment";
import ShowDetails from "./showDetails/ShowDetails";

function AssignmentDetails(props) {
  const [doAssignment, setDoAssignment] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  const { student } = props;
  const { assignmentDetails:assignment } = props;
  const { setAssignmentDetails } = props;
  const { fetchAssignmentHistory } = props;
  const { httpFunctions } = props;
  
  return (
    <Fragment>
      <div className={`${styles["form"]} card highlight--dark`}>
        <div className={styles["title"]}>{assignment.assignmentInfo.title}</div>
        <div className={styles["input-container"]}>
          <label htmlFor="">Instructions</label>
          <div>{assignment.assignmentInfo.instructions}</div>
        </div>
        <div className={styles["input-container"]}>
          <label htmlFor="">Deadline</label>
          <div>{`${assignment.assignmentInfo.deadlineDateObject.monthName} ${assignment.assignmentInfo.deadlineDateObject.day} ${assignment.assignmentInfo.deadlineDateObject.year}`}</div>
        </div>
        <div className={styles["input-container"]}>
          <label htmlFor="">Assignment Status</label>
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

        {!assignment.assignmentInfo.isDone && (
          <Button
            classes="button--white"
            type="button"
            text="Do it!"
            onClick={setDoAssignment.bind(null, assignment)}
          />
        )}
        {assignment.assignmentInfo.isDone && (
          <Button
            classes="button--white"
            type="button"
            text="Show Details"
            onClick={setShowDetails.bind(null, true)}
          />
        )}
        {doAssignment && (
          <DoAssignment
            student={student}
            assignment={assignment}
            setAssignmentDetails={setAssignmentDetails}
            fetchAssignmentHistory={fetchAssignmentHistory}
            httpFunctions={httpFunctions}
          />
        )}
        {showDetails && <ShowDetails assignment={assignment} />}
      </div>
    </Fragment>
  );
}

export default AssignmentDetails;
