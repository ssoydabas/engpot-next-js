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
        url: `${process.env.API_URL}/changeProfileName`,
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
        http.setIsLoading(false);
        const { user } = data;
        dispatch(authenticationActions.refreshUserObject({ user }));
      };
      http.sendRequest(requestConfig, dataProcessingLogic);
    },

    passwordChangeRequest: () => {
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
        http.setIsLoading(false);
        const { message } = data;
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
          passwordChangeRequest={handlers.passwordChangeRequest}
        />
      </Container>
    </>
  );
}

export default User;
