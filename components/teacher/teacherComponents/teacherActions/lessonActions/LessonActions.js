import { useRef } from "react";
import styles from "./LessonActions.module.css";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../../store/feedback/feedback.js";

import ISO_to_Object from "../../../../../util/ISO_to_Obj.js";

import Form from "react-bootstrap/Form";

import Button from "../../../../ui/components/button/Button.js";

function LessonActions({
  teacher,
  selectedStudent,
  setSelectedStudent,
  setDisplayActionForm,
  http,
  fetchStudents,
  isMobile,
}) {
  const dispatch = useDispatch();

  const dateRef = useRef();
  const timeRef = useRef();
  const tenseRef = useRef();
  const structureRef = useRef();
  const socialRef = useRef();
  const extraRef = useRef();
  const statusRef = useRef();

  const hasPlannedLesson = selectedStudent
    ? selectedStudent.engPotInfo.nextLesson.hasPlannedLesson
    : null;
  let nextLessonInfo;
  if (hasPlannedLesson) {
    const dateObject = ISO_to_Object(
      selectedStudent.engPotInfo.nextLesson.date
    );
    nextLessonInfo = {
      date: `${dateObject.year}-${dateObject.month}-${dateObject.day}`,
      time: `${dateObject.hour}:${dateObject.minute}`,
      social: selectedStudent.engPotInfo.nextLesson.subjects.social,
      tense: selectedStudent.engPotInfo.nextLesson.subjects.tense,
      structure: selectedStudent.engPotInfo.nextLesson.subjects.structure,
      extra: selectedStudent.engPotInfo.nextLesson.subjects.extra,
    };
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const date = dateRef.current.value;
    const time = timeRef.current.value;

    let timestamp;
    if (date && time) {
      timestamp = new Date(
        date.split("-")[0],
        date.split("-")[1] - 1,
        date.split("-")[2],
        time.split(":")[0],
        time.split(":")[1]
      );
    }

    const data = {
      studentId: selectedStudent._id,
      teacherId: teacher._id,
      date,
      time,
      timestamp,
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
    <Form className={styles["form"]} onSubmit={onSubmitHandler}>
      {isMobile && (
        <div
          className={styles["x-button"]}
          onClick={setDisplayActionForm.bind(null, null)}
        >
          X
        </div>
      )}
      <div className={styles["title"]}>
        {hasPlannedLesson ? "Conclude Lesson" : "Plan Lesson"}
      </div>
      <section className={styles["engpot-credits"]}>
        <span>EngPot Credits:</span>
        <span>{selectedStudent.engPotInfo.engPotDetails.engPotCredits}</span>
      </section>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type={"date"}
          defaultValue={hasPlannedLesson ? nextLessonInfo.date : ""}
          ref={dateRef}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Time</Form.Label>
        <Form.Control
          type={"time"}
          defaultValue={hasPlannedLesson ? nextLessonInfo.time : ""}
          ref={timeRef}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Tense</Form.Label>
        <Form.Control
          type="text"
          defaultValue={hasPlannedLesson ? nextLessonInfo.tense : ""}
          ref={tenseRef}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Structure</Form.Label>
        <Form.Control
          type="text"
          defaultValue={hasPlannedLesson ? nextLessonInfo.structure : ""}
          ref={structureRef}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Social</Form.Label>
        <Form.Control
          type="text"
          defaultValue={hasPlannedLesson ? nextLessonInfo.social : ""}
          ref={socialRef}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Extra</Form.Label>
        <Form.Control
          type="text"
          defaultValue={hasPlannedLesson ? nextLessonInfo.extra : ""}
          ref={extraRef}
        />
      </Form.Group>
      {hasPlannedLesson && (
        <Form.Group>
          <Form.Label>Lesson Status</Form.Label>
          <Form.Control as={"select"} ref={statusRef}>
            <option defaultValue="done">done</option>
            <option defaultValue="cancelled">cancelled</option>
            <option defaultValue="postponed">postponed</option>
            <option defaultValue="ghosted">ghosted</option>
          </Form.Control>
        </Form.Group>
      )}

      <Button type="submit">{hasPlannedLesson ? "Conclude" : "Plan"}</Button>
    </Form>
  );
}

export default LessonActions;
