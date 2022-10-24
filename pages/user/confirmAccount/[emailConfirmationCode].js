import { useEffect } from "react";

import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { authFormActions } from "../../../store/authentication/form.js";
import { feedbackActions } from "../../../store/feedback/Feedback.js";

import useHttp from "../../../hooks/useHttp.js";

import LoadingSpinner from "../../../components/ui/components/loadingSpinner/LoadingSpinner.js";
import Error from "../../../components/ui/components/error/Error.js";

function ConfirmAccount() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    httpError,
    isLoading,
    sendRequest,
    setHttpError,
    setIsLoading,
    closeErrorMessage,
  } = useHttp();

  const { emailConfirmationCode } = router.query;

  const sendRequestHandler = (emailConfirmationCode) => {
    const requestConfig = {
      url: `${process.env.API_URL}/confirmAccount/${emailConfirmationCode}`,
    };
    const dataProcessingLogic = (data) => {
      const { message } = data;
      dispatch(feedbackActions.setMessage(message));
      dispatch(authFormActions.toggleFormDisplay());
      dispatch(authFormActions.changeFormMode("login"));
      router.replace("/");
    };
    sendRequest(requestConfig, dataProcessingLogic);
  };

  useEffect(() => {
    if (router.isReady) {
      sendRequestHandler(emailConfirmationCode);
    }
  }, [router.isReady]);

  const closeError_redirectPage = () => {
    closeErrorMessage();
    router.replace("/");
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {httpError && (
        <Error text={httpError} onClick={closeError_redirectPage} />
      )}
    </>
  );
}

export default ConfirmAccount;
