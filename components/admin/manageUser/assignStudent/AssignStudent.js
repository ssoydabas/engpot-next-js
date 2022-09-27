import React, { Fragment, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../../store/feedback/feedback";

import Button from "../../../ui/components/button/Button";

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

function AssignStudent(props) {
  const dispatch = useDispatch();
  const selectRef = useRef();

  let { students } = props;
  const { userToManage } = props;
  const { setUserToManage } = props;
  const { refreshUsersHandler } = props;
  const { httpFunctions } = props;

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
        url: `${process.env.API_URL}/assignStudentToTeacher`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "authenticationToken"
          )}`,
        },
        body: data,
      };
      const dataProcessingLogic = (data) => {
        httpFunctions.setIsLoading(false);
        const { message } = data;
        dispatch(feedbackActions.setMessage(message));
        setUserToManage(null);
        refreshUsersHandler();
      };
      httpFunctions.sendRequest(requestConfig, dataProcessingLogic);
    } else {
      httpFunctions.setHttpError("There is no student to assign.")
    }
  };

  return (
    <Fragment>
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
      <Button
        classes="button--white"
        type="button"
        text="Assign Student"
        onClick={assignStudentHandler}
      />
    </Fragment>
  );
}

export default AssignStudent;
