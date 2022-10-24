import { useState, useEffect } from "react";
import styles from "./Histories.module.css";

import Container from "react-bootstrap/Container";

import LessonHistory from "./lessonHistory/LessonHistory";
import AssignmentHistory from "./assignmentHistory/AssignmentHistory";

function Histories({
  student,
  historyMode,
  lessonHistory,
  assignmentHistory,
  isMobile,
  http,
}) {
  const [teacher, setTeacher] = useState(null);

  const fetchTeacherByStudentId = () => {
    const url = new URL(
      `${process.env.API_URL}/findTeacherByStudentId/${student._id}`
    );

    const requestConfig = {
      url: url,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
    };

    const dataProcessingLogic = (data) => {
      http.setIsLoading(false);
      const { teacher } = data;
      setTeacher(teacher);
    };

    http.sendRequest(requestConfig, dataProcessingLogic);
  };

  useEffect(() => {
    if (student) {
      fetchTeacherByStudentId();
    }
  }, [student]);

  return (
    <Container fluid className={`${styles["histories"]} scroll`}>
      {student && historyMode === "lesson" && (
        <LessonHistory student={student} lessonHistory={lessonHistory} />
      )}
      {student && historyMode === "assignment" && (
        <AssignmentHistory
          student={student}
          teacher={teacher}
          assignmentHistory={assignmentHistory}
          http={http}
          isMobile={isMobile}
        />
      )}
    </Container>
  );
}

export default Histories;
