import { useState, useEffect } from "react";
import styles from "./TeacherPanel.module.css";

import useWindowDimensions from "../../hooks/useWindowDimensions.js";

import Container from "react-bootstrap/Container";

import StudentSelect from "./teacherComponents/selectStudent/SelectStudent.js";
import TeacherMenu from "./teacherComponents/teacherMenu/TeacherMenu.js";
import NextLesson from "./teacherComponents/nextLesson/NextLesson.js";
import Histories from "./teacherComponents/histories/Histories.js";
import TeacherActions from "./teacherComponents/teacherActions/TeacherActions.js";

function TeacherPanel({ teacher, students, fetchStudents, http }) {
  const [isMobile, setIsMobile] = useState(true);
  const [selectStudentMode, setSelectStudentMode] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [displayActionForm, setDisplayActionForm] = useState(false);

  const [historyMode, setHistoryMode] = useState("lesson");
  const toggleHistoryMode = () => {
    let target = historyMode === "lesson" ? "assignment" : "lesson";
    setHistoryMode(target);
  };

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
    <Container fluid className={`${styles["teacher-panel"]}`}>
      <TeacherMenu
        selectedStudent={selectedStudent}
        setSelectStudentMode={setSelectStudentMode}
        historyMode={historyMode}
        toggleHistoryMode={toggleHistoryMode}
        setDisplayActionForm={setDisplayActionForm}
      />
      {selectStudentMode && (
        <StudentSelect
          students={students}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          setSelectStudentMode={setSelectStudentMode}
          isMobile={isMobile}
        />
      )}
      {selectedStudent && (
        <>
          <NextLesson selectedStudent={selectedStudent} />
          <Histories
            teacher={teacher}
            selectedStudent={selectedStudent}
            historyMode={historyMode}
            toggleHistoryMode={toggleHistoryMode}
            http={http}
          />
          {displayActionForm && (
            <TeacherActions
              teacher={teacher}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              displayActionForm={displayActionForm}
              setDisplayActionForm={setDisplayActionForm}
              http={http}
              fetchStudents={fetchStudents}
              isMobile={isMobile}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default TeacherPanel;
