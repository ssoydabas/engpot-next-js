import { useEffect, useState } from "react";
import styles from "./Navigation.module.css";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import MenuItem from "./menuItem/MenuItem.js";
import constructNavLinks from "../../../util/constructNavLinks.js";

import Button from "../components/button/Button.js";

function Navigation({
  authentication,
  authForm,
  http,
  dispatch,
  authFormActions,
  authenticationActions,
  feedbackActions,
  windowDimensions,
}) {
  const router = useRouter();

  const { user } = authentication;
  const { authenticationToken } = authentication;

  const [expanded, setExpanded] = useState(false);
  const toggleNavbar = () => {
    if (windowDimensions.width <= 480) {
      setExpanded(!expanded);
    }
  };

  const [isMobile, setIsMobile] = useState("mobile");
  useEffect(() => {
    if (windowDimensions.width <= 480) {
      setIsMobile("mobile");
    } else {
      setIsMobile("desktop");
    }
  }, [windowDimensions]);

  const toggleAuthFormDisplay = () => {
    dispatch(authFormActions.toggleFormDisplay());
    toggleNavbar();
  };

  const navLinks =
    user && authenticationToken && constructNavLinks(user.engPotInfo.status);

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      className={styles["navbar"]}
      fixed={isMobile === "mobile" ? "bottom" : "top"}
    >
      <Container fluid className={styles["container"]}>
        <Navbar.Brand className={`${styles["image-wrapper"]}`}>
          <Image
            src={"/engPot/navigation-image.png"}
            layout={"fill"}
            objectFit={"contain"}
            alt={"navigation logo"}
            priority
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles["toggle-button"]}
          onClick={toggleNavbar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Navbar.Toggle>

        <Navbar.Collapse
          id="basic-navbar-nav"
          className={styles["nav-collapse"]}
        >
          <Container fluid className={styles["menu"]}>
            <MenuItem title={"Home"} path={"/"} toggleNavbar={toggleNavbar} />
            {navLinks &&
              navLinks.map((item, index) => (
                <MenuItem {...item} key={index} toggleNavbar={toggleNavbar} />
              ))}
          </Container>

          {!user && !authenticationToken && (
            <Button onClick={toggleAuthFormDisplay}>Sign In</Button>
          )}

          {user && authenticationToken && (
            <NavDropdown
              title={user.personalInfo.name}
              className={styles["user-dropdown"]}
              autoClose={true}
              drop={isMobile === "mobile" ? "up" : "down"}
            >
              <NavDropdown.Item as={"div"}>
                <Link href={`/user/${user._id}`} passHref>
                  <a onClick={toggleNavbar}>Your Account</a>
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Divider />

              <NavDropdown.Item>
                <div
                  onClick={() => {
                    dispatch(
                      authenticationActions.terminateAuthenticationToken()
                    );
                    toggleNavbar();
                    router.replace("/");
                  }}
                >
                  Sign Out
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
