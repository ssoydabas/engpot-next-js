import styles from "./NextLesson.module.css";

import Container from "react-bootstrap/Container";

import ISO_to_Obj from "../../../../util/ISO_to_Obj";

function NextLesson({ student }) {
  if (
    student &&
    student.engPotInfo.nextLesson.hasPlannedLesson &&
    !student.engPotInfo.nextLesson.dateObject
  ) {
    student.engPotInfo.nextLesson.dateObject = ISO_to_Obj(
      student.engPotInfo.nextLesson.date
    );
  }

  return (
    <Container fluid className={styles["next-lesson"]}>
      {student.engPotInfo.nextLesson.hasPlannedLesson && (
        <>
          <div className={styles["month"]}>
            {student.engPotInfo.nextLesson.dateObject.monthName}
          </div>
          <div className={styles["day"]}>
            {student.engPotInfo.nextLesson.dateObject.day}
          </div>
          <div
            className={styles["time"]}
          >{`${student.engPotInfo.nextLesson.dateObject.hour} : ${student.engPotInfo.nextLesson.dateObject.minute}`}</div>
          <div className={styles["year"]}>
            {student.engPotInfo.nextLesson.dateObject.year}
          </div>
        </>
      )}
      {!student.engPotInfo.nextLesson.hasPlannedLesson && (
        <div className={styles["no-planned-lesson"]}>No planned lesson</div>
      )}
    </Container>
  );
}

export default NextLesson;
