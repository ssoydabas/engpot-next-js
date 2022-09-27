import React, { Fragment, useRef } from "react";
import styles from "./DoAssignment.module.css";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../../../../store/feedback/feedback";

import Button from "../../../../../../ui/components/button/Button";

function DoAssignment(props) {
  const dispatch = useDispatch();

  const studentTitleRef = useRef();
  const studentAnswerRef = useRef();

  const { student } = props;
  const { assignment } = props;
  const { setAssignmentDetails } = props;
  const { fetchAssignmentHistory } = props;
  const { httpFunctions } = props;

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      assignmentId: assignment._id,
      studentId: student._id,
      assignmentTitle: studentTitleRef.current.value,
      assignmentAnswer: studentAnswerRef.current.value,
    };

    const requestConfig = {
      url: `${process.env.API_URL}/doAssignment`,
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
      fetchAssignmentHistory(student._id);
      setAssignmentDetails(null);
    };
    httpFunctions.sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <Fragment>
      <form className={`${styles["do-assignment"]} card`}>
        <div className={styles["input-container"]}>
          <label htmlFor="">Enter a title</label>
          <input type="text" placeholder="Here" ref={studentTitleRef} />
        </div>
        <div className={`${styles["input-container"]} ${styles["textarea"]}`}>
          <label htmlFor="">Enter your answer</label>
          <textarea ref={studentAnswerRef}></textarea>
        </div>
        <Button
          classes="button--white"
          type="submit"
          text="Submit"
          onClick={onSubmitHandler}
        />
      </form>
    </Fragment>
  );
}

export default DoAssignment;
