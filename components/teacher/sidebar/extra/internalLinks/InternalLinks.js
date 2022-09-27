import React, { Fragment } from "react";
import styles from "./InternalLinks.module.css";

import Link from "next/link";

import Backdrop from "../../../../ui/components/backdrop/Backdrop";

function Extra(props) {
  const { setShowMore } = props;

  return (
    <Fragment>
      <Backdrop onClick={setShowMore.bind(null, false)} />
      <div className={`${styles["links"]} card highlight--dark`}>
        <Link href={"/teacherPage/speakingLesson"}>
          <a className={`${styles["link"]} button--white card highlight--dark`}>
            Speaking Lessons
          </a>
        </Link>
        <Link href={"/"}>
          <a className={`${styles["link"]} button--white card highlight--dark`}>
            Games
          </a>
        </Link>
      </div>
    </Fragment>
  );
}

export default Extra;
