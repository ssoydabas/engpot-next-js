import React, { Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { feedbackActions } from "../../store/feedback/feedback";

import useHttp from "../../hooks/useHttp";

import Head from "next/head";

import Teacher from "../../components/teacher/Teacher";

import Error from "../../components/ui/components/error/Error";
import LoadingSpinner from "../../components/ui/components/loadingSpinner/LoadingSpinner";

function TeacherPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState(null);

  const { httpError, isLoading, sendRequest, setHttpError, setIsLoading } =
    useHttp();

  const httpFunctions = {
    sendRequest,
    setHttpError,
    setIsLoading,
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

  const closeErrorMessageHandler = () => {
    setHttpError(false);
  };

  return (
    <Fragment>
      <Head>
        <title>EngPot - Teacher</title>
        <meta
          name="description"
          content="Manage your students by planning and concluding lessons as well as assigning various tasks."
        />
      </Head>
      {httpError && (
        <Error text={httpError} onClick={closeErrorMessageHandler} />
      )}
      {isLoading && <LoadingSpinner />}
      <Teacher
        teacher={teacher}
        students={students}
        fetchStudents={fetchStudents}
        httpFunctions={httpFunctions}
      />
    </Fragment>
  );
}

export default TeacherPage;