import { useEffect } from "react";
import styles from "./Backdrop.module.css";

function Backdrop({ children, onClick, level, disabled = false }) {
  const onKeyDownHandler = (e) => {
    if (e.key === "Escape") {
      onClick();

      window.removeEventListener("keyup", onKeyDownHandler);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !disabled) {
      window.addEventListener("keyup", onKeyDownHandler);
    }
  }, []);

  return (
    <div
      className={`${styles["backdrop"]} ${
        level ? styles[level] : styles["index-2"]
      }`}
      onClick={() => {
        onClick();
        if (!disabled) {
          window.removeEventListener("keyup", onKeyDownHandler);
        }
      }}
    >
      {children}
    </div>
  );
}

export default Backdrop;
