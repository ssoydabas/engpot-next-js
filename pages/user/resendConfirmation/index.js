import { useRef } from "react";
import styles from "./ResendConfirmation.module.css";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../store/feedback/Feedback";

import useHttp from "../../../hooks/useHttp";

import LoadingSpinner from "../../../components/ui/components/loadingSpinner/LoadingSpinner";
import Error from "../../../components/ui/components/error/Error";

import Form from "react-bootstrap/Form";

import Button from "../../../components/ui/components/button/Button";

function ResendConfirmation() {
  const dispatch = useDispatch();
  const router = useRouter();

  const emailRef = useRef();

  const {
    httpError,
    isLoading,
    sendRequest,
    setIsLoading,
    closeErrorMessage,
  } = useHttp();

  const submitResentConfirmationHandler = (e) => {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
    };

    const requestConfig = {
      url: `${process.env.API_URL}/resendConfirmation`,
      method: "POST",
      headers: { "content-type": "application/json" },
      body: data,
    };

    const dataProcessingLogic = (data) => {
      setIsLoading(false);
      const { message } = data;
      dispatch(feedbackActions.setMessage(message));
      router.push("/");
    };

    sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {httpError && <Error text={httpError} onClick={closeErrorMessage} />}
      <Form
        className={styles["resend-confirmation-email"]}
        onSubmit={submitResentConfirmationHandler}
      >
        <div>Resend Confirmation Email</div>
        <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control type={"email"} ref={emailRef} />
        </Form.Group>
        <Button type={"submit"}>Submit</Button>
      </Form>
    </>
  );
}

export default ResendConfirmation;
