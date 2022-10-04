import React from "react";
import styles from "./NavLogo.module.css";

import Image from "next/image";

function NavLogo() {
  return (
    <div className={styles["brand-logo"]}>
      <div className={styles["image-wrapper"]}>
        <Image
          src={"/nav.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"navigation logo"}
        />
      </div>
    </div>
  );
}

export default NavLogo;
