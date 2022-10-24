import styles from "./Engpot.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Phone from "../../../../public/svg/Phone.js";
import Email from "../../../../public/svg/Email.js";
import Location from "../../../../public/svg/Location.js";

import Classroom from "../../../../public/svg/Classroom.js";
import OnlineLesson from "../../../../public/svg/OnlineLesson.js";
import Chat from "../../../../public/svg/Chat.js";
import Help from "../../../../public/svg/Help.js";

function Engpot() {
  return (
    <Container fluid className={styles["wrapper"]}>
      <Row className={styles["about-container"]}>
        <Col sm={2} className={styles["image-container"]}>
          <div className={styles["image"]}></div>
        </Col>
        <Col>
          <Row className={styles["title"]}>About EngPot</Row>
          <Row className={styles["body"]}>
            EngPot English is a teaching platform. Here tutors and students
            meet, they learn and teach together!
            <br />
            <br />
            This platform has been developed by a TESOL Certified English tutor.
            Therefore, it is developed to answer the specific needs of both
            tutors and students.
            <br />
            <br />
            Tutors can plan and finalize their lessons, they can assign tasks as
            homework, also they can check and evaluate the assignments. Students
            can check their development, and they can display lesson and
            assignment histories. More importantly, they can find some useful
            articles, tips and tricks, and more!
            <br />
            <br />
            Since EngPot is a non-profit project, you can use it as much as you
            want. If you are a teacher, or you have a teacher who do not know
            about us, join our family!
            <br />
            <br />
            <span className={styles["side-note"]}>
              Contact us if you need any help &#128521;
            </span>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col sm={2} className={styles["contact"]}>
          <div className={styles["contact-item"]}>
            <div className={styles["contact-icon"]}>
              <Email fill={"#000"} color={"#faed26"} />
            </div>
            <div className={styles["contact-sub-group"]}>
              <div className={styles["contact-subtitle"]}>Email</div>
              <div className={styles["contact-subtext"]}>
                engpotenglish@gmail.com
              </div>
            </div>
          </div>
          <div className={styles["contact-item"]}>
            <div className={styles["contact-icon"]}>
              <Phone fill={"#000"} color={"#faed26"} />
            </div>
            <div className={styles["contact-sub-group"]}>
              <div className={styles["contact-subtitle"]}>Phone</div>
              <div className={styles["contact-subtext"]}>+90 524 899 50 24</div>
            </div>
          </div>
          <div className={styles["contact-item"]}>
            <div className={styles["contact-icon"]}>
              <Location fill={"#000"} color={"#faed26"} />
            </div>
            <div className={styles["contact-sub-group"]}>
              <div className={styles["contact-subtitle"]}>Location</div>
              <div className={styles["contact-subtext"]}>
                Kocaeli, 41100, Turkey
              </div>
            </div>
          </div>
        </Col>
        <Col className={styles["info"]}>
          <Row className={styles["title"]}>What We Do</Row>
          <Row className={styles["body"]}>
            <Container className={styles["icon-containers-wrapper"]}>
              <Row>
                <Col className={styles["icon-container"]}>
                  <div className={styles["icon"]}>
                    <Classroom fill={"#faed26"} />
                  </div>
                  <div className={styles["subtitle"]}>One-to-one Lessons</div>
                  <div className={styles["subtext"]}>
                    You can learn English with our tutors in a cozy classroom
                    atmosphere. There is always coffee to enjoy!
                  </div>
                </Col>
                <Col className={styles["icon-container"]}>
                  <div className={styles["icon"]}>
                    <OnlineLesson fill={"#faed26"} />
                  </div>
                  <div className={styles["subtitle"]}>Online Lessons</div>
                  <div className={styles["subtext"]}>
                    In a remote world, we support remote life-styles. You may
                    attend your lessons online!
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className={styles["icon-container"]}>
                  <div className={styles["icon"]}>
                    <Chat fill={"#faed26"} />
                  </div>
                  <div className={styles["subtitle"]}>Speaking Practice</div>
                  <div className={styles["subtext"]}>
                    You learn English with lots of practice. You can earn EngPot
                    Tokens to get your free speaking lessons.
                  </div>
                </Col>
                <Col className={styles["icon-container"]}>
                  <div className={styles["icon"]}>
                    <Help fill={"#faed26"} />
                  </div>
                  <div className={styles["subtitle"]}>Get Help</div>
                  <div className={styles["subtext"]}>
                    You can always contact our tutors to ask questions.
                    Especially when you need the most!
                  </div>
                </Col>
              </Row>
            </Container>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Engpot;
