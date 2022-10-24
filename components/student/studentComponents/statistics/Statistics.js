import styles from "./Statistics.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Backdrop from "../../../ui/components/backdrop/Backdrop";

function Statistics({ student, setDisplayStatistics, isMobile }) {
  return (
    <>
      <Backdrop onClick={setDisplayStatistics.bind(null, false)} />
      <Container fluid className={`${styles["statistics"]} scroll`}>
        {isMobile && (
          <div
            className={styles["x-button"]}
            onClick={setDisplayStatistics.bind(null, false)}
          >
            X
          </div>
        )}
        <Row className={styles["engpot-details"]}>
          <Col>
            <Form.Label htmlFor="">EngPot Credits</Form.Label>
            <section>{student.engPotInfo.engPotDetails.engPotCredits}</section>
          </Col>
          <Col>
            <Form.Label htmlFor="">Lessons Taken</Form.Label>
            <section>{student.engPotInfo.engPotDetails.lessonsTaken}</section>
          </Col>
          <Col>
            <Form.Label htmlFor="">
              <s>Speaking Lessons</s>
            </Form.Label>
            <section>
              {student.engPotInfo.engPotDetails.speakingLessonsTaken}
            </section>
          </Col>
          <Col>
            <Form.Label htmlFor="">Lessons Cancelled</Form.Label>
            <section>
              {student.engPotInfo.engPotDetails.lessonsCancelled}
            </section>
          </Col>
          <Col>
            <Form.Label htmlFor="">Lessons Postponed</Form.Label>
            <section>
              {student.engPotInfo.engPotDetails.lessonsPostponed}
            </section>
          </Col>
          <Col>
            <Form.Label htmlFor="">EngPot Tokens</Form.Label>
            <section>{student.engPotInfo.engPotDetails.engPotToken}</section>
          </Col>
          <Col>
            <Form.Label htmlFor="">
              <s>Lessons Earned</s>
            </Form.Label>
            <section>{student.engPotInfo.engPotDetails.lessonsEarned}</section>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

export default Statistics;
