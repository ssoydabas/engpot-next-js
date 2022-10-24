import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { feedbackActions } from "../../store/feedback/feedback.js";

import useHttp from "../../hooks/useHttp.js";

import Head from "next/head";

import AdminPanel from "../../components/admin/AdminPanel.js";

import LoadingSpinner from "../../components/ui/components/loadingSpinner/LoadingSpinner.js";
import Error from "../../components/ui/components/error/Error.js";

function Admin(props) {
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

  const {
    httpError,
    isLoading,
    sendRequest,
    closeErrorMessage,
    setIsLoading,
    setHttpError,
  } = useHttp();

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
      url: `${process.env.API_URL}/fetchAllUsers/all`,
    };
    const dataProcessingLogic = (data) => {
      setIsLoading(false);
      const { users } = data;
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
