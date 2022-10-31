import styles from "./ContactForm.module.css";
import { useRef } from "react";

import Link from "next/link";

import useHttp from "../../../hooks/useHttp.js";
import { useDispatch } from "react-redux";
import { feedbackActions } from "../../../store/feedback/feedback.js";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Error from "../../ui/components/error/Error.js";
import LoadingSpinner from "../../ui/components/loadingSpinner/LoadingSpinner.js";
import Button from "../../ui/components/button/Button.js";

function ContactForm() {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const emailRef = useRef();
  const bodyRef = useRef();

  const {
    closeErrorMessage,
    httpError,
    isLoading,
    sendRequest,
    setHttpError,
    setIsLoading,
  } = useHttp();

  const sendRequestHandler = (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      body: bodyRef.current.value,
    };

    const requestConfig = {
      url: `${process.env.API_URL}/v1/admin/contactAdmins`,
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: data,
    };
    const dataProcessingLogic = ({ status, message }) => {
      setIsLoading(false);
      dispatch(feedbackActions.setMessage(message));
      if (status === "OK") {
        nameRef.current.value = "";
        emailRef.current.value = "";
        bodyRef.current.value = "";
      }
    };
    sendRequest(requestConfig, dataProcessingLogic);
  };

  return (
    <>
      {httpError && <Error text={httpError} onClick={closeErrorMessage} />}
      {isLoading && <LoadingSpinner />}
      <Container fluid className={styles["container"]}>
        <Row>
          <Col className={styles["form-container"]}>
            <div className={styles["title"]}>Contact Us</div>
            <div className={styles["text"]}>
              Sometimes life is confusing! We are aware of it, please ask us if
              you have any questions!
            </div>
            <Form onSubmit={sendRequestHandler}>
              <Form.Group>
                <Form.Label>Your Name</Form.Label>
                <Form.Control ref={nameRef} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Your Email</Form.Label>
                <Form.Control ref={emailRef} />
              </Form.Group>
              <Form.Group>
                <Form.Label>How can we help?</Form.Label>
                <Form.Control as={"textarea"} rows={"3"} ref={bodyRef} />
              </Form.Group>
              <Button type={"submit"}>Submit</Button>
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
    </>
  );
}

export default ContactForm;
