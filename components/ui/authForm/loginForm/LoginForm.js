import { useRef, useState } from "react";
import styles from "./LoginForm.module.css";

import Form from "react-bootstrap/Form";

import ForgotPasswordForm from "./forgotPasswordForm/ForgotPasswordForm.js";
import Button from "../../components/button/Button.js";

function LoginForm({
  changeFormModeHandler,
  setFormData,
  loginRequest,
  requestNewPassword,
}) {
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const formDataHandler = () => {
    setFormData({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <>
      {!isForgotPassword && (
        <Form className={`${styles["auth-form"]}`} onSubmit={loginRequest}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              size="lg"
              ref={emailRef}
              onChange={formDataHandler}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              size="lg"
              ref={passwordRef}
              onChange={formDataHandler}
            />
          </Form.Group>

          <Button type="submit">Login</Button>

          <div className={styles["internal-links"]}>
            <div onClick={setIsForgotPassword.bind(null, !isForgotPassword)}>
              Forgot Password?
            </div>
            <div onClick={changeFormModeHandler.bind(null, "signUp")}>
              Sign Up
            </div>
          </div>
        </Form>
      )}

      {isForgotPassword && (
        <ForgotPasswordForm
          setFormData={setFormData}
          requestNewPassword={requestNewPassword}
        />
      )}
    </>
  );
}

export default LoginForm;
