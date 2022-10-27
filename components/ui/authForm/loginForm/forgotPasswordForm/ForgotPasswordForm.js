import { useRef } from "react";
import styles from "./ForgotPasswordForm.module.css";

import Form from "react-bootstrap/Form";

import Button from "../../../components/button/Button.js";

function ForgotPasswordForm({ setFormData, requestNewPassword }) {
  const passwordResetEmailRef = useRef();

  const formDataHandler = () => {
    setFormData({
      email: passwordResetEmailRef.current.value,
    });
  };

  return (
    <Form className={styles["request-password-reset"]}>
      <div>Request Reset Password Token</div>
      <Form.Group>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="email"
          ref={passwordResetEmailRef}
          onChange={formDataHandler}
        />
      </Form.Group>
      <Button type="submit" onClick={requestNewPassword}>
        Submit
      </Button>
    </Form>
  );
}

export default ForgotPasswordForm;
