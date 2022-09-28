import React, { useRef } from "react";
import styles from "./SignUpForm.module.css";

import Link from "next/link";

import Button from "../../button/Button";

function SignUpForm(props) {
  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { signUpRequest } = props;
  const { toggleFormDisplayHandler } = props;
  const { changeFormModeHandler } = props;
  const { setFormData } = props;

  const formDataHandler = () => {
    setFormData({
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    });
  };

  return (
    <form className={`${styles["auth-form"]}`} onSubmit={signUpRequest}>
      <div className={styles["name-surname"]}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            ref={nameRef}
            onChange={formDataHandler}
          />
        </div>
        <div>
          <label>Surname</label>
          <input
            type="text"
            name="surname"
            ref={surnameRef}
            onChange={formDataHandler}
          />
        </div>
      </div>

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
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            minLength="6"
            ref={passwordRef}
            onChange={formDataHandler}
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            minLength="6"
            ref={confirmPasswordRef}
            onChange={formDataHandler}
          />
        </div>
      </div>

      <Button type="submit" classes="button--white" text="Sign Up" />

      <div
        className={`${styles["internal-links-container"]} ${styles["already-user"]}`}
      >
        <div
          className={styles["internal-links"]}
          onClick={toggleFormDisplayHandler}
        >
          <Link href={"/userProfile/resendConfirmation"}>
            <a>Send confirmation email again?</a>
          </Link>
        </div>
        <div
          className={styles["internal-links"]}
          onClick={changeFormModeHandler.bind(null, "login")}
        >
          Already a User?
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
