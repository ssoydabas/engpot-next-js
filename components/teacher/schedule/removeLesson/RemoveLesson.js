import React, { Fragment } from "react";
import styles from "./RemoveLesson.module.css";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../store/feedback/feedback";

import Button from "../../../ui/components/button/Button";
import Backdrop from "../../../ui/components/backdrop/Backdrop";

import convertIsoToObject from "../../../../util/dataHelpers/convertTimestamp";

function RemoveLesson(props) {
  const dispatch = useDispatch();

  const { teacher } = props;
  const { setTeacher } = props;
  const { removeLesson } = props;
  const { setRemoveLesson } = props;
  const { httpFunctions } = props;

  let lessonInformation;
  if (removeLesson) {
    const start = convertIsoToObject(removeLesson.start.toISOString());
    const end = convertIsoToObject(removeLesson.end.toISOString());
    lessonInformation = { start, end };
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      userId: teacher._id,
      action: "remove",
      event: {
        id: removeLesson.id,
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
      setRemoveLesson(null);
      setTeacher({ ...teacher });
    };
    httpFunctions.sendRequest(requestConfig, dataProcessingLogic);
  };

  const cancelRemoval = () => {
    setRemoveLesson(null);
  };

  return (
    <Fragment>
      <Backdrop onClick={cancelRemoval} />
      <form className={styles["remove-lesson"]} onSubmit={onSubmitHandler}>
        <div className={styles["title"]}>Delete a Lesson</div>
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
        <div className={styles["name-div"]}>
          <label htmlFor="">Student Name:</label>
          <div>{removeLesson.title}</div>
        </div>
        <Button type="submit" classes="button--white" text="Delete" />
      </form>
    </Fragment>
  );
}

export default RemoveLesson;
