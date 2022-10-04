import React from "react";
import Link from "next/link";

function NavItem(props) {
  return (
    <li>
      <Link key={props.id} href={props.href}>
        <a>{props.text}</a>
      </Link>
    </li>
  );
}

export default NavItem;
