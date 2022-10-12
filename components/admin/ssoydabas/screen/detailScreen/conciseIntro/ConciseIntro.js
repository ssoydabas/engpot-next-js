import React, { useRef } from "react";
import styles from "./ConciseIntro.module.css";

import Link from "next/link";

function ForRecruiters() {
  const jsRef = useRef();
  const ubuntuRef = useRef();
  const nodeRef = useRef();
  const reactRef = useRef();
  const nextRef = useRef();
  const mongoRef = useRef();

  const details_js = (
    <ul className={`${styles["details"]} ${styles["hidden"]}`}>
      <li>EcmaScript 6</li>
    </ul>
  );
  const details_ubuntu = (
    <ul className={`${styles["details"]} ${styles["hidden"]}`}>
      <li>Node 12.22.9</li>
      <li>NPM 8.5.1</li>
      <li>MongoDB 5.0.12</li>
      <li>Mongosh 1.6</li>
      <li>Nginx 1.18.0</li>
      <li>PM2 5.2.0</li>
    </ul>
  );
  const details_node = (
    <ul className={`${styles["details"]} ${styles["hidden"]}`}>
      <li>
        <Link
          href="https://www.npmjs.com/package/bcrypt"
          target="_blank"
          rel="noreferer"
        >
          <a>Bcrypt</a>
        </Link>
      </li>
      <li>
        <Link
          href="https://www.npmjs.com/package/body-parser"
          target="_blank"
          rel="noreferer"
        >
          <a>Body-Parser</a>
        </Link>
      </li>
      <li>
        <Link
          href="https://www.npmjs.com/package/dotenv"
          target="_blank"
          rel="noreferer"
        >
          <a>Dotenv</a>
        </Link>
      </li>
      <li>
        <Link
          href="https://www.npmjs.com/package/googleapis"
          target="_blank"
          rel="noreferer"
        >
          <a>Googleapis</a>
        </Link>
      </li>
      <li>
        <Link
          href="https://www.npmjs.com/package/jsonwebtoken"
          target="_blank"
          rel="noreferer"
        >
          <a>JsonWebToken</a>
        </Link>
      </li>
      <li>
        <Link
          href="https://www.npmjs.com/package/helmet"
          target="_blank"
          rel="noreferer"
        >
          <a>Helmet</a>
        </Link>
      </li>
      <li>
        <Link
          href="https://www.npmjs.com/package/nodemailer"
          target="_blank"
          rel="noreferer"
        >
          <a>NodeMailer</a>
        </Link>
      </li>
    </ul>
  );
  const details_react = (
    <ul className={`${styles["details"]} ${styles["hidden"]}`}>
      <li>
        <Link
          href="https://babeljs.io/docs/en/babel-preset-react"
          target="_blank"
          rel="noreferer"
        >
          <a>Babel-Preset React</a>
        </Link>
      </li>
      <li>
        <Link
          href="https://www.npmjs.com/package/@fullcalendar/react"
          target="_blank"
          rel="noreferer"
        >
          <a>Full Calendar React</a>
        </Link>
      </li>
      <li>
        <Link
          href="https://www.npmjs.com/package/react-redux"
          target="_blank"
          rel="noreferer"
        >
          <a>React Redux</a>
        </Link>
      </li>
    </ul>
  );
  const details_next = (
    <ul className={`${styles["details"]} ${styles["hidden"]}`}>
      <li>
        <Link
          href="https://www.npmjs.com/package/next-transpile-modules"
          target="_blank"
          rel="noreferer"
        >
          <a>Next-Transpile-Modules</a>
        </Link>
      </li>
    </ul>
  );
  const details_mongo = (
    <ul className={`${styles["details"]} ${styles["hidden"]}`}>
      <li>
        <Link
          href="https://www.npmjs.com/package/mongoose"
          target="_blank"
          rel="noreferer"
        >
          <a>Mongoose</a>
        </Link>
      </li>
    </ul>
  );

  const showDetails = (details) => {
    switch (details) {
      case "js":
        jsRef.current.children[2].classList.remove(styles["hidden"]);
        break;
      case "ubuntu":
        ubuntuRef.current.children[2].classList.remove(styles["hidden"]);
        break;
      case "node":
        nodeRef.current.children[2].classList.remove(styles["hidden"]);
        break;
      case "react":
        reactRef.current.children[2].classList.remove(styles["hidden"]);
        break;
      case "next":
        nextRef.current.children[2].classList.remove(styles["hidden"]);
        break;
      case "mongo":
        mongoRef.current.children[2].classList.remove(styles["hidden"]);
        break;
    }
  };
  const hideDetails = (details) => {
    switch (details) {
      case "js":
        jsRef.current.children[2].classList.add(styles["hidden"]);
        break;
      case "ubuntu":
        ubuntuRef.current.children[2].classList.add(styles["hidden"]);
        break;
      case "node":
        nodeRef.current.children[2].classList.add(styles["hidden"]);
        break;
      case "react":
        reactRef.current.children[2].classList.add(styles["hidden"]);
        break;
      case "next":
        nextRef.current.children[2].classList.add(styles["hidden"]);
        break;
      case "mongo":
        mongoRef.current.children[2].classList.add(styles["hidden"]);
        break;
    }
  };

  return (
    <div className={styles["for-recruiters"]}>
      <div className={styles["intro"]}>
        I am a self-taught software developer, a life-long learner, and a TESOL
        certified Englsih tutor. As a self-taught developer, I am very well
        aware of the fact that I do not hold any technical degrees whatsoever,
        though, I did the best I could in my learning process and now I have a
        working full-stack project called EngPot English. I intend to briefly
        inform you about my skills below:
      </div>
      <ul className={styles["list"]}>
        <footer>
          Please hover the technologies to display libraries that is being used.
        </footer>

        <li
          ref={jsRef}
          onMouseEnter={showDetails.bind(null, "js")}
          onMouseLeave={hideDetails.bind(null, "js")}
        >
          <span>JavaScript</span>
          <span>
            I have used <span className={"bold"}>JavaScript</span> in both ends
            of my application along with MongoDB.
          </span>
          {details_js}
        </li>
        <li
          ref={ubuntuRef}
          onMouseOver={showDetails.bind(null, "ubuntu")}
          onMouseLeave={hideDetails.bind(null, "ubuntu")}
        >
          <span>Linux/Ubuntu</span>
          <span>
            EngPot is served by an <span className="bold">Ubuntu</span> server
            using <span className="bold">Nginx</span> on Contabo VPS provider.
          </span>
          {details_ubuntu}
        </li>
        <li
          ref={nodeRef}
          onMouseOver={showDetails.bind(null, "node")}
          onMouseLeave={hideDetails.bind(null, "node")}
        >
          <span>Node JS</span>
          <span>
            EngPot powers itself with the special run-time environment for
            JavaScript known as <span className="bold">Node JS</span>.
          </span>
          {details_node}
        </li>
        <li>
          <span>Express JS</span>
          <span>
            EngPot API is built by <span className="bold">Express JS</span>{" "}
            following a layered architecture of
            <span className="bold"> Route - Controller - Model</span>
          </span>
        </li>
        <li
          ref={reactRef}
          onMouseOver={showDetails.bind(null, "react")}
          onMouseLeave={hideDetails.bind(null, "react")}
        >
          <span>React JS</span>
          <span>
            EngPot is rendered with the help of{" "}
            <span className="bold">React JS</span>, therefore, it is highly
            dependent on JavaScript.
          </span>
          {details_react}
        </li>
        <li
          ref={nextRef}
          onMouseOver={showDetails.bind(null, "next")}
          onMouseLeave={hideDetails.bind(null, "next")}
        >
          <span>Next JS</span>
          <span>
            Unlike React, <span className="bold">Next JS</span> executes{" "}
            <span className="bold">Bundle js</span> on the server and sends
            the final result to the client as HTML. Since HTML is a lot lower
            power intensive, Next JS makes EngPot be much faster.
          </span>
          {details_next}
        </li>
        <li
          ref={mongoRef}
          onMouseOver={showDetails.bind(null, "mongo")}
          onMouseLeave={hideDetails.bind(null, "mongo")}
        >
          <span>MongoDB</span>
          <span>
            <span className="bold">MongoDB</span> is a no-SQL database software,
            therefore, it is vertically scalable. Chances are EngPot may never
            need this scalability, nevertheless, it is a useful feature in case
            it is needed at some point.
          </span>
          {details_mongo}
        </li>
      </ul>
    </div>
  );
}

export default ForRecruiters;
