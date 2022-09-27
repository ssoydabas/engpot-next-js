import React from "react";
import styles from "./UsersList.module.css";

import UserItem from "./userItem/UserItem";

function UsersList(props) {
    const {filter} = props;

    const {students} = props.classifiedUsers;
    const {teachers} = props.classifiedUsers;
    const {users} = props.classifiedUsers;
    const {admins} = props.classifiedUsers;

    const {setUserToManage} = props;


    return <div className={styles["users-list"]}>
        {filter === "students" &&
          students.map((i) => (
            <UserItem
              key={i._id}
              nameSurname={`${i.personalInfo.name} ${i.personalInfo.surname}`}
              email={i.personalInfo.emailInfo.email}
              status={i.engPotInfo.status}
              onClick={setUserToManage.bind(null, i)}
            />
          ))}
        {filter === "teachers" &&
          teachers.map((i) => (
            <UserItem
              key={i._id}
              nameSurname={`${i.personalInfo.name} ${i.personalInfo.surname}`}
              email={i.personalInfo.emailInfo.email}
              status={i.engPotInfo.status}
              onClick={setUserToManage.bind(null, i)}
            />
          ))}
        {filter === "users" &&
          users.map((i) => (
            <UserItem
              key={i._id}
              nameSurname={`${i.personalInfo.name} ${i.personalInfo.surname}`}
              email={i.personalInfo.emailInfo.email}
              status={i.engPotInfo.status}
              onClick={setUserToManage.bind(null, i)}
            />
          ))}
        {filter === "admins" &&
          admins.map((i) => (
            <UserItem
              key={i._id}
              nameSurname={`${i.personalInfo.name} ${i.personalInfo.surname}`}
              email={i.personalInfo.emailInfo.email}
              status={i.engPotInfo.status}
              onClick={setUserToManage.bind(null, i)}
            />
          ))}
    </div>;
}

export default UsersList;
