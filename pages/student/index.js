import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { feedbackActions } from "../../store/feedback/feedback.js";

import useHttp from "../../hooks/useHttp.js";

import Head from "next/head";

import StudentPanel from "../../components/student/StudentPanel.js";

import Error from "../../components/ui/components/error/Error.js";
import LoadingSpinner from "../../components/ui/components/loadingSpinner/LoadingSpinner.js";

function Student() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [student, setStudent] = useState(null);
  const [lessonHistory, setLessonHistory] = useState(null);
  const [assignmentHistory, setAssignmentHistory] = useState(null);

  const {
    httpError,
    isLoading,
    sendRequest,
    setHttpError,
    setIsLoading,
    closeErrorMessage,
  } = useHttp();

  const http = {
    httpError,
    isLoading,
    sendRequest,
    setHttpError,
    setIsLoading,
    closeErrorMessage,
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
    const url = new URL(`${process.env.API_URL}/v1/student/fetchLessonHistory`);
    url.searchParams.append("studentId", studentId);
    const requestConfig = {
      url: url,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
    };
    const dataProcessingLogic = ({ lessonHistory }) => {
      setIsLoading(false);
      setLessonHistory(lessonHistory);
    };
    sendRequest(requestConfig, dataProcessingLogic);
  };

  const fetchAssignmentHistory = async (studentId) => {
    const url = new URL(
      `${process.env.API_URL}/v1/student/fetchAssignmentHistory`
    );
    url.searchParams.append("studentId", studentId);

    const requestConfig = {
      url: url,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
    };
    const dataProcessingLogic = ({ assignmentHistory }) => {
      setIsLoading(false);
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

  return (
    <>
      <Head>
        <title>EngPot - Student</title>
        <meta
          name="description"
          content="See you previous lessons and complete tasks that's been given by your teacher."
        />
      </Head>
      {httpError && <Error text={httpError} onClick={closeErrorMessage} />}
      {isLoading && <LoadingSpinner />}
      <StudentPanel
        student={student}
        setStudent={setStudent}
        lessonHistory={lessonHistory}
        assignmentHistory={assignmentHistory}
        fetchAssignmentHistory={fetchAssignmentHistory}
        http={http}
      />
    </>
  );
}

export default Student;
