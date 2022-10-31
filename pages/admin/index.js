import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../store/feedback/feedback.js";

import useHttp from "../../hooks/useHttp.js";

import Head from "next/head";

import AdminPanel from "../../components/admin/AdminPanel.js";

import LoadingSpinner from "../../components/ui/components/loadingSpinner/LoadingSpinner.js";
import Error from "../../components/ui/components/error/Error.js";

function Admin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);

  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.engPotInfo.status !== "admin") {
      dispatch(
        feedbackActions.setMessage("Only admins have access to this route.")
      );
      router.push("/");
    }
  }

  const {
    httpError,
    isLoading,
    sendRequest,
    closeErrorMessage,
    setIsLoading,
    setHttpError,
  } = useHttp();

  useEffect(() => {
    const requestConfig = {
      url: `${process.env.API_URL}/v1/user/fetchUsers`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
    };
    const dataProcessingLogic = ({ users }) => {
      setIsLoading(false);
      setUsers(users);
    };
    sendRequest(requestConfig, dataProcessingLogic);
  }, []);

  const http = {
    httpError,
    isLoading,
    sendRequest,
    closeErrorMessage,
    setIsLoading,
    setHttpError,
  };

  const refreshUsersHandler = () => {
    const requestConfig = {
      url: `${process.env.API_URL}/v1/user/fetchUsers`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`,
      },
    };
    const dataProcessingLogic = ({ users }) => {
      setIsLoading(false);
      setUsers(users);
    };
    sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <>
      <Head>
        <title>EngPot - Admin</title>
        <meta
          name="description"
          content="Manage the users on EngPot English."
        />
      </Head>
      {isLoading && <LoadingSpinner />}
      {httpError && <Error text={httpError} onClick={closeErrorMessage} />}
      {users && (
        <AdminPanel
          users={users}
          setUsers={setUsers}
          refreshUsersHandler={refreshUsersHandler}
          http={http}
        />
      )}
    </>
  );
}

export default Admin;
