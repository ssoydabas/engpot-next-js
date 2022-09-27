import React, { useRef } from "react";
import styles from "./NameSurnameForm.module.css";

import Button from "../../../ui/components/button/Button";

function NameSurnameForm(props) {
  const userIdRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();

  const { user } = props;
  const { setFormData } = props;
  const { changeNameRequest } = props;
  const { setDisplayForm } = props;

  const formDataHandler = () => {
    setFormData({
      userId: userIdRef.current.value,
      newName: nameRef.current.value,
      newSurname: surnameRef.current.value,
    });
  };

  return (
    <form
      className={styles["form"]}
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        changeNameRequest(), setDisplayForm(false);
      }}
    >
      <input
        type="hidden"
        name="userId"
        value={user ? user._id : ""}
        ref={userIdRef}
      />
      <div>Edit Personal Info</div>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="newName"
            defaultValue={user.personalInfo.name}
            ref={nameRef}
            onChange={formDataHandler}
          />
        </div>
        <div>
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            name="newSurname"
            defaultValue={user.personalInfo.surname}
            ref={surnameRef}
            onChange={formDataHandler}
          />
        </div>
      </div>

      <Button classes="button--white" type="submit" text="Submit" />
    </form>
  );
}

export default NameSurnameForm;
