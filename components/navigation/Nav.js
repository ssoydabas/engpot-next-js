import React, { Fragment, useState, useEffect } from "react";
import styles from "./Nav.module.css";

import { useSelector } from "react-redux";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import NavLogo from "./NavLogo";
import NavMenu from "./navDesktop/navMenu/NavMenu";
import AuthMenu from "./navDesktop/auth/AuthMenu";
import NavMobile from "./navMobile/NavMobile";

import setDeviceScreenMode from "../../util/dataHelpers/setDeviceScreenMode";

function Nav() {
  const [device, setDevice] = useState();

  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    setDeviceScreenMode(windowDimensions, setDevice);
  }, []);

  const { authentication } = useSelector((state) => state);
  const { user } = authentication;

  return (
    <div className={styles["nav"]}>
      <NavLogo />
      {device === "desktop" && (
        <Fragment>
          <NavMenu user={user} />
          <AuthMenu authentication={authentication} user={user} />
        </Fragment>
      )}
      {device === "mobile" && <NavMobile user={user} />}
    </div>
  );
}

export default Nav;
