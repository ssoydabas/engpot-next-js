import styles from "./User.module.css";

import Container from "react-bootstrap/Container";

import Identity from "./identity/Identity.js";

function User({
  user,
  router,
  dispatch,
  authenticationActions,
  feedbackActions,
  http,
}) {
  const handlers = {
    changeNameRequest: (name, surname) => {
      const data = {
        userId: user._id,
        newName: name,
        newSurname: surname,
      };
      const requestConfig = {
        url: `${process.env.API_URL}/v1/user/changePersonalInformation`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "authenticationToken"
          )}`,
        },
        body: data,
      };
      const dataProcessingLogic = ({ user, message }) => {
        http.setIsLoading(false);
        dispatch(authenticationActions.refreshUserObject({ user }));
        dispatch(feedbackActions.setMessage(message));
      };
      http.sendRequest(requestConfig, dataProcessingLogic);
    },

    requestNewPassword: () => {
      const data = {
        email: user.personalInfo.emailInfo.email,
      };
      const requestConfig = {
        url: `${process.env.API_URL}/v1/user/requestNewPassword`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "authenticationToken"
          )}`,
        },
        body: data,
      };
      const dataProcessingLogic = ({ message }) => {
        http.setIsLoading(false);
        dispatch(authenticationActions.terminateAuthenticationToken());
        dispatch(feedbackActions.setMessage(message));
        router.replace("/");
      };

      http.sendRequest(requestConfig, dataProcessingLogic);
    },
  };

  return (
    <>
      <Container fluid className={styles["user-page"]}>
        <Identity
          user={user}
          changeNameRequest={handlers.changeNameRequest}
          requestNewPassword={handlers.requestNewPassword}
        />
      </Container>
    </>
  );
}

export default User;
