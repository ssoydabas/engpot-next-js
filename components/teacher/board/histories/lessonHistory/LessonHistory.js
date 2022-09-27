import React, { Fragment, useEffect, useState } from "react";
import styles from "./LessonHistory.module.css";

import convertTimestamp from "../../../../../util/dataHelpers/convertTimestamp";

function LessonHistory(props) {
  const { teacher } = props;
  const { chosenStudent } = props;
  const { httpFunctions } = props;
  const { setHistoryMode } = props;
  let { lessonHistory } = props;
  const { setLessonHistory } = props;

  const fetchLessonHistoryHandler = () => {
    const url = new URL(`${process.env.API_URL}/getLessonHistory`);
    url.searchParams.append("teacherId", teacher._id);
    url.searchParams.append("studentId", chosenStudent._id);

    const requestConfig = {
      url: url,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
    };

    const dataProcessingLogic = (data) => {
      httpFunctions.setIsLoading(false);
      const { lessonHistory } = data;
      lessonHistory = lessonHistory.map((lesson) => {
        const dateObject = convertTimestamp(lesson.date);

        return { ...lesson, dateObject };
      });
      setLessonHistory(lessonHistory);
    };

    httpFunctions.sendRequest(requestConfig, dataProcessingLogic);
  };

  useEffect(() => {
    if (chosenStudent && teacher) {
      fetchLessonHistoryHandler();
    }
  }, [chosenStudent, teacher]);

  lessonHistory = lessonHistory ? lessonHistory.filter((lesson) => lesson.status === "done") : null;

  return (
    <Fragment>
      <div className={`${styles["lesson-history"]} scroll`}>
        {lessonHistory &&
          lessonHistory.map((lesson) => (
            <div
              key={lesson._id}
              className={`${styles["lesson"]} card highlight--dark`}
            >
              <div className={`${styles["date"]} card highlight--dark`}>
                <div className={styles["month"]}>
                  {lesson.dateObject.monthName}
                </div>
                <div className={styles["year"]}>{lesson.dateObject.year}</div>
                <div className={`${styles["day"]} card`}>
                  {lesson.dateObject.day}
                </div>
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
            </div>
          ))}
      </div>
    </Fragment>
  );
}

export default LessonHistory;
