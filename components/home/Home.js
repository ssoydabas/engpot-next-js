import React, { useRef } from "react";
import styles from "./Home.module.css";

import Welcome from "./homeComponents/welcome/Welcome";
import ContactUs from "./homeComponents/contactUs/ContactUs";
import Contents from "./homeComponents/contents/Contents";
import AboutEngPot from "./homeComponents/aboutEngPot/AboutEngPot";
import SocialMedia from "./homeComponents/socialMedia/SocialMedia";

const dummyContentsArray = [
  {
    id: "1",
    level: "Beginner Level",
    title: "React Front to Back End",
    text: "Learn react like you never before, we have the one and only product that helps you with all!",
  },
  {
    id: "2",
    level: "Beginner Level",
    title: "React Front to Back End",
    text: "Learn react like you never before, we have the one and only product that helps you with all!",
  },
  {
    id: "3",
    level: "Beginner Level",
    title: "React Front to Back End",
    text: "Learn react like you never before, we have the one and only product that helps you with all!",
  },
  {
    id: "4",
    level: "Beginner Level",
    title: "React Front to Back End",
    text: "Learn react like you never before, we have the one and only product that helps you with all!",
  },
  {
    id: "5",
    level: "Beginner Level",
    title: "React Front to Back End",
    text: "Learn react like you never before, we have the one and only product that helps you with all!",
  },
  {
    id: "6",
    level: "Beginner Level",
    title: "React Front to Back End",
    text: "Learn react like you never before, we have the one and only product that helps you with all!",
  },
];
function Home() {
  const aboutEngPotRef = useRef();

  const scrollToAboutEngPot = () => {
    aboutEngPotRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`${styles["home"]} scroll`}>
      <Welcome scrollToAboutEngPot={scrollToAboutEngPot} />
      <ContactUs />
      {/* <Contents contentsArray={dummyContentsArray} /> */}
      <AboutEngPot aboutEngPotRef={aboutEngPotRef} />
      <SocialMedia />
    </div>
  );
}

export default Home;
