import styles from "./UsersList.module.css";

import Container from "react-bootstrap/Container";

import UserItem from "./userItem/UserItem.js";

function UsersList({ classifiedUsers, filter, setUserToManage }) {
  const { students } = classifiedUsers;
  const { teachers } = classifiedUsers;
  const { users } = classifiedUsers;
  const { admins } = classifiedUsers;

  return (
    <Container fluid className={styles["users-list"]}>
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
    </Container>
  );
}

export default UsersList;
