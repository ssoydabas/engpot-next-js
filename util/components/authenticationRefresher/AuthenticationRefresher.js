import React, { useEffect } from "react";
import { Fragment } from "react";

import { useDispatch } from "react-redux";
import { authenticationActions } from "../../../store/authentication/authentication";

import FeedbackProvider from "../feedbackProvider/FeedbackProvider";

function AuthenticationRefresher(props) {
  const dispatch = useDispatch();

  let localUser;
  if (typeof window !== "undefined") {
    localUser = localStorage.getItem("user");
  }

  const safeGuard = () => {
    if (typeof window !== "undefined") {
      dispatch(authenticationActions.refreshAuthenticationToken());
    }
  };
  useEffect(() => {
    safeGuard();
  });

  return (
    <Fragment>
      <FeedbackProvider>{props.children}</FeedbackProvider>
    </Fragment>
  );
}

export default AuthenticationRefresher;
