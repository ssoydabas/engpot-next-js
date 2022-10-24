import { useState } from "react";
import styles from "./AdminPanel.module.css";

import Container from "react-bootstrap/Container";

import Filter from "./filter/Filter.js";
import UsersList from "./usersList/UsersList.js";
import ManageUser from "./manageUser/ManageUser.js";

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

function AdminPanel({ users, refreshUsersHandler, http }) {
  const [filter, setFilter] = useState("students");
  const [userToManage, setUserToManage] = useState(null);

  const classifiedUsers = classifyUsers(users);

  return (
    <Container fluid className={styles["admin-panel"]}>
      <div className={styles["title"]}>EngPot Members</div>
      <Filter filter={filter} setFilter={setFilter} />
      <UsersList
        classifiedUsers={classifiedUsers}
        filter={filter}
        setUserToManage={setUserToManage}
      />
      {userToManage && (
        <>
          <ManageUser
            userToManage={userToManage}
            classifiedUsers={classifiedUsers}
            setUserToManage={setUserToManage}
            refreshUsersHandler={refreshUsersHandler}
            http={http}
          />
        </>
      )}
    </Container>
  );
}

export default AdminPanel;
