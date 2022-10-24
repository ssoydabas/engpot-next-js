import styles from "./MenuItem.module.css";
import Link from "next/link";

function MenuItem({ title, path, active, toggleNavbar }) {
  return (
    <Link href={path} passHref>
      <a
        className={styles["menu-item"]}
        active={active ? true : ""}
        onClick={toggleNavbar}
      >
        {title}
      </a>
    </Link>
  );
}

export default MenuItem;
