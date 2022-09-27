import React from "react";
import styles from "./Filter.module.css";

function Filter(props) {
  const { filter } = props;
  const { setFilter } = props;

  return (
    <div className={styles["filter-buttons"]}>
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
    </div>
  );
}

export default Filter;
