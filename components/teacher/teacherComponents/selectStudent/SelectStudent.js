import { useRef } from "react";
import styles from "./SelectStudent.module.css";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import Backdrop from "../../../ui/components/backdrop/Backdrop";
import Exit from "../../../../public/svg/Exit";

function SelectStudent({
  students,
  setSelectedStudent,
  setSelectStudentMode,
  isMobile,
}) {
  const selectRef = useRef();

  const onChoose = () => {
    const studentId =
      selectRef.current.children[selectRef.current.selectedIndex].id;
    const [filteredStudent] = students.filter(
      (student) => student._id === studentId
    );
    setSelectedStudent(filteredStudent);
    setSelectStudentMode(false);
  };
  return (
    <Container>
      {!isMobile && (
        <Backdrop onClick={setSelectStudentMode.bind(null, false)} />
      )}
      <Container fluid className={styles["select-student"]}>
        <Form>
          {isMobile && (
            <div className={styles['x-button']} onClick={setSelectStudentMode.bind(null, false)}>X</div>
          )}
          <Form.Label>Select a Student</Form.Label>
          <Form.Control as={"select"} ref={selectRef} onChange={onChoose}>
            <option>SELECT</option>
            {students &&
              students.map((student) => (
                <option
                  key={student._id}
                  id={student._id}
                >{`${student.personalInfo.name} ${student.personalInfo.surname}`}</option>
              ))}
          </Form.Control>
        </Form>
      </Container>
    </Container>
  );
}

export default SelectStudent;
