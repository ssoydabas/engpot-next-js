import React from "react";
import styles from "./NavMenu.module.css";

import NavItem from "./NavItem";

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

function NavMenu(props) {
  const { user } = props;
  const navigationItems = constructNavItems(user);

  return (
    <ul className={styles["nav-menu"]}>
      {navigationItems.map((i) => (
        <NavItem key={i.id} id={i.id} text={i.text} href={i.href} />
      ))}
    </ul>
  );
}

export default NavMenu;
