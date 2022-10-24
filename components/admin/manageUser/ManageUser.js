import { useRef } from "react";
import styles from "./ManageUser.module.css";

import { useSelector, useDispatch } from "react-redux";
import { feedbackActions } from "../../../store/feedback/feedback.js";

import useWindowDimensions from "../../../hooks/useWindowDimensions.js";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import RemoveTeacher from "./removeTeacher/RemoveTeacher.js";
import AssignStudent from "./assignStudent/AssignStudent.js";

import Backdrop from "../../ui/components/backdrop/Backdrop.js";
import Button from "../../ui/components/button/Button.js";

import Exit from "../../../public/svg/Exit.js";

function ManageUser({
  classifiedUsers,
  userToManage,
  setUserToManage,
  refreshUsersHandler,
  http,
}) {
  const dispatch = useDispatch();
  const { authentication } = useSelector((state) => state);

  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const statusRef = useRef();
  const lessonsTakenRef = useRef();
  const speakingLessonsTakenRef = useRef();
  const engPotTokenRef = useRef();
  const lessonsEarnedRef = useRef();
  const lessonsCancelledRef = useRef();
  const lessonsPostponedRef = useRef();
  const lessonsGhostedRef = useRef();
  const engPotCreditsRef = useRef();
  const studentPlanRef = useRef();
  const studentLevelRef = useRef();

  const windowDimensions = useWindowDimensions();

  const editRequestHandler = (e) => {
    e.preventDefault();

    const data = {
      userId: userToManage._id,
      personalInfo: {
        name: nameRef.current.value,
        surname: surnameRef.current.value,
        emailInfo: {
          email: emailRef.current.value,
        },
      },
      engPotInfo: {
        status: statusRef.current.value,
        studentPlan: studentPlanRef.current.value,
        studentLevel: studentLevelRef.current.value,
        engPotDetails: {
          lessonsTaken: lessonsTakenRef.current.value,
          speakingLessonsTaken: speakingLessonsTakenRef.current.value,
          engPotToken: engPotTokenRef.current.value,
          lessonsEarned: lessonsEarnedRef.current.value,
          lessonsCancelled: lessonsCancelledRef.current.value,
          lessonsPostponed: lessonsPostponedRef.current.value,
          lessonsGhosted: lessonsGhostedRef.current.value,
          engPotCredits: engPotCreditsRef.current.value,
        },
      },
      adminId: authentication.user._id,
    };
    const requestConfig = {
      url: `${process.env.API_URL}/editUserInfo`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
      body: data,
    };
    const dataProcessingLogic = async (data) => {
      http.setIsLoading(false);
      const { message } = data;
      dispatch(feedbackActions.setMessage(message));
      setUserToManage(false);
      refreshUsersHandler();
    };

    http.sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <>
      {windowDimensions.width <= 480 && (
        <Exit
          className={styles["x-button"]}
          fill={"#fff"}
          onClick={setUserToManage.bind(null, null)}
        />
      )}
      {windowDimensions.width > 480 && (
        <Backdrop onClick={setUserToManage.bind(null, null)} />
      )}
      <Form
        className={styles["manage-user-container"]}
        onSubmit={editRequestHandler}
      >
        <Form.Group className={styles["name-surname"]}>
          <Form.Control
            type="text"
            defaultValue={userToManage.personalInfo.name}
            ref={nameRef}
          />
          <Form.Control
            type="text"
            defaultValue={userToManage.personalInfo.surname}
            ref={surnameRef}
          />
        </Form.Group>

        <Form.Group className={styles["email-status"]}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              defaultValue={userToManage.personalInfo.emailInfo.email}
              ref={emailRef}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Group
              as={"select"}
              defaultValue={userToManage.engPotInfo.status}
              ref={statusRef}
            >
              <option defaultValue="user">user</option>
              <option defaultValue="student">student</option>
              <option defaultValue="teacher">teacher</option>
              <option defaultValue="admin">admin</option>
            </Form.Group>
          </Form.Group>
        </Form.Group>

        <Container fluid className={styles["engpot-info"]}>
          <section className={styles["assign-remove"]}>
            {userToManage.engPotInfo.status === "student" && (
              <RemoveTeacher
                userToManage={userToManage}
                setUserToManage={setUserToManage}
                refreshUsersHandler={refreshUsersHandler}
                http={http}
              />
            )}
            {userToManage.engPotInfo.status === "teacher" && (
              <AssignStudent
                userToManage={userToManage}
                setUserToManage={setUserToManage}
                students={classifiedUsers.students}
                refreshUsersHandler={refreshUsersHandler}
                http={http}
              />
            )}
          </section>

          <Container fluid className={styles["engpot-details"]}>
            <div className={styles["column"]}>
              <Form.Group>
                <Form.Label>Lessons Taken</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={
                    userToManage.engPotInfo.engPotDetails.lessonsTaken
                  }
                  ref={lessonsTakenRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Speaking Lessons Taken</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={
                    userToManage.engPotInfo.engPotDetails.speakingLessonsTaken
                  }
                  ref={speakingLessonsTakenRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Engpot Tokens</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={
                    userToManage.engPotInfo.engPotDetails.engPotToken
                  }
                  ref={engPotTokenRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Lessons Earned</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={
                    userToManage.engPotInfo.engPotDetails.lessonsEarned
                  }
                  ref={lessonsEarnedRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Lessons Cancelled</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={
                    userToManage.engPotInfo.engPotDetails.lessonsCancelled
                  }
                  ref={lessonsCancelledRef}
                />
              </Form.Group>
            </div>

            <div className={styles["column"]}>
              <Form.Group>
                <label>Lessons Postponed</label>
                <input
                  type="number"
                  defaultValue={
                    userToManage.engPotInfo.engPotDetails.lessonsPostponed
                  }
                  ref={lessonsPostponedRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Lessons Ghosted</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={
                    userToManage.engPotInfo.engPotDetails.lessonsGhosted
                  }
                  ref={lessonsGhostedRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Engpot Credits</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={
                    userToManage.engPotInfo.engPotDetails.engPotCredits
                  }
                  ref={engPotCreditsRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Student Plan</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userToManage.engPotInfo.studentPlan}
                  ref={studentPlanRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Student Level</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userToManage.engPotInfo.studentLevel}
                  ref={studentLevelRef}
                />
              </Form.Group>
            </div>
          </Container>
        </Container>

        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default ManageUser;
