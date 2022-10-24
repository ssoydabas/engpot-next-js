import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { feedbackActions } from "../../store/feedback/Feedback";

import useHttp from "../../hooks/useHttp";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import SchedulePanel from "../../components/schedule/SchedulePanel";

import Error from "../../components/ui/components/error/Error";
import LoadingSpinner from "../../components/ui/components/loadingSpinner/LoadingSpinner";

function Schedule() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [teacher, setTeacher] = useState(null);
  const [teacherSchedule, setTeacherSchedule] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const windowDimensions = useWindowDimensions();
  const window_width = windowDimensions && windowDimensions.width;

  useEffect(() => {
    if (window_width <= 480) {
      setIsMobile(true);
    } else setIsMobile(false);
  }, [window_width]);

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
    const url = new URL(`${process.env.API_URL}/publicSchedule/fetch`);
    url.searchParams.append("userId", teacherId);

    const requestConfig = {
      url,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
    };
    const dataProcessingLogic = (data) => {
      setIsLoading(false);
      const { publicSchedule } = data;
      setTeacherSchedule(publicSchedule);
    };

    sendRequest(requestConfig, dataProcessingLogic);
  };

  useEffect(() => {
    if (teacher) {
      fetchTeacherSchedule(teacher._id);
    }
  }, [teacher]);

  const closeErrorAndReload = () => {
    setHttpError(false);
    fetchTeacherSchedule(teacher._id);
  };

  return (
    <>
      {httpError && <Error text={httpError} onClick={closeErrorAndReload} />}
      {isLoading && <LoadingSpinner />}

      <SchedulePanel
        teacher={teacher}
        setTeacher={setTeacher}
        teacherSchedule={teacherSchedule}
        http={http}
        isMobile={isMobile}
      />
    </>
  );
}

export default Schedule;
