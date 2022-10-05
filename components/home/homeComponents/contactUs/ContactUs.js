import React from "react";
import styles from "./ContactUs.module.css";

import Button from "../../../ui/components/button/Button";

function ContactUs() {
  return (
    <form className={styles["contact-us"]}>
      <div className={styles["title"]}>Want to be student, or teacher?</div>
      <div className={styles["contact-form"]}>
        <input type="text" placeholder="Your Mail" />
        <Button classes="button" text="Contact" type="button" />
      </div>
    </form>
  );
}

export default ContactUs;
