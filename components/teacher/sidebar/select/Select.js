import React, { useRef } from "react";
import styles from "./Select.module.css";

function Select(props) {
  const selectRef = useRef();

  const { students } = props;
  const { setChosenStudent } = props;
  const { setDisplayMobileSidebar } = props;

  const onChoose = () => {
    const studentId =
      selectRef.current.children[selectRef.current.selectedIndex].id;
    const [filteredStudent] = students.filter(
      (student) => student._id === studentId
    );
    setChosenStudent(filteredStudent);
    setDisplayMobileSidebar(false);
  };

  return (
    <div className={`${styles["container"]} card highlight--dark`}>
      <div className={styles["title"]}>
        <span>Choose</span>
        <span>a student</span>
      </div>
      <select ref={selectRef} onChange={onChoose}>
        <option>SELECT</option>
        {students &&
          students.map((student) => (
            <option
              key={student._id}
              id={student._id}
            >{`${student.personalInfo.name} ${student.personalInfo.surname}`}</option>
          ))}
      </select>
    </div>
  );
}

export default Select;
