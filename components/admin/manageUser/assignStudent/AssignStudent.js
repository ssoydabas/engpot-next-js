import React, { useRef } from "react";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../store/feedback/feedback.js";

import Button from "../../../ui/components/button/Button.js";

const filterStudents = (students) => {
  const filteredStudents = students.filter(
    (student) => !student.engPotInfo.hasTeacher
  );
  return filteredStudents.map((student) => {
    return {
      name: student.personalInfo.name,
      surname: student.personalInfo.surname,
      studentId: student._id,
    };
  });
};

function AssignStudent({
  students,
  userToManage,
  setUserToManage,
  refreshUsersHandler,
  http,
}) {
  const dispatch = useDispatch();
  const selectRef = useRef();

  students = filterStudents(students);

  const assignStudentHandler = () => {
    if (selectRef.current.children.length !== 0) {
      const studentId =
        selectRef.current.children[selectRef.current.selectedIndex].id;

      const data = {
        teacherId: userToManage._id,
        studentId: studentId,
      };

      const requestConfig = {
        url: `${process.env.API_URL}/v1/admin/createTeacherStudent`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "authenticationToken"
          )}`,
        },
        body: data,
      };
      const dataProcessingLogic = ({message}) => {
        http.setIsLoading(false);
        dispatch(feedbackActions.setMessage(message));
        setUserToManage(null);
        refreshUsersHandler();
      };
      http.sendRequest(requestConfig, dataProcessingLogic);
    } else {
      http.setHttpError("There is no student to assign.");
    }
  };

  return (
    <>
      <div>Use here to assign students</div>
      <select ref={selectRef}>
        {students
          ? students.map((student) => (
              <option
                id={student.studentId}
                key={student.studentId}
              >{`${student.name} ${student.surname}`}</option>
            ))
          : null}
      </select>
      <Button type="button" onClick={assignStudentHandler}>
        Assign Student
      </Button>
    </>
  );
}

export default AssignStudent;
