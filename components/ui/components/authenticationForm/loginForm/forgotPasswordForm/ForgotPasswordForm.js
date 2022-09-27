import React, { useRef } from "react";
import styles from "./ForgotPasswordForm.module.css";

import Button from "../../../button/Button";

function ForgotPasswordForm(props) {
  const passwordResetEmailRef = useRef();

  const { setFormData } = props;
  const { forgotPasswordRequest } = props;

  const formDataHandler = () => {
    setFormData({
      email: passwordResetEmailRef.current.value,
    });
  };

  return (
    <div className={styles["request-password-reset"]}>
      <div>Request Reset Password Token</div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          ref={passwordResetEmailRef}
          onChange={formDataHandler}
        />
      </div>
      <Button
        classes="button--white"
        type="button"
        text="Submit"
        onClick={forgotPasswordRequest}
      />
    </div>
  );
}

export default ForgotPasswordForm;
