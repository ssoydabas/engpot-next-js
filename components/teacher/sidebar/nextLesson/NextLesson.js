import React, { Fragment } from "react";
import styles from "./NextLesson.module.css";

import convertIsoToObject from "../../../../util/dataHelpers/convertTimestamp";

function NextLesson(props) {
  let { chosenStudent } = props;
  
  if (
    chosenStudent &&
    chosenStudent.engPotInfo.nextLesson.hasPlannedLesson &&
    !chosenStudent.engPotInfo.nextLesson.dateObject
  ) {
    chosenStudent.engPotInfo.nextLesson.dateObject = convertIsoToObject(
      chosenStudent.engPotInfo.nextLesson.date
    );
  }
  return (
    <div className={`${styles["next-lesson"]} card highlight--dark`}>
      {chosenStudent.engPotInfo.nextLesson.hasPlannedLesson && (
        <Fragment>
          <div className={styles["month"]}>
            {chosenStudent.engPotInfo.nextLesson.dateObject.monthName}
          </div>
          <div className={styles["year"]}>
            {chosenStudent.engPotInfo.nextLesson.dateObject.year}
          </div>
          <div className={styles["day"]}>
            {chosenStudent.engPotInfo.nextLesson.dateObject.day}
          </div>
          <div
            className={`${styles["time"]} card highlight--dark`}
          >{`${chosenStudent.engPotInfo.nextLesson.dateObject.hour} : ${chosenStudent.engPotInfo.nextLesson.dateObject.minute}`}</div>
        </Fragment>
      )}
      {!chosenStudent.engPotInfo.nextLesson.hasPlannedLesson && (
        <div className={styles["no-planned-lesson"]}>No planned lesson</div>
      )}
    </div>
  );
}

export default NextLesson;
