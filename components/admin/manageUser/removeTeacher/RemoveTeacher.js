import React, { Fragment, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../store/feedback/feedback";

import useHttp from "../../../../hooks/useHttp";

import Error from "../../../ui/components/error/Error";
import LoadingSpinner from "../../../ui/components/loadingSpinner/LoadingSpinner";
import Button from "../../../ui/components/button/Button";

function RemoveTeacher(props) {
  const dispatch = useDispatch();
  const [teacherObject, setTeacherObject] = useState(null);

  const { httpError, isLoading, sendRequest, setHttpError, setIsLoading } =
    useHttp();

  useEffect(() => {
    const requestConfig = {
      url: `${process.env.API_URL}/findTeacherByStudentId/${userToManage._id}`,
    };
    const dataProcessingLogic = (data) => {
      setIsLoading(false);
      const { teacher } = data;
      setTeacherObject(teacher);
    };
    sendRequest(requestConfig, dataProcessingLogic);
  }, []);

  const { userToManage } = props;
  const { setUserToManage } = props;
  const { refreshUsersHandler } = props;

  const removeTeacherHandler = () => {
    if (!teacherObject || !teacherObject._id) {
      dispatch(
        feedbackActions.setMessage("Student doesn't have a teacher yet.")
      );
      setUserToManage(null);

      return;
    }
    
    const data = {
      studentId: userToManage._id,
      teacherId: teacherObject._id,
    };

    const requestConfig = {
      url: `${process.env.API_URL}/removeTeacherFromStudent`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
      body: data,
    };
    const dataProcessingLogic = (data) => {
      setIsLoading(false);
      const { message } = data;
      dispatch(feedbackActions.setMessage(message));
      setUserToManage(null);
      refreshUsersHandler();
    };
    sendRequest(requestConfig, dataProcessingLogic);
  };

  const closeErrorMessageHandler = () => {
    setHttpError(false);
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {httpError && (
        <Error text={httpError} onClick={closeErrorMessageHandler} />
      )}
      <div>Use here to remove teachers</div>
      <select>
        <option
          id={
            teacherObject && typeof teacherObject !== "string"
              ? teacherObject._id
              : null
          }
        >
          {teacherObject && typeof teacherObject !== "string"
            ? `${teacherObject.personalInfo.name} ${teacherObject.personalInfo.surname}`
            : teacherObject}
        </option>
      </select>
      <Button
        classes="button--white"
        type="button"
        text="Remove Teacher"
        onClick={removeTeacherHandler}
      />
    </Fragment>
  );
}

export default RemoveTeacher;
