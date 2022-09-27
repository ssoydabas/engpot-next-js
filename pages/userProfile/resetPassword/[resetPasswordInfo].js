import React, { Fragment, useRef } from "react";
import styles from "./resetPasswordInfo.module.css";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../../../store/authentication/authentication";
import { feedbackActions } from "../../../store/feedback/feedback";

import useHttp from "../../../hooks/useHttp";

import LoadingSpinner from "../../../components/ui/components/loadingSpinner/LoadingSpinner";
import Error from "../../../components/ui/components/error/Error";
import Button from "../../../components/ui/components/button/Button";

function ConfirmYourAccountPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { authentication } = useSelector((state) => state);

  const { httpError, isLoading, sendRequest, setHttpError, setIsLoading } =
    useHttp();

  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

  const submitNewPasswordHandler = (e) => {
    e.preventDefault();
    const data = {
      resetToken: router.query.resetPasswordInfo,
      newPassword: newPasswordRef.current.value,
      confirmNewPassword: confirmNewPasswordRef.current.value,
    };

    const requestConfig = {
      url: `${process.env.API_URL}/resetPassword`,
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${authentication.setAuthenticationToken}`,
      },
      body: data,
    };

    const dataProcessingLogic = (data) => {
      setIsLoading(false);
      dispatch(authenticationActions.toggleFormDisplay());
      const { message } = data;
      dispatch(feedbackActions.setMessage(message));
      router.replace("/");
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
        className={styles["reset-password-info"]}
        onSubmit={submitNewPasswordHandler}
      >
        <div>Reset Password</div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input type="password" name="newPassword" ref={newPasswordRef} />
        </div>
        <div>
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            ref={confirmNewPasswordRef}
          />
        </div>
        <Button classes="button--white" type="submit" text="Submit" />
      </form>
    </Fragment>
  );
}

export default ConfirmYourAccountPage;
