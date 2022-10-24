import { Container } from "react-bootstrap";
import styles from "./Filter.module.css";

function Filter({ filter, setFilter }) {
  return (
    <Container fluid className={styles["filter"]}>
      <div
        onClick={setFilter.bind(null, "all")}
        className={`${styles["filter-button"]} ${
          filter === "all" ? styles["active-filter"] : ""
        } `}
      >
        <s>All</s>
      </div>
      <div
        onClick={setFilter.bind(null, "students")}
        className={`${styles["filter-button"]} ${
          filter === "students" ? styles["active-filter"] : ""
        } `}
      >
        Students
      </div>
      <div
        onClick={setFilter.bind(null, "teachers")}
        className={`${styles["filter-button"]} ${
          filter === "teachers" ? styles["active-filter"] : ""
        } `}
      >
        Teachers
      </div>
      <div
        onClick={setFilter.bind(null, "users")}
        className={`${styles["filter-button"]} ${
          filter === "users" ? styles["active-filter"] : ""
        } `}
      >
        Users
      </div>
      <div
        onClick={setFilter.bind(null, "admins")}
        className={`${styles["filter-button"]} ${
          filter === "admins" ? styles["active-filter"] : ""
        } `}
      >
        Admins
      </div>
    </Container>
  );
}

export default Filter;
