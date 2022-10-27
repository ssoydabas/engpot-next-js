import { useState } from "react";

import LoginForm from "./loginForm/LoginForm.js";
import SignUpForm from "./signUpForm/SignUpForm.js";

import Backdrop from "../components/backdrop/Backdrop.js";

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
        url: `${process.env.API_URL}/v1/user/verifyUser`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: formData,
      };
      const dataProcessingLogic = ({ user, authenticationToken }) => {
        http.setIsLoading(false);
        handlers.toggleFormDisplayHandler();
        dispatch(
          authenticationActions.setAuthenticationToken({
            authenticationToken,
            user,
          })
        );
      };
      http.sendRequest(requestConfig, dataProcessingLogic);
    },

    signUpRequest: (e) => {
      e.preventDefault();

      const requestConfig = {
        url: `${process.env.API_URL}/v1/user/createUser`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: formData,
      };
      const dataProcessingLogic = ({ message }) => {
        http.setIsLoading(false);
        handlers.toggleFormDisplayHandler();
        dispatch(feedbackActions.setMessage(message));
      };
      http.sendRequest(requestConfig, dataProcessingLogic);
    },

    requestNewPassword: (e) => {
      e.preventDefault();

      const requestConfig = {
        url: `${process.env.API_URL}/v1/user/requestNewPassword`,
        method: "POST",
        headers: { "content-type": "application/json" },
        body: formData,
      };
      const dataProcessingLogic = ({message}) => {
        http.setIsLoading(false);
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
          requestNewPassword={handlers.requestNewPassword}
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
