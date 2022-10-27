import { useRef } from "react";
import styles from "./SignUpForm.module.css";

import Link from "next/link";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import Button from "../../components/button/Button.js";

function SignUpForm({
  toggleFormDisplayHandler,
  changeFormModeHandler,
  setFormData,
  signUpRequest,
}) {
  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const formDataHandler = () => {
    setFormData({
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordConfirm: passwordConfirmRef.current.value,
    });
  };

  return (
    <Form className={`${styles["auth-form"]}`} onSubmit={signUpRequest}>
      <Container fluid className={styles["name-surname"]}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" ref={nameRef} onChange={formDataHandler} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            ref={surnameRef}
            onChange={formDataHandler}
          />
        </Form.Group>
      </Container>

      <Container fluid className={styles["email"]}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            ref={emailRef}
            onChange={formDataHandler}
          />
        </Form.Group>
      </Container>

      <Container fluid className={styles["password"]}>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            minLength="6"
            ref={passwordRef}
            onChange={formDataHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            minLength="6"
            ref={passwordConfirmRef}
            onChange={formDataHandler}
          />
        </Form.Group>
      </Container>

      <Button type="submit">Sign Up</Button>

      <Container fluid className={styles["internal-links"]}>
        <div onClick={changeFormModeHandler.bind(null, "login")}>
          Already a User?
        </div>
        <div onClick={toggleFormDisplayHandler}>
          <Link href={"/user/resendConfirmation"}>
            <a>Send confirmation email again?</a>
          </Link>
        </div>
      </Container>
    </Form>
  );
}

export default SignUpForm;
