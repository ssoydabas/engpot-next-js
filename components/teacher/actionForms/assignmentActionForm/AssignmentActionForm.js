import React, { useRef } from "react";
import styles from "./AssignmentActionForm.module.css";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../store/feedback/feedback";

import Button from "../../../ui/components/button/Button";

function LessonForm(props) {
  const dispatch = useDispatch();

  const titleRef = useRef();
  const instructionsRef = useRef();
  const deadlineRef = useRef();

  const { teacher } = props;
  const { chosenStudent } = props;
  const { setChosenStudent } = props;
  const { setDisplayActionForm } = props;
  const { httpFunctions } = props;
  const { fetchStudents } = props;

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      teacherId: teacher._id,
      studentId: chosenStudent._id,
      assignmentTitle: titleRef.current.value,
      assignmentInstructions: instructionsRef.current.value,
      assignmentDeadline: deadlineRef.current.value,
    };

    const requestConfig = {
      url: `${process.env.API_URL}/addAssignment`,
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
      <div className={styles["title"]}>Assign a Task</div>
      <div className={styles["input-container"]}>
        <label htmlFor="">Assignment Title</label>
        <input type="text" ref={titleRef} />
      </div>
      <div className={styles["input-container"]}>
        <label htmlFor="">Assignment Instructions</label>
        <input type="text" ref={instructionsRef} />
      </div>
      <div className={`${styles["input-container"]} ${styles["date-time"]}`}>
        <label htmlFor="">Deadline</label>
        <input type="date" ref={deadlineRef} />
      </div>

      <Button classes="button--white" type="submit" text="Assign" />
    </form>
  );
}

export default LessonForm;
