import React from "react";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../../../store/authentication/authentication";

import Button from "../../ui/components/button/Button";

function AuthMenuItem(props) {
  const router = useRouter();
  const { authentication } = useSelector((state) => state);
  const { user } = authentication;
  const dispatch = useDispatch();

  const toggleFormDisplayHandler = () => {
    if (props.id === "logout") {
      router.replace("/");
      setTimeout(() => {
        dispatch(authenticationActions.terminateAuthenticationToken());
      }, 500);
    } else if (props.id === "userProfile") {
      router.push(`/userProfile/${user._id}`);
    } else {
      dispatch(authenticationActions.toggleFormDisplay());

      if (props.id === "signUp") {
        dispatch(authenticationActions.changeFormMode("signUp"));
      } else if (props.id === "login") {
        dispatch(authenticationActions.changeFormMode("login"));
      }
    }
  };

  return (
    <Button
      key={props.id}
      classes="button--white"
      type="button"
      text={props.text}
      onClick={toggleFormDisplayHandler}
    ></Button>
  );
}

export default AuthMenuItem;
