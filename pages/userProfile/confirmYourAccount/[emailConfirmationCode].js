import React, { Fragment, useEffect } from "react";

import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { authenticationActions } from "../../../store/authentication/authentication";
import { feedbackActions } from "../../../store/feedback/feedback";

import useHttp from "../../../hooks/useHttp";

import LoadingSpinner from "../../../components/ui/components/loadingSpinner/LoadingSpinner";
import Error from "../../../components/ui/components/error/Error";

function ConfirmYourAccountPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { httpError, isLoading, sendRequest, setHttpError, setIsLoading } =
    useHttp();

  const { emailConfirmationCode } = router.query;

  const sendRequestHandler = (emailConfirmationCode) => {
    const requestConfig = {
      url: `${process.env.API_URL}/confirmAccount/${emailConfirmationCode}`,
    };
    const dataProcessingLogic = (data) => {
      const { message } = data;
      dispatch(feedbackActions.setMessage(message));
      dispatch(authenticationActions.toggleFormDisplay());
      dispatch(authenticationActions.changeFormMode("login"));
      router.replace("/");
    };
    sendRequest(requestConfig, dataProcessingLogic);
  };

  useEffect(() => {
    if (router.isReady) {
      sendRequestHandler(emailConfirmationCode);
    }
  }, [router.isReady]);

  const closeErrorMessageHandler = () => {
    router.replace("/");
    setHttpError(null);
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {httpError && (
        <Error text={httpError} onClick={closeErrorMessageHandler} />
      )}
    </Fragment>
  );
}

export default ConfirmYourAccountPage;
