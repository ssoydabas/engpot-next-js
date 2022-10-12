import React from "react";
import styles from "./Motivation.module.css";

function Motivation() {
  return (
    <div className={styles["motivation"]}>
      <div className={styles["text"]}>
        <span className="bold">/ssoydabas</span> path of my web application is
        dedicated for the other software developers, employers, and recruiters.
        I intentionally insist of repeating the phrase{" "}
        <span className="bold">Self-Taught Developer</span> because I originate
        from a society that pays a little too much attention to diplomas and
        certificates. The source of this tendency is, in my opinion, the lack of
        qualification.
        <br />
        <br />
        Qualities by nature occur as a result of hard work and commitment to the
        field of choice. Therefore, I do not share the idea stated in the
        paragraph above. I believe investing your time to something that you
        love or even that you are interested in will consequently make you able
        to accomplish your dreams.
        <br />
        <br />
        Personally I want to find myself an opportunity to be a part of
        something great, something that I would feel comfortable, surrounded by
        people that appreciate technology as at least much as myself since I am
        very well aware of the fact that people can be defined by the people
        around them.
        <br />
        <br />I consider myself a life-long students who constantly needs to
        improve himself, that is why, I would be grateful if you consider me as
        a candidate for a position that I may contribute. Please do not hesitate
        should you have any questions.
      </div>
      <div className={styles["signature"]}>Sertan Soydabaş</div>
    </div>
  );
}

export default Motivation;
