import React, { Fragment, useRef } from "react";
import styles from "./LessonActionForm.module.css";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../store/feedback/feedback";
import { teacherActions } from "../../../../store/teacher/teacher";

import Button from "../../../ui/components/button/Button";
import convertIsoToObject from "../../../../util/dataHelpers/convertTimestamp";

function LessonForm(props) {
  const dispatch = useDispatch();

  const dateRef = useRef();
  const timeRef = useRef();
  const tenseRef = useRef();
  const structureRef = useRef();
  const socialRef = useRef();
  const extraRef = useRef();
  const statusRef = useRef();

  const { teacher } = props;
  let { chosenStudent } = props;
  const { setChosenStudent } = props;
  const { setDisplayActionForm } = props;
  const { httpFunctions } = props;
  const { fetchStudents } = props;

  const hasPlannedLesson = chosenStudent.engPotInfo.nextLesson.hasPlannedLesson;
  let nextLessonInfo;
  if (hasPlannedLesson) {
    const dateObject = convertIsoToObject(
      chosenStudent.engPotInfo.nextLesson.date
    );
    nextLessonInfo = {
      date: `${dateObject.year}-${dateObject.month}-${dateObject.day}`,
      time: `${dateObject.hour}:${dateObject.minute}`,
      social: chosenStudent.engPotInfo.nextLesson.subjects.social,
      tense: chosenStudent.engPotInfo.nextLesson.subjects.tense,
      structure: chosenStudent.engPotInfo.nextLesson.subjects.structure,
      extra: chosenStudent.engPotInfo.nextLesson.subjects.extra,
    };
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      studentId: chosenStudent._id,
      teacherId: teacher._id,
      date: dateRef.current.value,
      time: timeRef.current.value,
      social: socialRef.current.value,
      tense: tenseRef.current.value,
      structure: structureRef.current.value,
      extra: extraRef.current.value,
      status: hasPlannedLesson ? statusRef.current.value : "",
    };
    const requestConfig = {
      url: `${process.env.API_URL}/${
        hasPlannedLesson ? "concludeLesson" : "planLesson"
      }`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
      body: data,
    };

    const dataProcessingLogic = (data) => {
      httpFunctions.setIsLoading(false);
      const { message } = data;
      const { student } = data;
      dispatch(feedbackActions.setMessage(message));
      setDisplayActionForm(false);
      setChosenStudent(student);
      fetchStudents(teacher._id);
    };
    httpFunctions.sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <form
      className={`${styles["form"]} card highlight--dark`}
      onSubmit={onSubmitHandler}
    >
      <div className={styles["title"]}>
        {hasPlannedLesson ? "Conclude Lesson" : "Plan Lesson"}
      </div>
      <div className={styles["engpot-credits"]}>
        <span>EngPot Credits:</span>
        <span>{chosenStudent.engPotInfo.engPotDetails.engPotCredits}</span>
      </div>
      <div className={`${styles["input-container"]} ${styles["date-time"]}`}>
        <label htmlFor="">Date</label>
        <input
          type="date"
          defaultValue={hasPlannedLesson ? nextLessonInfo.date : ""}
          ref={dateRef}
        />
      </div>
      <div className={`${styles["input-container"]} ${styles["date-time"]}`}>
        <label htmlFor="">Time</label>
        <input
          type="time"
          defaultValue={hasPlannedLesson ? nextLessonInfo.time : ""}
          ref={timeRef}
        />
      </div>
      <div className={styles["input-container"]}>
        <label htmlFor="">Tense</label>
        <input
          type="text"
          defaultValue={hasPlannedLesson ? nextLessonInfo.tense : ""}
          ref={tenseRef}
        />
      </div>
      <div className={styles["input-container"]}>
        <label htmlFor="">Structure</label>
        <input
          type="text"
          defaultValue={hasPlannedLesson ? nextLessonInfo.structure : ""}
          ref={structureRef}
        />
      </div>
      <div className={styles["input-container"]}>
        <label htmlFor="">Social</label>
        <input
          type="text"
          defaultValue={hasPlannedLesson ? nextLessonInfo.social : ""}
          ref={socialRef}
        />
      </div>
      <div className={styles["input-container"]}>
        <label htmlFor="">Extra</label>
        <input
          type="text"
          defaultValue={hasPlannedLesson ? nextLessonInfo.extra : ""}
          ref={extraRef}
        />
      </div>

      {hasPlannedLesson && (
        <div className={styles["input-container"]}>
          <label htmlFor="">Lesson Status</label>
          <select ref={statusRef}>
            <option defaultValue="done">done</option>
            <option defaultValue="cancelled">cancelled</option>
            <option defaultValue="postponed">postponed</option>
            <option defaultValue="ghosted">ghosted</option>
          </select>
        </div>
      )}

      <Button
        classes="button--white"
        type="submit"
        text={hasPlannedLesson ? "Conclude" : "Plan"}
      />
    </form>
  );
}

export default LessonForm;
