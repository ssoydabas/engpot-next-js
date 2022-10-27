import styles from "./RemoveLesson.module.css";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../store/feedback/feedback.js";

import Form from "react-bootstrap/Form";

import Backdrop from "../../ui/components/backdrop/Backdrop.js";
import Button from "../../ui/components/button/Button.js";

import ISO_to_Obj from "../../../util/ISO_to_Obj.js";

function RemoveLesson({
  teacher,
  setTeacher,
  removeLesson,
  setRemoveLesson,
  http,
}) {
  const dispatch = useDispatch();

  let lessonInformation;
  if (removeLesson) {
    const start = ISO_to_Obj(removeLesson.start.toISOString());
    const end = ISO_to_Obj(removeLesson.end.toISOString());
    lessonInformation = { start, end };
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      userId: teacher._id,
      action: "remove",
      event: {
        id: removeLesson.id,
        title: removeLesson.title,
        start: removeLesson.start,
        end: removeLesson.end,
      },
    };

    const requestConfig = {
      url: `${process.env.API_URL}/v1/schedule/updateSchedule/remove`,
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
      body: data,
    };
    const dataProcessingLogic = ({ message }) => {
      http.setIsLoading(false);
      dispatch(feedbackActions.setMessage(message));
      setRemoveLesson(null);
      setTeacher({ ...teacher });
    };
    http.sendRequest(requestConfig, dataProcessingLogic);
  };

  const cancelRemoval = () => {
    setRemoveLesson(null);
  };

  return (
    <>
      <Backdrop onClick={cancelRemoval} />
      <Form className={styles["remove-lesson"]} onSubmit={onSubmitHandler}>
        <div className={styles["title"]}>Delete a Lesson</div>
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
        <Form.Group className={styles["name-div"]}>
          <Form.Label htmlFor="">Student Name:</Form.Label>
          <div>{removeLesson.title}</div>
        </Form.Group>
        <Button type="submit">Delete</Button>
      </Form>
    </>
  );
}

export default RemoveLesson;
