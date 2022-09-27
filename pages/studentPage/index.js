import React, { Fragment, useState, useEffect } from "react";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { feedbackActions } from "../../store/feedback/feedback";

import useHttp from "../../hooks/useHttp";

import Student from "../../components/student/Student";

import Error from "../../components/ui/components/error/Error";
import LoadingSpinner from "../../components/ui/components/loadingSpinner/LoadingSpinner";

function StudentPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [student, setStudent] = useState(null);
  const [lessonHistory, setLessonHistory] = useState(null);
  const [assignmentHistory, setAssignmentHistory] = useState(null);

  const { httpError, isLoading, sendRequest, setHttpError, setIsLoading } =
    useHttp();

  const httpFunctions = {
    sendRequest,
    setHttpError,
    setIsLoading,
  };

  useEffect(() => {
    const user_localStorage = JSON.parse(localStorage.getItem("user"));
    if (
      !user_localStorage ||
      user_localStorage.engPotInfo.status !== "student"
    ) {
      dispatch(
        feedbackActions.setMessage("Only students have access to this route.")
      );
      router.push("/");
    }
    if (student === null) {
      setStudent(user_localStorage);
    }
  });

  const fetchLessonHistory = async (studentId) => {
    const url = new URL(`${process.env.API_URL}/getLessonHistory`);
    url.searchParams.append("studentId", studentId);
    const requestConfig = {
      url: url,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ...`,
      },
    };
    const dataProcessingLogic = (data) => {
      setIsLoading(false);
      const { lessonHistory } = data;
      setLessonHistory(lessonHistory);
    };
    sendRequest(requestConfig, dataProcessingLogic);
  };

  const fetchAssignmentHistory = async (studentId) => {
    const url = new URL(`${process.env.API_URL}/getAssignmentHistory`);
    url.searchParams.append("studentId", studentId);

    const requestConfig = {
      url: url,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ...`,
      },
    };
    const dataProcessingLogic = (data) => {
      setIsLoading(false);
      const { assignmentHistory } = data;
      setAssignmentHistory(assignmentHistory);
    };
    sendRequest(requestConfig, dataProcessingLogic);
  };

  useEffect(() => {
    if (student) {
      fetchLessonHistory(student._id);
      fetchAssignmentHistory(student._id);
    }
  }, [student]);

  const closeErrorMessageHandler = () => {
    setHttpError(false);
  };

  return (
    <Fragment>
      {httpError && (
        <Error text={httpError} onClick={closeErrorMessageHandler} />
      )}
      {isLoading && <LoadingSpinner />}
      <Student
        student={student}
        setStudent={setStudent}
        lessonHistory={lessonHistory}
        assignmentHistory={assignmentHistory}
        fetchAssignmentHistory={fetchAssignmentHistory}
        httpFunctions={httpFunctions}
      />
    </Fragment>
  );
}

export default StudentPage;
