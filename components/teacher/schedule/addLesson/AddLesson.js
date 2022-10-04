import React, { Fragment, useRef } from "react";
import styles from "./AddLesson.module.css";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../store/feedback/feedback";

import Button from "../../../ui/components/button/Button";
import Backdrop from "../../../ui/components/backdrop/Backdrop";

import convertIsoToObject from "../../../../util/dataHelpers/convertTimestamp";

function AddLesson(props) {
  const dispatch = useDispatch();

  const studentRef = useRef();

  const { teacher } = props;
  const { setTeacher } = props;
  const { addLesson } = props;
  const { setAddLesson } = props;
  const { httpFunctions } = props;

  let lessonInformation;
  if (addLesson) {
    const start = convertIsoToObject(addLesson.start.toISOString());
    const end = convertIsoToObject(addLesson.end.toISOString());
    lessonInformation = { start, end };
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      userId: teacher._id,
      action: "add",
      event: {
        title: studentRef.current.value,
        start: addLesson.start,
        end: addLesson.end,
      },
    };

    const requestConfig = {
      url: `${process.env.API_URL}/publicSchedule/update`,
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
      dispatch(feedbackActions.setMessage(message));
      setAddLesson(null);
      setTeacher({ ...teacher });
    };
    httpFunctions.sendRequest(requestConfig, dataProcessingLogic);
  };

  const cancelAddition = () => {
    setAddLesson(null);
  };

  return (
    <Fragment>
      <Backdrop onClick={cancelAddition} />
      <form className={styles["add-lesson"]} onSubmit={onSubmitHandler}>
        <div className={styles["title"]}>Plan a Lesson</div>
        <div className={`${styles["information"]} card highlight--dark`}>
          <div className={styles["starts"]}>
            <div>Starts:</div>
            <div>{`${lessonInformation.start.hour} : ${lessonInformation.start.minute} | ${lessonInformation.start.monthName} ${lessonInformation.start.day} ${lessonInformation.start.year} `}</div>
          </div>
          <div className={styles["ends"]}>
            <div>Ends:</div>
            <div>{`${lessonInformation.end.hour} : ${lessonInformation.end.minute} | ${lessonInformation.end.monthName} ${lessonInformation.end.day} ${lessonInformation.end.year} `}</div>
          </div>
        </div>
        <div className={styles["input-div"]}>
          <label htmlFor="">Student Name:</label>
          <input type={"text"} ref={studentRef} autoFocus={true} />
        </div>
        <Button type="submit" classes="button--white" text="Plan" />
      </form>
    </Fragment>
  );
}

export default AddLesson;
