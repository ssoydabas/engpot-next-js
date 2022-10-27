import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../store/feedback/feedback.js";

import Button from "../../../ui/components/button/Button.js";

function RemoveTeacher({
  userToManage,
  setUserToManage,
  refreshUsersHandler,
  http,
}) {
  const dispatch = useDispatch();
  const [teacherObject, setTeacherObject] = useState(null);

  useEffect(() => {
    const requestConfig = {
      url: `${process.env.API_URL}/v1/admin/findTeacherByStudentId/${userToManage._id}`,
    };
    const dataProcessingLogic = ({ teacher }) => {
      http.setIsLoading(false);
      setTeacherObject(teacher);
    };
    http.sendRequest(requestConfig, dataProcessingLogic);
  }, []);

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
      url: `${process.env.API_URL}/v1/admin/deleteTeacherStudent`,
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
      setUserToManage(null);
      refreshUsersHandler();
    };
    http.sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <>
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
      <Button type="button" onClick={removeTeacherHandler}>
        Remove Teacher
      </Button>
    </>
  );
}

export default RemoveTeacher;
