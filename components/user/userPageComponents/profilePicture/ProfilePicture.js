import React, { useState } from "react";
import styles from "./ProfilePicture.module.css";

import Image from "next/image";

import Button from "../../../ui/components/button/Button";

function ProfilePicture(props) {
  const [displayForm, setDisplayForm] = useState(false);

  const { user } = props;

  return (
    <div className={styles["profile-picture"]}>
      <div className={styles["image-wrapper"]}>
        <Image src="/3.jpg" alt="Dummy photo" layout="fill" objectFit="cover" />
      </div>
      <Button classes="button--white" type="button" text="Change Photo" />
    </div>
  );
}

export default ProfilePicture;
