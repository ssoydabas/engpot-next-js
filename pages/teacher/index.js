import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import feedbackActions from "../../store/feedback/Feedback";

import useHttp from "../../hooks/useHttp";

import Head from "next/head";

import TeacherPanel from "../../components/teacher/TeacherPanel";

import LoadingSpinner from "../../components/ui/components/loadingSpinner/LoadingSpinner";
import Error from "../../components/ui/components/error/Error";

function Teacher() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState(null);

  const {
    httpError,
    isLoading,
    sendRequest,
    setHttpError,
    setIsLoading,
    closeErrorMessage,
  } = useHttp();

  const http = {
    sendRequest,
    setHttpError,
    setIsLoading,
    closeErrorMessage,
  };

  useEffect(() => {
    // if (typeof window !== "undefined") {
    const teacher_localStorage = JSON.parse(localStorage.getItem("user"));
    if (
      !teacher_localStorage ||
      teacher_localStorage.engPotInfo.status !== "teacher"
    ) {
      dispatch(
        feedbackActions.setMessage("Only teachers have access to this route.")
      );
      router.push("/");
    }
    if (teacher === null) {
      setTeacher(teacher_localStorage);
    }
    // }
  });

  const fetchStudents = (teacherId) => {
    const requestConfig = {
      url: `${process.env.API_URL}/studentsByTeacherId/${teacherId}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
    };
    const dataProcessingLogic = (data) => {
      setIsLoading(false);
      const { students } = data;
      setStudents(students);
    };

    sendRequest(requestConfig, dataProcessingLogic);
  };

  useEffect(() => {
    if (teacher) {
      fetchStudents(teacher._id);
    }
  }, [teacher]);

  return (
    <>
      <Head>
        <title>EngPot - Teacher</title>
        <meta
          name="description"
          content="Manage your students by planning and concluding lessons as well as assigning various tasks."
        />
      </Head>
      {httpError && <Error text={httpError} onClick={closeErrorMessage} />}
      {isLoading && <LoadingSpinner />}
      <TeacherPanel
        teacher={teacher}
        students={students}
        fetchStudents={fetchStudents}
        http={http}
      />
    </>
  );
}

export default Teacher;
