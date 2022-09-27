import React, { useState, useEffect, Fragment } from "react";

import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../store/feedback/feedback";

import useHttp from "../../hooks/useHttp";

import Head from "next/head";

import Admin from "../../components/admin/Admin";

import Error from "../../components/ui/components/error/Error";
import LoadingSpinner from "../../components/ui/components/loadingSpinner/LoadingSpinner";

function AdminPanel(props) {
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

  useEffect(() => {
    const { users } = props;
    setUsers(users);
  }, []);

  const { httpError, isLoading, sendRequest, setHttpError, setIsLoading } =
    useHttp();

  const httpFunctions = {
    sendRequest,
    setHttpError,
    setIsLoading,
  };

  const refreshUsersHandler = () => {
    const requestConfig = {
      url: `${process.env.API_URL}/fetchAllUsers/all`,
    };
    const dataProcessingLogic = (data) => {
      setIsLoading(false);
      const { users } = data;
      setUsers(users);
    };
    sendRequest(requestConfig, dataProcessingLogic);
  };

  const closeErrorMessageHandler = () => {
    setHttpError(false);
  };

  return (
    <Fragment>
      <Head>
        <title>EngPot - Admin</title>
        <meta
          name="description"
          content="Manage the users on EngPot English."
        />
      </Head>
      {isLoading && <LoadingSpinner />}
      {httpError && (
        <Error text={httpError} onClick={closeErrorMessageHandler} />
      )}
      {users && (
        <Admin
          users={users}
          setUsers={setUsers}
          refreshUsersHandler={refreshUsersHandler}
          httpFunctions={httpFunctions}
        />
      )}
    </Fragment>
  );
}

export default AdminPanel;

export async function getStaticProps(context) {
  let response = await fetch(`${process.env.API_URL}/fetchAllUsers/all`);
  response = await response.json();

  const { users } = response;

  return {
    props: {
      users,
    },
  };
}

// export async function getServerSideProps(context) {
//   let response = await fetch(`${process.env.API_URL}/fetchAllUsers/all`);
//   response = await response.json();

//   const { users } = response;

//   return {
//     props: {
//       users,
//     },
//   };
// }
