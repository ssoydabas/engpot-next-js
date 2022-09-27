import React, { Fragment, useState } from "react";
import styles from "./Admin.module.css";

import Filter from "./filter/Filter.js";
import UsersList from "./usersList/UsersList";
import ManageUser from "./manageUser/ManageUser";
import Backdrop from "../ui/components/backdrop/Backdrop";

const classifyUsers = (usersFromApi) => {
  const students = [];
  const teachers = [];
  const users = [];
  const admins = [];
  usersFromApi.forEach((user) => {
    if (user.engPotInfo.status === "student") {
      students.push(user);
    } else if (user.engPotInfo.status === "teacher") {
      teachers.push(user);
    } else if (user.engPotInfo.status === "admin") {
      admins.push(user);
    } else {
      users.push(user);
    }
  });

  return { students, teachers, users, admins };
};

function Admin(props) {
  const [filter, setFilter] = useState("students");
  const [userToManage, setUserToManage] = useState(null);

  const { users } = props;
  const { refreshUsersHandler } = props;
  const { httpFunctions } = props;

  const classifiedUsers = classifyUsers(users);

  return (
    <div className={styles["admin-panel"]}>
      <div className={styles["title"]}>EngPot Members</div>
      <Filter filter={filter} setFilter={setFilter} />
      <UsersList
        classifiedUsers={classifiedUsers}
        filter={filter}
        setUserToManage={setUserToManage}
      />
      {userToManage && (
        <Fragment>
          <Backdrop onClick={setUserToManage.bind(null, null)} />
          <ManageUser
            userToManage={userToManage}
            classifiedUsers={classifiedUsers}
            setUserToManage={setUserToManage}
            refreshUsersHandler={refreshUsersHandler}
            httpFunctions={httpFunctions}
          />
        </Fragment>
      )}
    </div>
  );
}

export default Admin;
