import React, { Fragment, useRef, useState } from "react";
import styles from "./LoginForm.module.css";

import ForgotPasswordForm from "./forgotPasswordForm/ForgotPasswordForm";
import Button from "../../button/Button";

function LoginForm(props) {
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const { loginRequest } = props;
  const { changeFormModeHandler } = props;
  const { setFormData } = props;
  const { forgotPasswordRequest } = props;

  const formDataHandler = () => {
    setFormData({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <Fragment>
      <form className={`${styles["auth-form"]}`} onSubmit={loginRequest}>
        <div className={styles["email"]}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            onChange={formDataHandler}
          />
        </div>

        <div className={styles["password"]}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            ref={passwordRef}
            onChange={formDataHandler}
          />
        </div>

        <Button type="submit" classes="button--white" text="Login" />

        <div className={styles["internal-links-container"]}>
          <div
            className={styles["internal-links"]}
            onClick={setIsForgotPassword.bind(null, !isForgotPassword)}
          >
            Forgot Password?
          </div>
          <div
            className={styles["internal-links"]}
            onClick={changeFormModeHandler.bind(null, "signUp")}
          >
            Sign Up
          </div>
        </div>
      </form>
      {isForgotPassword && (
        <ForgotPasswordForm
          setFormData={setFormData}
          forgotPasswordRequest={forgotPasswordRequest}
        />
      )}
    </Fragment>
  );
}

export default LoginForm;
