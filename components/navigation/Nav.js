import React, { useState } from "react";
import styles from "./Nav.module.css";

import { useSelector } from "react-redux";

import NavLogo from "./NavLogo";
import NavMenu from "./navMenu/NavMenu";
import AuthMenu from "./auth/AuthMenu";

function Nav() {
  const { authentication } = useSelector((state) => state);
  const { user } = authentication;

  return (
    <div className={styles["nav"]}>
      <NavLogo />
      <NavMenu user={user} />
      <AuthMenu authentication={authentication} user={user} />
    </div>
  );
}

export default Nav;
