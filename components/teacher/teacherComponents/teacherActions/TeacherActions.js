import styles from "./TeacherActions.module.css";

import Container from "react-bootstrap/Container";

import Backdrop from "../../../ui/components/backdrop/Backdrop.js";

import LessonActions from "./lessonActions/LessonActions.js";
import AssignmentAction from "./assignmentActions/AssignmentAction.js";

function TeacherActions({
  teacher,
  selectedStudent,
  setSelectedStudent,
  displayActionForm,
  setDisplayActionForm,
  http,
  fetchStudents,
  isMobile,
}) {
  return (
    <>
      <Backdrop onClick={setDisplayActionForm.bind(null, null)} />

      <Container fluid className={styles["teacher-actions"]}>
        {displayActionForm === "lesson" && (
          <LessonActions
            teacher={teacher}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            setDisplayActionForm={setDisplayActionForm}
            http={http}
            fetchStudents={fetchStudents}
            isMobile={isMobile}
          />
        )}
        {displayActionForm === "assignment" && (
          <AssignmentAction
            teacher={teacher}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            setDisplayActionForm={setDisplayActionForm}
            http={http}
            fetchStudents={fetchStudents}
            isMobile={isMobile}
          />
        )}
      </Container>
    </>
  );
}

export default TeacherActions;
