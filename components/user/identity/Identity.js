import { useState, useRef } from "react";
import styles from "./Identity.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

import Gear from "../../../public/svg/Gear.js";
import Button from "../../ui/components/button/Button.js";

function Identity({ user, changeNameRequest, passwordChangeRequest }) {
  const [editMode, setEditMode] = useState(false);

  const nameRef = useRef();
  const surnameRef = useRef();

  const submitNameChange = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const surname = surnameRef.current.value;

    changeNameRequest(name, surname);

    setEditMode(false);
  };

  const submitPasswordChangeRequest = () => {
    passwordChangeRequest();

    setEditMode(false);
  };

  return (
    <>
      {user && (
        <Container md={4} fluid className={styles["identity"]}>
          <div
            className={styles["settings"]}
            onClick={setEditMode.bind(null, !editMode)}
          >
            <Gear fill={"#000"} />
          </div>

          <Row className={styles["image-wrapper"]}>
            <div className={styles["image"]}></div>
          </Row>

          <Row className={styles["personal-information"]}>
            {!editMode && (
              <div className={styles["name"]}>
                {user.personalInfo.name} {user.personalInfo.surname}
              </div>
            )}
            {editMode && (
              <Form
                className={styles["personal-information-form"]}
                onSubmit={submitNameChange}
              >
                <Form.Control
                  defaultValue={user.personalInfo.name}
                  ref={nameRef}
                />
                <Form.Control
                  defaultValue={user.personalInfo.surname}
                  ref={surnameRef}
                />
                <Button type={"submit"}>Submit</Button>
              </Form>
            )}

            <div className={styles["email"]}>
              {!editMode && user.personalInfo.emailInfo.email}
              {editMode && (
                <Button type={"button"} onClick={submitPasswordChangeRequest}>
                  Request Password Change
                </Button>
              )}
            </div>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Identity;
