import styles from "./ContactForm.module.css";

import Link from "next/link";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Button from "../../ui/components/button/Button.js";

function ContactForm() {
  return (
    <Container fluid className={styles["container"]}>
      <Row>
        <Col className={styles["form-container"]}>
          <div className={styles["title"]}>Contact Us</div>
          <div className={styles["text"]}>
            Sometimes life is confusing! We are aware of it, please ask us if
            you have any questions!
          </div>
          <Form>
            <Form.Group>
              <Form.Label>Your Name</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group>
              <Form.Label>Your Email</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group>
              <Form.Label>How can we help?</Form.Label>
              <Form.Control as={"textarea"} rows={"3"} />
            </Form.Group>
            <Button>Submit</Button>
          </Form>
        </Col>
        <Col className={styles["brand-logo"]}>
          <div className={styles["policies"]}>
            <Link href={"/"}>
              <a>
                <s>Terms of Service</s>
              </a>
            </Link>
            <Link href={"/"}>
              <a>
                <s>Privacy Policy</s>
              </a>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactForm;
