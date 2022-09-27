import React, { Fragment, useState } from "react";
import styles from "./AssignmentDetails.module.css";

import ShowDetails from "./showDetails/ShowDetails";

import Button from "../../../../../ui/components/button/Button";

function AssignmentDetails(props) {
  const [showDetails, setShowDetails] = useState(null);

  const { teacher } = props;
  const { assignmentDetails: assignment } = props;
  const {setAssignmentDetails} = props;
  const { fetchAssignmentHistoryHandler } = props;
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
        {assignment.assignmentInfo.isDone && (
          <Button
            classes="button--white"
            type="button"
            text="Show Details"
            onClick={setShowDetails.bind(null, assignment)}
          />
        )}
        {showDetails && (
          <ShowDetails
            assignment={assignment}
            setAssignmentDetails={setAssignmentDetails}
            setShowDetails={setShowDetails}
            fetchAssignmentHistoryHandler={fetchAssignmentHistoryHandler}
            httpFunctions={httpFunctions}
          />
        )}
      </div>
    </Fragment>
  );
}

export default AssignmentDetails;
