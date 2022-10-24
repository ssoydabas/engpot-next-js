import { useState, useEffect } from "react";
import styles from "./StudentPanel.module.css";

import useWindowDimensions from "../../hooks/useWindowDimensions.js";

import Container from "react-bootstrap/Container";

import StudentMenu from "./studentComponents/studentMenu/StudentMenu.js";
import NextLesson from "./studentComponents/nextLesson/NextLesson.js";
import Histories from "./studentComponents/histories/Histories.js";
import Statistics from "./studentComponents/statistics/Statistics.js";

function StudentPanel({
  student,
  lessonHistory,
  assignmentHistory,
  fetchAssignmentHistory,
  http,
}) {
  const [isMobile, setIsMobile] = useState(true);
  const [historyMode, setHistoryMode] = useState("lesson");
  const toggleHistoryMode = () => {
    let target = historyMode === "lesson" ? "assignment" : "lesson";
    setHistoryMode(target);
  };
  const [displayStatistics, setDisplayStatistics] = useState(false);

  const windowDimensions = useWindowDimensions();
  useEffect(() => {
    if (windowDimensions) {
      if (windowDimensions.width <= 480) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, [windowDimensions]);

  return (
    <Container fluid className={styles["student-panel"]}>
      <StudentMenu
        student={student}
        historyMode={historyMode}
        toggleHistoryMode={toggleHistoryMode}
        setDisplayStatistics={setDisplayStatistics}
      />
      {student && (
        <>
          <NextLesson student={student} />
          <Histories
            student={student}
            historyMode={historyMode}
            lessonHistory={lessonHistory}
            assignmentHistory={assignmentHistory}
            isMobile={isMobile}
            http={http}
          />
        </>
      )}
      {displayStatistics && (
        <Statistics
          student={student}
          setDisplayStatistics={setDisplayStatistics}
          isMobile={isMobile}
        />
      )}
    </Container>
  );
}

export default StudentPanel;
