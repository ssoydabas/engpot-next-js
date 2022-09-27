import React, { Fragment, useRef } from "react";
import styles from "./index.module.css";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../store/feedback/feedback";

import useHttp from "../../../hooks/useHttp";

import LoadingSpinner from "../../../components/ui/components/loadingSpinner/LoadingSpinner";
import Error from "../../../components/ui/components/error/Error";
import Button from "../../../components/ui/components/button/Button";

function ResendConfirmation() {
  const dispatch = useDispatch();
  const router = useRouter();
  const emailRef = useRef();

  const { httpError, isLoading, sendRequest, setHttpError, setIsLoading } =
    useHttp();

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

  const closeErrorMessageHandler = () => {
    setHttpError(false);
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {httpError && (
        <Error text={httpError} onClick={closeErrorMessageHandler} />
      )}
      <form
        className={styles["resend-confirmation-email"]}
        onSubmit={submitResentConfirmationHandler}
      >
        <div>Resend Confirmation Email</div>
        <div>
          <label htmlFor="newPassword">Email</label>
          <input type="email" name="email" ref={emailRef} />
        </div>
        <Button classes="button--white" type="submit" text="Submit" />
      </form>
    </Fragment>
  );
}

export default ResendConfirmation;
