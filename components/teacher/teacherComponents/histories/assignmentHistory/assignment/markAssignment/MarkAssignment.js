import { useRef } from "react";
import styles from "./MarkAssignment.module.css";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../../../../store/feedback/feedback.js";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import Backdrop from "../../../../../../ui/components/backdrop/Backdrop.js";
import Button from "../../../../../../ui/components/button/Button.js";

function MarkAssignment({
  assignment,
  setShowAssignment,
  setMarkAssignment,
  fetchAssignmentHistoryHandler,
  http,
}) {
  const dispatch = useDispatch();

  const teacherNoteRef = useRef();
  const teacherMarkRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      assignmentId: assignment._id,
      teacherNote: teacherNoteRef.current.value,
      givenMark: teacherMarkRef.current.value,
    };

    const requestConfig = {
      url: `${process.env.API_URL}/v1/teacher/markTask`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
      body: data,
    };

    const dataProcessingLogic = ({ message }) => {
      http.setIsLoading(false);
      dispatch(feedbackActions.setMessage(message));
      setShowAssignment(null);
      fetchAssignmentHistoryHandler();
    };

    http.sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <>
      <Backdrop onClick={setMarkAssignment.bind(null, false)} />
      <Container fluid className={`${styles["mark-assignment"]}`}>
        <div className={`${styles["student-answer"]} scroll`}>
          {assignment.studentInfo.answer}
        </div>
        <div className={styles["teacher-action"]}>
          <Form.Group className={styles["note"]}>
            <Form.Label htmlFor="">Teacher Note</Form.Label>
            <Form.Control as={"textarea"} ref={teacherNoteRef}></Form.Control>
          </Form.Group>
          <Form.Group className={`${styles["mark"]}`}>
            <Form.Label htmlFor="">Teacher Mark</Form.Label>
            <Form.Control as={"select"} defaultValue={0} ref={teacherMarkRef}>
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
            </Form.Control>
          </Form.Group>
          <Button onClick={onSubmitHandler}>Mark</Button>
        </div>
      </Container>
    </>
  );
}

export default MarkAssignment;
