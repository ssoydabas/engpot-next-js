import React from "react";
import styles from "./UserItem.module.css";

function UserItem(props) {
  return <div className={styles["user-item"]} onClick={props.onClick}>
    <div>{props.nameSurname}</div>
    <div>{props.email}</div>
    <div>{props.status}</div>
  </div>;
}

export default UserItem;
