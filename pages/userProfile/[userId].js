import React, { Fragment, useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";

import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../../store/authentication/authentication";

import User from "../../components/user/User";

function UserProfileById() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authentication } = useSelector((state) => state);

  useEffect(() => {
    dispatch(authenticationActions.refreshAuthenticationToken());

    const authenticationToken = localStorage.getItem("authenticationToken");

    if (authenticationToken === null) {
      dispatch(authenticationActions.toggleFormDisplay());
      dispatch(authenticationActions.changeFormMode("login"));
      router.replace("/");
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>User Profile</title>
        <meta name="description" content="Manage your profile." />
      </Head>
      <User user={authentication.user} router={router} dispatch={dispatch} />;
    </Fragment>
  );
}

export default UserProfileById;
