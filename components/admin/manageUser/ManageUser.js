import React, { useRef } from "react";
import styles from "./ManageUser.module.css";

import { useSelector, useDispatch } from "react-redux";
import { feedbackActions } from "../../../store/feedback/feedback";

import RemoveTeacher from "./removeTeacher/RemoveTeacher";
import AssignStudent from "./assignStudent/AssignStudent";

import Button from "../../ui/components/button/Button";

function ManageUser(props) {
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

  const { classifiedUsers } = props;
  const { userToManage } = props;
  const { setUserToManage } = props;
  const { refreshUsersHandler } = props;
  const { httpFunctions } = props;

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
      httpFunctions.setIsLoading(false);
      const { message } = data;
      dispatch(feedbackActions.setMessage(message));
      setUserToManage(false);
      refreshUsersHandler();
    };

    httpFunctions.sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <form
      className={styles["manage-user-container"]}
      onSubmit={editRequestHandler}
    >
      <div className={styles["name-surname"]}>
        <input
          type="text"
          defaultValue={userToManage.personalInfo.name}
          ref={nameRef}
        />
        <input
          type="text"
          defaultValue={userToManage.personalInfo.surname}
          ref={surnameRef}
        />
      </div>
      <div className={styles["email-status"]}>
        <div>
          <label>Email</label>
          <input
            type="email"
            defaultValue={userToManage.personalInfo.emailInfo.email}
            ref={emailRef}
          />
        </div>

        <div>
          <label>Status</label>
          <select defaultValue={userToManage.engPotInfo.status} ref={statusRef}>
            <option defaultValue="user">user</option>
            <option defaultValue="student">student</option>
            <option defaultValue="teacher">teacher</option>
            <option defaultValue="admin">admin</option>
          </select>
        </div>
      </div>

      <div className={styles["engpot-info"]}>
        <section className={styles["assign-remove"]}>
          {userToManage.engPotInfo.status === "student" && (
            <RemoveTeacher
              userToManage={userToManage}
              setUserToManage={setUserToManage}
              refreshUsersHandler={refreshUsersHandler}
              httpFunctions={httpFunctions}
            />
          )}
          {userToManage.engPotInfo.status === "teacher" && (
            <AssignStudent
              userToManage={userToManage}
              setUserToManage={setUserToManage}
              students={classifiedUsers.students}
              refreshUsersHandler={refreshUsersHandler}
              httpFunctions={httpFunctions}
            />
          )}
        </section>

        <div className={styles["engpot-details"]}>
          <div className={styles["left-side"]}>
            <div>
              <label>Lessons Taken</label>
              <input
                type="number"
                defaultValue={
                  userToManage.engPotInfo.engPotDetails.lessonsTaken
                }
                ref={lessonsTakenRef}
              />
            </div>
            <div>
              <label>Speaking Lessons Taken</label>
              <input
                type="number"
                defaultValue={
                  userToManage.engPotInfo.engPotDetails.speakingLessonsTaken
                }
                ref={speakingLessonsTakenRef}
              />
            </div>
            <div>
              <label>Engpot Tokens</label>
              <input
                type="number"
                defaultValue={userToManage.engPotInfo.engPotDetails.engPotToken}
                ref={engPotTokenRef}
              />
            </div>
            <div>
              <label>Lessons Earned</label>
              <input
                type="number"
                defaultValue={
                  userToManage.engPotInfo.engPotDetails.lessonsEarned
                }
                ref={lessonsEarnedRef}
              />
            </div>
            <div>
              <label>Lessons Cancelled</label>
              <input
                type="number"
                defaultValue={
                  userToManage.engPotInfo.engPotDetails.lessonsCancelled
                }
                ref={lessonsCancelledRef}
              />
            </div>
          </div>

          <div className={styles["right-side"]}>
            <div>
              <label>Lessons Postponed</label>
              <input
                type="number"
                defaultValue={
                  userToManage.engPotInfo.engPotDetails.lessonsPostponed
                }
                ref={lessonsPostponedRef}
              />
            </div>
            <div>
              <label>Lessons Ghosted</label>
              <input
                type="number"
                defaultValue={
                  userToManage.engPotInfo.engPotDetails.lessonsGhosted
                }
                ref={lessonsGhostedRef}
              />
            </div>
            <div>
              <label>Engpot Credits</label>
              <input
                type="number"
                defaultValue={
                  userToManage.engPotInfo.engPotDetails.engPotCredits
                }
                ref={engPotCreditsRef}
              />
            </div>
            <div>
              <label>Student Plan</label>
              <input
                type="text"
                defaultValue={userToManage.engPotInfo.studentPlan}
                ref={studentPlanRef}
              />
            </div>
            <div>
              <label>Student Level</label>
              <input
                type="text"
                defaultValue={userToManage.engPotInfo.studentLevel}
                ref={studentLevelRef}
              />
            </div>
          </div>
        </div>
      </div>

      <Button classes="button--white" type="submit" text="Submit" />
    </form>
  );
}

export default ManageUser;
