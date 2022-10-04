import React from "react";
import styles from "./AuthMenu.module.css";

import AuthMenuItem from "./AuthMenuItem";

function AuthMenu(props) {
  const { authentication } = props;
  const { user } = props;

  const authMenuItems__notLoggedIn = [
    { id: "signUp", text: "Sign Up" },
    { id: "login", text: "Login" },
  ];
  const authMenuItems__loggedIn = [
    {
      id: "userProfile",
      text: user ? user.personalInfo.name : "",
    },
    { id: "logout", text: "Log Out" },
  ];

  return (
    <ul className={styles["auth-menu"]}>
      {!authentication.authenticationToken &&
        authMenuItems__notLoggedIn.map((i) => (
          <AuthMenuItem key={i.id} id={i.id} text={i.text} />
        ))}
      {authentication.authenticationToken &&
        authMenuItems__loggedIn.map((i) => (
          <AuthMenuItem key={i.id} id={i.id} text={i.text} />
        ))}
    </ul>
  );
}

export default AuthMenu;
