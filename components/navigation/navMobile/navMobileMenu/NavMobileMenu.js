import React from "react";
import styles from "./NavMobileMenu.module.css";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../../../../store/authentication/authentication";

import Button from "../../../ui/components/button/Button";

const constructNavItems = (user) => {
  let navigationItems;
  if (!user || user.engPotInfo.status === "user") {
    navigationItems = [{ id: "1", text: "Home", href: "/" }];
  } else if (user && user.engPotInfo.status === "student") {
    navigationItems = [
      { id: "1", text: "Home", href: "/" },
      { id: "2", text: "Student", href: "/studentPage" },
    ];
  } else if (user && user.engPotInfo.status === "teacher") {
    navigationItems = [
      { id: "1", text: "Home", href: "/" },
      { id: "2", text: "Teacher", href: "/teacherPage" },
      { id: "3", text: "Schedule", href: "/teacherPage/schedule" },
    ];
  } else if (user && user.engPotInfo.status === "admin") {
    navigationItems = [
      { id: "1", text: "Home", href: "/" },
      { id: "2", text: "Student", href: "/studentPage" },
      { id: "3", text: "Teacher", href: "/teacherPage" },
      { id: "4", text: "Admin", href: "/adminPanel" },
    ];
  }

  return navigationItems;
};

function NavMobileMenu(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = props;
  const { displayMobileMenu } = props;
  const { setDisplayMobileMenu } = props;

  const navigationItems = constructNavItems(user);

  const closeMenuOnNavigate = () => {
    setTimeout(() => {
      setDisplayMobileMenu(false);
    }, 600);
  };

  const logoutHandler = () => {
    router.replace("/");
    setTimeout(() => {
      dispatch(authenticationActions.terminateAuthenticationToken());
    }, 500);
    setDisplayMobileMenu(false);
  };

  return (
    <div
      className={`${styles["nav-mobile-menu"]} ${
        !displayMobileMenu ? styles["top-100"] : styles["top-0"]
      }`}
    >
      <div className={styles["brand-logo"]}>
        <div className={styles["image-wrapper"]}>
          <Image
            src={"/nav.png"}
            layout={"fill"}
            objectFit={"contain"}
            alt={"navigation logo"}
          />
        </div>
      </div>

      <div className={styles["links"]}>
        {navigationItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <a onClick={closeMenuOnNavigate}>{item.text}</a>
          </Link>
        ))}
      </div>

      <div className={styles["mobile-menu-buttons"]}>
        <Button type="button" text="LOGOUT" onClick={logoutHandler} />

        <Button
          type="button"
          text="MENU"
          onClick={setDisplayMobileMenu.bind(null, false)}
        />
      </div>
    </div>
  );
}

export default NavMobileMenu;
