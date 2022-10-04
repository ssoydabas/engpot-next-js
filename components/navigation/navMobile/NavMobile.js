import React, { Fragment, useState } from "react";
import styles from "./NavMobile.module.css";

import NavMobileMenu from "./navMobileMenu/NavMobileMenu";

import Button from "../../ui/components/button/Button";

function NavMobile(props) {
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);
  
  const { user } = props;

  return (
    <Fragment>
      <Button
        type="button"
        className={styles["mobile-menu-button"]}
        text="MENU"
        onClick={setDisplayMobileMenu.bind(null, true)}
      />
      <NavMobileMenu user={user} displayMobileMenu={displayMobileMenu} setDisplayMobileMenu={setDisplayMobileMenu} />
    </Fragment>
  );
}

export default NavMobile;
