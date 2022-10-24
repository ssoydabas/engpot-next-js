import { useRef } from "react";
import styles from "./AddLesson.module.css";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../store/feedback/feedback.js";

import Form from "react-bootstrap/Form";

import Backdrop from "../../ui/components/backdrop/Backdrop.js";
import Button from "../../ui/components/button/Button.js";

import ISO_to_Obj from "../../../util/ISO_to_Obj.js";

function AddLesson({ teacher, setTeacher, addLesson, setAddLesson, http }) {
  const dispatch = useDispatch();

  const studentRef = useRef();

  let lessonInformation;
  if (addLesson) {
    const start = ISO_to_Obj(addLesson.start.toISOString());
    const end = ISO_to_Obj(addLesson.end.toISOString());
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
      http.setIsLoading(false);
      const { message } = data;
      dispatch(feedbackActions.setMessage(message));
      setAddLesson(null);
      setTeacher({ ...teacher });
    };
    http.sendRequest(requestConfig, dataProcessingLogic);
  };

  const cancelAddition = () => {
    setAddLesson(null);
  };

  return (
    <>
      <Backdrop onClick={cancelAddition} />
      <Form className={styles["add-lesson"]} onSubmit={onSubmitHandler}>
        <div className={styles["title"]}>Plan a Lesson</div>
        <div className={`${styles["information"]}`}>
          <div className={styles["starts"]}>
            <div>Starts:</div>
            <div>{`${lessonInformation.start.hour} : ${lessonInformation.start.minute} | ${lessonInformation.start.monthName} ${lessonInformation.start.day} ${lessonInformation.start.year} `}</div>
          </div>
          <div className={styles["ends"]}>
            <div>Ends:</div>
            <div>{`${lessonInformation.end.hour} : ${lessonInformation.end.minute} | ${lessonInformation.end.monthName} ${lessonInformation.end.day} ${lessonInformation.end.year} `}</div>
          </div>
        </div>
        <Form.Group className={styles["input-div"]}>
          <Form.Label htmlFor="">Student Name:</Form.Label>
          <Form.Control type={"text"} ref={studentRef} autoFocus={true} />
        </Form.Group>
        <Button type="submit">Plan</Button>
      </Form>
    </>
  );
}

export default AddLesson;
