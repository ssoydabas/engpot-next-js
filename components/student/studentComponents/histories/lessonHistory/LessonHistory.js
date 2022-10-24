import styles from "./LessonHistory.module.css";

import ISO_to_Object from "../../../../../util/ISO_to_Obj.js";
import Container from "react-bootstrap/Container";

const setLessonDateObject = (lessonHistory) => {
  lessonHistory = lessonHistory.map((lesson) => {
    const dateObject = ISO_to_Object(lesson.date);
    return { ...lesson, dateObject };
  });

  return lessonHistory;
};

function LessonHistory({ student, lessonHistory }) {

  if (lessonHistory) {
    lessonHistory = setLessonDateObject(lessonHistory);
  }

  if (lessonHistory) {
    lessonHistory = lessonHistory.filter((lesson) => lesson.status === "done");

    let iterator = 1;
    for (let lesson of lessonHistory) {
      lesson.lessonCount = iterator;
      iterator++;
    }

    lessonHistory.reverse();
  }

  return (
    <Container fluid className={`${styles["lesson-history"]}`}>
      {lessonHistory &&
        lessonHistory.map((lesson) => (
          <div key={lesson._id} className={styles["lesson"]}>
            <div className={styles["date"]}>
              <div className={styles["month"]}>
                {lesson.dateObject.monthName}
              </div>
              <div className={styles["year"]}>{lesson.dateObject.year}</div>
              <div className={styles["day"]}>{lesson.dateObject.day}</div>
            </div>
            <div className={styles["lesson-details"]}>
              <div className={styles["detail"]}>
                <label htmlFor="">Social:</label>
                <div>{lesson.subjects.social}</div>
              </div>
              <div className={styles["detail"]}>
                <label htmlFor="">Tense:</label>
                <div>{lesson.subjects.tense}</div>
              </div>
              <div className={styles["detail"]}>
                <label htmlFor="">Structure:</label>
                <div>{lesson.subjects.structure}</div>
              </div>
              <div className={styles["detail"]}>
                <label htmlFor="">Extra:</label>
                <div>{lesson.subjects.extra}</div>
              </div>
            </div>
            <div className={styles["lesson-count"]}>{lesson.lessonCount}</div>
          </div>
        ))}
    </Container>
  );
}

export default LessonHistory;
