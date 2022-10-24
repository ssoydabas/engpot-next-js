import styles from "./Histories.module.css";

import Container from "react-bootstrap/Container";

import LessonHistory from "./lessonHistory/LessonHistory.js";
import AssignmentHistory from "./assignmentHistory/AssignmentHistory.js";

function Histories({
  teacher,
  selectedStudent,
  historyMode,
  toggleHistoryMode,
  isMobile,
  http,
}) {
  return (
    <Container fluid className={`${styles["histories"]} scroll`}>
      {selectedStudent && historyMode === "lesson" && (
        <LessonHistory
          teacher={teacher}
          selectedStudent={selectedStudent}
          http={http}
        />
      )}
      {selectedStudent && historyMode === "assignment" && (
        <AssignmentHistory
          teacher={teacher}
          selectedStudent={selectedStudent}
          http={http}
          isMobile={isMobile}
        />
      )}
    </Container>
  );
}

export default Histories;
