import styles from "./Sertan.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Phone from "../../../../public/svg/Phone.js";
import Email from "../../../../public/svg/Email.js";
import Location from "../../../../public/svg/Location.js";

import GitHub from "../../../../public/sertan/socialMedia/GitHub.js"
import Instagram from "../../../../public/sertan/socialMedia/Instagram.js"
import LinkedIn from "../../../../public/sertan/socialMedia/LinkedIn.js"

import Teach from "../../../../public/svg/Teach.js";
import Google from "../../../../public/svg/Google.js";
import WebDesign from "../../../../public/svg/WebDesign.js";
import WebDevelopment from "../../../../public/svg/WebDevelopment.js";

function Sertan() {
  return (
    <Container fluid className={styles["wrapper"]}>
      <Row className={styles["about-container"]}>
        <Col sm={2} className={styles["image-container"]}>
          <div className={styles["image"]}></div>
        </Col>
        <Col>
          <Row className={styles["title"]}>About Me</Row>
          <Row className={styles["body"]}>
            As the founder, the developer, and the main tutor of EngPot English,
            I consider myself an enthusiast following the dreams of him.
            <br />
            <br />
            Having graduated from the department of American Culture and
            Literature, I definitely do not limit my career as a Linguist,
            instead, I have been, and still am, building my skills as a problem
            solver, product manager, last but not least software developer.
            <br />
            <br />
            My skill set consists of Web Application Development
            (ReactJS-NextJS) , RESTful APIs (ExpressJS), User Interface
            Management, User Experience Enhancement, Development Operations,
            Design and Testing Tools (Jest - Vitest) , and SQL and No-SQL
            Queries.
            <span className={styles["side-note"]}>
              if you are a recruiter, please do not forget to visit my LinkedIn
              and GitHUB profiles &#128522;
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
                ssoydabas41@gmail.com
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
          <div className={styles['social-media-links']}>
            <LinkedIn />
            <GitHub fill={"#fff"} />
            <Instagram />
          </div>
        </Col>
        <Col className={styles["info"]}>
          <Row className={styles["title"]}>What I Do</Row>
          <Row className={styles["body"]}>
            <Container className={styles["icon-containers-wrapper"]}>
              <Row>
                <Col className={styles["icon-container"]}>
                  <div className={styles["icon"]}>
                    <WebDevelopment fill={"#faed26"} />
                  </div>
                  <div className={styles["subtitle"]}>Web Development</div>
                  <div className={styles["subtext"]}>
                    I plan, produce, design, and develop web applications for
                    mobile, laptop, and desktop devices. Although I am able to
                    command other technologies, I see myself as a MERN Stack
                    developer.
                  </div>
                </Col>
                <Col className={styles["icon-container"]}>
                  <div className={styles["icon"]}>
                    <WebDesign fill={"#faed26"} />
                  </div>
                  <div className={styles["subtitle"]}>UI Designer</div>
                  <div className={styles["subtext"]}>
                    Since I am responsible for both ends of the development
                    process. I also design UI/UX that makes the clients
                    comfortable as they explore the applications that I develop.
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className={styles["icon-container"]}>
                  <div className={styles["icon"]}>
                    <Google fill={"#faed26"} />
                  </div>
                  <div className={styles["subtitle"]}>
                    Search Engine Optimization
                  </div>
                  <div className={styles["subtext"]}>
                    Reachability is #1 priority in all walks of web development,
                    and product management, therefore, I ensure that the
                    products that I manage can easily be displayed/explored in
                    Search Engines.
                  </div>
                </Col>
                <Col className={styles["icon-container"]}>
                  <div className={styles["icon"]}>
                    <Teach fill={"#faed26"} />
                  </div>
                  <div className={styles["subtitle"]}>Teach English</div>
                  <div className={styles["subtext"]}>
                    I am a TESOL Certified ESL teacher, meaning that I find joy
                    in teaching my students/friends English for I believe the
                    people considering themselves as educated should be able to
                    speak the language of the Earth.
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

export default Sertan;
