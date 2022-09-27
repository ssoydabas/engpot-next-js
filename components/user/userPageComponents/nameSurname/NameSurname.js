import React, { Fragment, useState } from "react";
import styles from "./NameSurname.module.css";

import NameSurnameForm from "./NameSurnameForm";

import Button from "../../../ui/components/button/Button";
import Backdrop from "../../../ui/components/backdrop/Backdrop";

function NameSurname(props) {
  const [displayForm, setDisplayForm] = useState(false);

  const { user } = props;
  const { setFormData } = props;
  const { changeNameRequest } = props;

  return (
    <Fragment>
      {displayForm && (
        <Fragment>
          <Backdrop onClick={setDisplayForm.bind(null, false)} />
          <NameSurnameForm
            user={user}
            setFormData={setFormData}
            changeNameRequest={changeNameRequest}
            setDisplayForm={setDisplayForm}
          />
        </Fragment>
      )}
      <div className={styles["name-surname"]}>
        <div>
          <label>Name</label>
          <div>{user ? user.personalInfo.name : ""}</div>
        </div>
        <div>
          <label>Surname</label>
          <div>{user ? user.personalInfo.surname : ""}</div>
        </div>
        <Button
          type="button"
          classes="button--white"
          text="Change Name and Surname"
          onClick={setDisplayForm.bind(null, true)}
        />
      </div>
    </Fragment>
  );
}

export default NameSurname;
