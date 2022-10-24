import { useRef } from "react";
import styles from "./AssignmentAction.module.css";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../../store/feedback/feedback.js";

import Form from "react-bootstrap/Form";

import Button from "../../../../ui/components/button/Button.js";

function AssignmentAction({
  teacher,
  selectedStudent,
  setSelectedStudent,
  setDisplayActionForm,
  http,
  fetchStudents,
  isMobile,
}) {
  const dispatch = useDispatch();

  const titleRef = useRef();
  const instructionsRef = useRef();
  const deadlineRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const deadlineDate = deadlineRef.current.value;

    let timestamp;
    if (deadlineDate) {
      timestamp = new Date(
        deadlineDate.split("-")[0],
        deadlineDate.split("-")[1] - 1,
        deadlineDate.split("-")[2]
      );
    }

    const data = {
      teacherId: teacher._id,
      studentId: selectedStudent._id,
      assignmentTitle: titleRef.current.value,
      assignmentInstructions: instructionsRef.current.value,
      assignmentDeadline: deadlineRef.current.value,
      timestamp,
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
      http.setIsLoading(false);
      const { message } = data;
      const { student } = data;
      dispatch(feedbackActions.setMessage(message));
      setDisplayActionForm(false);
      setSelectedStudent(student);
      fetchStudents(teacher._id);
    };
    http.sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <Form className={`${styles["form"]}`} onSubmit={onSubmitHandler}>
      {isMobile && (
        <div
          className={styles["x-button"]}
          onClick={setDisplayActionForm.bind(null, null)}
        >
          X
        </div>
      )}
      <div className={styles["title"]}>Assign a Task</div>
      <Form.Group>
        <Form.Label>Assignment Title</Form.Label>
        <Form.Control type="text" ref={titleRef} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Assignment Instructions</Form.Label>
        <Form.Control type="text" ref={instructionsRef} />
      </Form.Group>
      <Form.Group className={styles["date-time"]}>
        <Form.Label>Deadline</Form.Label>
        <Form.Control type="date" ref={deadlineRef} />
      </Form.Group>

      <Button type={"submit"}>Assign</Button>
    </Form>
  );
}

export default AssignmentAction;
