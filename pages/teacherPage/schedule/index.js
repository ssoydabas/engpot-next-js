import React, { Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../store/feedback/feedback";

import useHttp from "../../../hooks/useHttp";

import Schedule from "../../../components/teacher/schedule/Schedule";

import Error from "../../../components/ui/components/error/Error";
import LoadingSpinner from "../../../components/ui/components/loadingSpinner/LoadingSpinner";

function TeacherSchedule() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [teacher, setTeacher] = useState(null);
  const [teacherSchedule, setTeacherSchedule] = useState(null);

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

  const fetchTeacherSchedule = (teacherId) => {
    const requestConfig = {
      url: `${process.env.API_URL}/scheduleByTeacherId/${teacherId}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
    };
    const dataProcessingLogic = (data) => {
      setIsLoading(false);
      const { schedule } = data;
      setTeacherSchedule(schedule);
    };

    sendRequest(requestConfig, dataProcessingLogic);
  };

  useEffect(() => {
    if (teacher) {
      fetchTeacherSchedule(teacher._id);
    }
  }, [teacher]);

  const closeErrorMessageHandler = () => {
    setHttpError(false);
  };

  return (
    <Fragment>
      {httpError && (
        <Error text={httpError} onClick={closeErrorMessageHandler} />
      )}
      {isLoading && <LoadingSpinner />}
      <Schedule
        teacher={teacher}
        teacherSchedule={teacherSchedule}
        httpFunctions={httpFunctions}
      />
    </Fragment>
  );
}

export default TeacherSchedule;