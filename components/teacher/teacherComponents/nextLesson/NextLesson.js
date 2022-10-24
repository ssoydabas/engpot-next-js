import styles from "./NextLesson.module.css";

import Container from "react-bootstrap/Container";

import ISO_to_Obj from "../../../../util/ISO_to_Obj.js";

function NextLesson({ selectedStudent }) {
  if (
    selectedStudent &&
    selectedStudent.engPotInfo.nextLesson.hasPlannedLesson &&
    !selectedStudent.engPotInfo.nextLesson.dateObject
  ) {
    selectedStudent.engPotInfo.nextLesson.dateObject = ISO_to_Obj(
      selectedStudent.engPotInfo.nextLesson.date
    );
  }

  return (
    <Container fluid className={styles["next-lesson"]}>
      {selectedStudent.engPotInfo.nextLesson.hasPlannedLesson && (
        <>
          <div className={styles["month"]}>
            {selectedStudent.engPotInfo.nextLesson.dateObject.monthName}
          </div>
          <div className={styles["day"]}>
            {selectedStudent.engPotInfo.nextLesson.dateObject.day}
          </div>
          <div
            className={styles["time"]}
          >{`${selectedStudent.engPotInfo.nextLesson.dateObject.hour} : ${selectedStudent.engPotInfo.nextLesson.dateObject.minute}`}</div>
          <div className={styles["year"]}>
            {selectedStudent.engPotInfo.nextLesson.dateObject.year}
          </div>
        </>
      )}
      {!selectedStudent.engPotInfo.nextLesson.hasPlannedLesson && (
        <div className={styles["no-planned-lesson"]}>No planned lesson</div>
      )}
    </Container>
  );
}

export default NextLesson;
