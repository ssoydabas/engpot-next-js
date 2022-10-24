import { useEffect } from "react";

import { useRouter } from "next/router";

import Head from "next/head";

import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../../store/authentication/authentication";
import { authFormActions } from "../../store/authentication/form";
import { feedbackActions } from "../../store/feedback/Feedback";

import useHttp from "../../hooks/useHttp";

import User from "../../components/user/User";

import Error from "../../components/ui/components/error/Error";
import LoadingSpinner from "../../components/ui/components/loadingSpinner/LoadingSpinner";

function UserProfileById() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authentication } = useSelector((state) => state);

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

  useEffect(() => {
    dispatch(authenticationActions.refreshAuthenticationToken());

    const authenticationToken = localStorage.getItem("authenticationToken");

    if (authenticationToken === null) {
      dispatch(authFormActions.toggleFormDisplay());
      dispatch(authFormActions.changeFormMode("login"));
      router.replace("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>User Profile</title>
        <meta name="description" content="Manage your profile." />
      </Head>
      {httpError && <Error text={httpError} onClick={closeErrorMessage} />}
      {isLoading && <LoadingSpinner />}
      <User
        user={authentication.user}
        router={router}
        dispatch={dispatch}
        authenticationActions={authenticationActions}
        feedbackActions={feedbackActions}
        authFormActions={authFormActions}
        http={http}
      />
    </>
  );
}

export default UserProfileById;
