import React, { Fragment, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { authenticationActions } from "../../../../store/authentication/authentication";
import { feedbackActions } from "../../../../store/feedback/feedback";

import useHttp from "../../../../hooks/useHttp";

import LoginForm from "./loginForm/LoginForm";
import SignUpForm from "./signUpForm/SignUpForm";

import Backdrop from "../backdrop/Backdrop";
import Error from "../error/Error";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

function AuthenticationForm(props) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(null);

  const { authentication } = props;

  const { displayForm, formMode } = authentication;

  const { httpError, isLoading, sendRequest, setHttpError, setIsLoading } =
    useHttp();

  const handlers = {
    toggleFormDisplayHandler: () =>
      dispatch(authenticationActions.toggleFormDisplay()),

    changeFormModeHandler: (mode) => {
      dispatch(authenticationActions.changeFormMode(mode));
    },

    closeErrorMessage: () => setHttpError(null),

    loginRequest: (e) => {
      e.preventDefault();

      const requestConfig = {
        url: `${process.env.API_URL}/login`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: formData,
      };
      const dataProcessingLogic = (data) => {
        setIsLoading(false);
        handlers.toggleFormDisplayHandler();
        const { message } = data;
        dispatch(
          authenticationActions.setAuthenticationToken({
            authenticationToken: data.authenticationToken,
            user: data.user,
          })
        );
        dispatch(feedbackActions.setMessage(message));
      };
      sendRequest(requestConfig, dataProcessingLogic);
    },
    signUpRequest: (e) => {
      e.preventDefault();

      const requestConfig = {
        url: `${process.env.API_URL}/signUp`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: formData,
      };
      const dataProcessingLogic = (data) => {
        setIsLoading(false);
        handlers.toggleFormDisplayHandler();
        const { message } = data;
        dispatch(feedbackActions.setMessage(message));
      };
      sendRequest(requestConfig, dataProcessingLogic);
    },
    forgotPasswordRequest: (e) => {
      const requestConfig = {
        url: `${process.env.API_URL}/requestPasswordReset`,
        method: "POST",
        headers: { "content-type": "application/json" },
        body: formData,
      };
      const dataProcessingLogic = (data) => {
        setIsLoading(false);
        const { message } = data;
        dispatch(feedbackActions.setMessage(message));
        handlers.toggleFormDisplayHandler();
      };
      sendRequest(requestConfig, dataProcessingLogic);
    },
  };

  return (
    <Fragment>
      {httpError && (
        <Error text={httpError} onClick={handlers.closeErrorMessage} />
      )}
      {isLoading && <LoadingSpinner />}
      {displayForm && <Backdrop onClick={handlers.toggleFormDisplayHandler} />}
      {displayForm && formMode === "login" && (
        <LoginForm
          loginRequest={handlers.loginRequest}
          forgotPasswordRequest={handlers.forgotPasswordRequest}
          changeFormModeHandler={handlers.changeFormModeHandler}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {displayForm && formMode === "signUp" && (
        <SignUpForm
          signUpRequest={handlers.signUpRequest}
          toggleFormDisplayHandler={handlers.toggleFormDisplayHandler}
          changeFormModeHandler={handlers.changeFormModeHandler}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </Fragment>
  );
}

export default AuthenticationForm;
