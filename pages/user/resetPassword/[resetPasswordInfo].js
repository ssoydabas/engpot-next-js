import { useRef } from "react";
import styles from "./ResetPassword.module.css";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { authFormActions } from "../../../store/authentication/form.js";
import { feedbackActions } from "../../../store/feedback/feedback.js";

import useHttp from "../../../hooks/useHttp.js";

import LoadingSpinner from "../../../components/ui/components/loadingSpinner/LoadingSpinner.js";
import Error from "../../../components/ui/components/error/Error.js";

import Form from "react-bootstrap/Form";
import Button from "../../../components/ui/components/button/Button.js";

function ConfirmYourAccountPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { authentication } = useSelector((state) => state);

  const { httpError, isLoading, sendRequest, setIsLoading, closeErrorMessage } =
    useHttp();

  const newPasswordRef = useRef();
  const newPasswordConfirmRef = useRef();

  const submitNewPasswordHandler = (e) => {
    e.preventDefault();
    const data = {
      resetToken: router.query.resetPasswordInfo,
      newPassword: newPasswordRef.current.value,
      newPasswordConfirm: newPasswordConfirmRef.current.value,
    };

    const requestConfig = {
      url: `${process.env.API_URL}/v1/user/resetPassword`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${authentication.setAuthenticationToken}`,
      },
      body: data,
    };

    const dataProcessingLogic = (data) => {
      setIsLoading(false);
      dispatch(authFormActions.toggleFormDisplay());
      const { message } = data;
      dispatch(feedbackActions.setMessage(message));
      router.replace("/");
    };

    sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {httpError && <Error text={httpError} onClick={closeErrorMessage} />}
      <Form
        className={styles["reset-password-info"]}
        onSubmit={submitNewPasswordHandler}
      >
        <div>Reset Password</div>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={newPasswordRef} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password Confirm</Form.Label>
          <Form.Control type="password" ref={newPasswordConfirmRef} />
        </Form.Group>
        <Button type={"submit"}>Submit</Button>
      </Form>
    </>
  );
}

export default ConfirmYourAccountPage;
