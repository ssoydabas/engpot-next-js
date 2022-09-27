import React from "react";
import styles from "./EmailPassword.module.css";

import Button from "../../../ui/components/button/Button";

function EmailPassword(props) {

  const { user } = props;
  const { passwordChangeRequest } = props;
  
  return (
    <div className={styles["email-password"]}>
      <div>
        <label>Email</label>
        <div>{user ? user.personalInfo.emailInfo.email : ""}</div>
      </div>
      <div>
        <label>Password</label>
        <Button
          classes="button--white"
          type="button"
          text="Request Reset Password"
          onClick={passwordChangeRequest}
        ></Button>
      </div>
    </div>
  );
}

export default EmailPassword;
