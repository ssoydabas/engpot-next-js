import { useState } from "react";

import LoginForm from "./loginForm/LoginForm";
import SignUpForm from "./signUpForm/SignUpForm";

import Backdrop from "../components/backdrop/Backdrop";

function AuthForm({
  formMode,
  http,
  dispatch,
  authFormActions,
  authenticationActions,
  feedbackActions,
}) {
  const [formData, setFormData] = useState(null);

  const handlers = {
    toggleFormDisplayHandler: () =>
      dispatch(authFormActions.toggleFormDisplay()),

    changeFormModeHandler: (mode) =>
      dispatch(authFormActions.changeFormMode(mode)),

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
        http.setIsLoading(false);
        handlers.toggleFormDisplayHandler();
        dispatch(
          authenticationActions.setAuthenticationToken({
            authenticationToken: data.authenticationToken,
            user: data.user,
          })
        );
      };
      http.sendRequest(requestConfig, dataProcessingLogic);
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
        http.setIsLoading(false);
        handlers.toggleFormDisplayHandler();
        const { message } = data;
        dispatch(feedbackActions.setMessage(message));
      };
      http.sendRequest(requestConfig, dataProcessingLogic);
    },

    forgotPasswordRequest: (e) => {
      e.preventDefault();

      const requestConfig = {
        url: `${process.env.API_URL}/requestPasswordReset`,
        method: "POST",
        headers: { "content-type": "application/json" },
        body: formData,
      };
      const dataProcessingLogic = (data) => {
        http.setIsLoading(false);
        const { message } = data;
        dispatch(feedbackActions.setMessage(message));
        handlers.toggleFormDisplayHandler();
      };
      http.sendRequest(requestConfig, dataProcessingLogic);
    },
  };

  return (
    <>
      <Backdrop onClick={handlers.toggleFormDisplayHandler} disabled />
      {formMode === "login" && (
        <LoginForm
          loginRequest={handlers.loginRequest}
          forgotPasswordRequest={handlers.forgotPasswordRequest}
          changeFormModeHandler={handlers.changeFormModeHandler}
          formData={formData}
          setFormData={setFormData}
          http={http}
        />
      )}
      {formMode === "signUp" && (
        <SignUpForm
          signUpRequest={handlers.signUpRequest}
          toggleFormDisplayHandler={handlers.toggleFormDisplayHandler}
          changeFormModeHandler={handlers.changeFormModeHandler}
          formData={formData}
          setFormData={setFormData}
          http={http}
        />
      )}
    </>
  );
}

export default AuthForm;
