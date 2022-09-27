import React, { useRef } from "react";
import styles from "./MarkAssignment.module.css";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../../../../../store/feedback/feedback";

import Button from "../../../../../../../ui/components/button/Button";

function MarkAssignment(props) {
  const dispatch = useDispatch();

  const teacherNoteRef = useRef();
  const teacherMarkRef = useRef();

  const { assignment } = props;
  const { setAssignmentDetails } = props;
  const { fetchAssignmentHistoryHandler } = props;
  const { httpFunctions } = props;

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      assignmentId: assignment._id,
      teacherNote: teacherNoteRef.current.value,
      givenMark: teacherMarkRef.current.value,
    };

    const requestConfig = {
      url: `${process.env.API_URL}/markAssignment`,
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
      setAssignmentDetails(null);
      fetchAssignmentHistoryHandler();
    };

    httpFunctions.sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <form
      className={`${styles["mark-assignment"]} card highlight--dark`}
      onSubmit={onSubmitHandler}
    >
      <div className={`${styles["student-answer"]} scroll`}>
        {assignment.studentInfo.answer}
      </div>
      <div className={styles["teacher-action"]}>
        <div className={styles["note"]}>
          <label htmlFor="">Teacher Note</label>
          <textarea ref={teacherNoteRef}></textarea>
        </div>
        <div className={`${styles["mark"]}`}>
          <label htmlFor="">Teacher Mark</label>
          <select defaultValue={0} ref={teacherMarkRef}>
            <option>Select</option>
            <option defaultValue={10}>10</option>
            <option defaultValue={9}>9</option>
            <option defaultValue={8}>8</option>
            <option defaultValue={7}>7</option>
            <option defaultValue={6}>6</option>
            <option defaultValue={5}>5</option>
            <option defaultValue={4}>4</option>
            <option defaultValue={3}>3</option>
            <option defaultValue={2}>2</option>
            <option defaultValue={1}>1</option>
            <option defaultValue={0}>0</option>
          </select>
        </div>
        <Button classes="button--white" type="submit" text="Mark" />
      </div>
    </form>
  );
}

export default MarkAssignment;
