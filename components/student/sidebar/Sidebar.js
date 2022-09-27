import React, { Fragment } from "react";
import styles from "./Sidebar.module.css";

import convertTimestamp from "../../../util/dataHelpers/convertTimestamp";

function Sidebar(props) {
  const { student } = props;

  if (student && student.engPotInfo.nextLesson.hasPlannedLesson) {
    const dateObject = convertTimestamp(student.engPotInfo.nextLesson.date);

    student.engPotInfo.nextLesson.dateObject = dateObject;
  }

  return (
    <Fragment>
      {student && (
        <div className={styles["side-bar"]}>
          <div
            className={`${styles["name-surname"]} card highlight--dark`}
          >{`${student.personalInfo.name} ${student.personalInfo.surname}`}</div>

          {student.engPotInfo.nextLesson.hasPlannedLesson && (
            <div className={`${styles["next-lesson"]} card highlight--dark`}>
              <div className={styles["month"]}>
                {student.engPotInfo.nextLesson.dateObject.monthName}
              </div>
              <div className={styles["year"]}>
                {student.engPotInfo.nextLesson.dateObject.year}
              </div>
              <div className={styles["day"]}>
                {student.engPotInfo.nextLesson.dateObject.day}
              </div>
              <div className={`${styles["time"]} card highlight--dark`}>
                {student.engPotInfo.nextLesson.dateObject.hour} :{" "}
                {student.engPotInfo.nextLesson.dateObject.minute}
              </div>
            </div>
          )}
          {!student.engPotInfo.nextLesson.hasPlannedLesson && (
            <div className={`${styles["next-lesson"]} card highlight--dark`}>
              <div>No planned Lesson</div>
            </div>
          )}

          <div className={styles["engpot-details"]}>
            <div className={`${styles["detail"]} card highlight--dark`}>
              <label htmlFor="">EngPot Credits</label>
              <div>{student.engPotInfo.engPotDetails.engPotCredits}</div>
            </div>
            <div className={`${styles["detail"]} card highlight--dark`}>
              <label htmlFor="">Lessons Taken</label>
              <div>{student.engPotInfo.engPotDetails.lessonsTaken}</div>
            </div>
            <div className={`${styles["detail"]} card highlight--dark`}>
              <label htmlFor="">Speaking Lessons</label>
              <div>{student.engPotInfo.engPotDetails.speakingLessonsTaken}</div>
            </div>
            <div className={`${styles["detail"]} card highlight--dark`}>
              <label htmlFor="">Lessons Cancelled</label>
              <div>{student.engPotInfo.engPotDetails.lessonsCancelled}</div>
            </div>
            <div className={`${styles["detail"]} card highlight--dark`}>
              <label htmlFor="">Lessons Postponed</label>
              <div>{student.engPotInfo.engPotDetails.lessonsPostponed}</div>
            </div>
            <div className={`${styles["detail"]} card highlight--dark`}>
              <label htmlFor="">EngPot Tokens</label>
              <div>{student.engPotInfo.engPotDetails.engPotToken}</div>
            </div>
            <div className={`${styles["detail"]} card highlight--dark`}>
              <label htmlFor="">Lessons Earned</label>
              <div>{student.engPotInfo.engPotDetails.lessonsEarned}</div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Sidebar;
