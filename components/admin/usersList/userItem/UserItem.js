import styles from "./UserItem.module.css";

import Container from "react-bootstrap/Container";

function UserItem(props) {
  return (
    <Container fluid className={styles["user-item"]} onClick={props.onClick}>
      <div>{props.nameSurname}</div>
      <div>{props.email}</div>
      <div>{props.status}</div>
    </Container>
  );
}

export default UserItem;
