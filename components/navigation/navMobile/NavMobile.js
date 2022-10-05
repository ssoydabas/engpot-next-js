import React, { Fragment, useState } from "react";
import styles from "./NavMobile.module.css";

import Link from "next/link";

import { useDispatch } from "react-redux";
import { authenticationActions } from "../../../store/authentication/authentication";

import NavMobileMenu from "./navMobileMenu/NavMobileMenu";

import Button from "../../ui/components/button/Button";

function NavMobile(props) {
  const dispatch = useDispatch();

  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);

  const { user } = props;

  const displayAuthForm = () => {
    dispatch(authenticationActions.toggleFormDisplay());
  };

  return (
    <Fragment>
      {user && (
        <Link href={`/userProfile/${user._id}`}>
          <a className={styles["mobile-auth-menu-button"]}>
            {user.personalInfo.name}
          </a>
        </Link>
      )}
      {!user && (
        <Button
          type="button"
          className={styles["mobile-auth-menu-button"]}
          text="LOGIN"
          onClick={displayAuthForm}
        />
      )}
      <Button
        type="button"
        className={styles["mobile-menu-button"]}
        text="MENU"
        onClick={setDisplayMobileMenu.bind(null, true)}
      />
      <NavMobileMenu
        user={user}
        displayMobileMenu={displayMobileMenu}
        setDisplayMobileMenu={setDisplayMobileMenu}
      />
    </Fragment>
  );
}

export default NavMobile;
