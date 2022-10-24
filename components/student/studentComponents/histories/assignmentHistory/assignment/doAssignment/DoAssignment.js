import { useRef } from "react";
import styles from "./DoAssignment.module.css";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../../../../store/feedback/Feedback";

import Form from "react-bootstrap/Form";

import Button from "../../../../../../ui/components/button/Button";

function DoAssignment({
  student,
  assignment,
  setShowAssignment,
  fetchAssignmentHistoryHandler,
  http,
}) {
  const dispatch = useDispatch();

  const studentTitleRef = useRef();
  const studentAnswerRef = useRef();

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
      http.setIsLoading(false);
      const { message } = data;
      dispatch(feedbackActions.setMessage(message));
      fetchAssignmentHistoryHandler(student._id);
      setShowAssignment(null);
    };
    http.sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <div className={styles["do-assignment"]}>
      <Form.Group className={styles["input-container"]}>
        <Form.Label>Enter a Title</Form.Label>
        <Form.Control type={"text"} ref={studentTitleRef} />
      </Form.Group>
      <Form.Group
        className={`${styles["input-container"]} ${styles["textarea-container"]}`}
      >
        <Form.Label>Enter an Answer</Form.Label>
        <Form.Control as={"textarea"} rows={14} ref={studentAnswerRef} />
      </Form.Group>
      <Button type={"button"} onClick={onSubmitHandler}>
        Submit
      </Button>
    </div>
  );
}

export default DoAssignment;
