import React, { Fragment, useState } from "react";
import styles from "./User.module.css";

import { authenticationActions } from "../../store/authentication/authentication";
import { feedbackActions } from "../../store/feedback/feedback";

import useHttp from "../../hooks/useHttp";

import NameSurname from "./userPageComponents/nameSurname/NameSurname";
import EmailPassword from "./userPageComponents/emailPassword/EmailPassword";
import ProfilePicture from "./userPageComponents/profilePicture/ProfilePicture";

import Error from "../ui/components/error/Error";
import LoadingSpinner from "../ui/components/loadingSpinner/LoadingSpinner";

function User(props) {
  const [formData, setFormData] = useState(null);

  const { user } = props;
  const { router } = props;
  const { dispatch } = props;

  const { httpError, isLoading, sendRequest, setHttpError, setIsLoading } =
    useHttp();

  const handlers = {
    changeNameRequest: () => {
      const requestConfig = {
        url: `${process.env.API_URL}/changeProfileName`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "authenticationToken"
          )}`,
        },
        body: formData,
      };
      const dataProcessingLogic = (data) => {
        setIsLoading(false);
        const { user } = data;
        dispatch(authenticationActions.refreshUserObject({ user }));
      };
      sendRequest(requestConfig, dataProcessingLogic);
    },

    passwordChangeRequest: (e) => {
      e.preventDefault();

      const data = {
        email: user.personalInfo.emailInfo.email,
      };
      const requestConfig = {
        url: `${process.env.API_URL}/requestPasswordReset`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "authenticationToken"
          )}`,
        },
        body: data,
      };
      const dataProcessingLogic = (data) => {
        setIsLoading(false);
        const { message } = data;
        dispatch(authenticationActions.terminateAuthenticationToken());
        dispatch(feedbackActions.setMessage(message));
        router.replace("/");
      };

      sendRequest(requestConfig, dataProcessingLogic);
    },

    closeErrorMessageHandler: () => {
      setHttpError(false);
    },
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {httpError && (
        <Error text={httpError} onClick={handlers.closeErrorMessageHandler} />
      )}
      <div className={styles["user-profile-page"]}>
        <NameSurname
          user={user}
          setFormData={setFormData}
          changeNameRequest={handlers.changeNameRequest}
        />
        <EmailPassword
          user={user}
          setFormData={setFormData}
          passwordChangeRequest={handlers.passwordChangeRequest}
        />
        <ProfilePicture user={user} setFormData={setFormData} />
      </div>
    </Fragment>
  );
}

export default User;
