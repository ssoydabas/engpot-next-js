import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { authenticationActions } from "../../../store/authentication/authentication";
import { authFormActions } from "../../../store/authentication/form";
import { feedbackActions } from "../../../store/feedback/Feedback";

import useHttp from "../../../hooks/useHttp";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

import Error from "../components/error/Error";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import Feedback from "../components/feedback/Feedback";

import Navigation from "../navigation/Navigation";
import AuthForm from "../authForm/AuthForm";

function Layout({ children }) {
  const dispatch = useDispatch();

  const { authForm } = useSelector((state) => state);

  const { authentication } = useSelector((state) => state);

  const { feedback } = useSelector((state) => state);

  const {
    httpError,
    isLoading,
    sendRequest,
    setHttpError,
    setIsLoading,
    closeErrorMessage,
  } = useHttp();

  const http = {
    httpError,
    isLoading,
    sendRequest,
    setHttpError,
    setIsLoading,
    closeErrorMessage,
  };

  const windowDimensions = useWindowDimensions();

  const closeFeedbackMessage = () => {
    dispatch(feedbackActions.cleanMessage());
  };

  return (
    <>
      {httpError && <Error text={httpError} onClick={closeErrorMessage} />}
      {isLoading && <LoadingSpinner />}
      <Navigation
        authForm={authForm}
        authentication={authentication}
        dispatch={dispatch}
        authFormActions={authFormActions}
        authenticationActions={authenticationActions}
        feedbackActions={feedbackActions}
        windowDimensions={windowDimensions}
      />
      {authForm.displayForm && (
        <AuthForm
          formMode={authForm.formMode}
          http={http}
          dispatch={dispatch}
          authFormActions={authFormActions}
          authenticationActions={authenticationActions}
          feedbackActions={feedbackActions}
        />
      )}
      {feedback.message && <Feedback feedbackMessage={feedback.message} onClick={closeFeedbackMessage} />}
      <main id="main" className="scroll">{children}</main>
    </>
  );
}

export default Layout;
