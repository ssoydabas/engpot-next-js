import React from "react";
import styles from "./Education.module.css";

function Education() {
  return (
    <div className={styles["education"]}>
      <div className={styles["item"]}>
        <div>Firstly:</div>
        <div>
          I started my software development career by learning the fundamentals
          of programming. I have learned the basics of C++ as well as the basic
          concepts - object-oriented programming, functional programming,
          algorithms, and data structures.
        </div>
        <div>
          <span>Resources that I have used:</span>
          <ul>
            <li>Harvard University - CS 50</li>
            <li>EdX - StanfordOnline - Relational Databases</li>
            <li>EdX - IBM SQL for data science</li>
          </ul>
        </div>
      </div>

      <div className={styles["item"]}>
        <div>Secondly:</div>
        <div>
          I decided to discover more programming languages, and I have taught
          myself Python, Pygame, Flask, Django on a basic level. After I have
          comprehended the concept of web development, I decided to switch a
          more common language.
        </div>
        <div>
          <span>Resources that I have used:</span>
          <ul>
            <li>
              EdX - MITx - Introduction to Computer Science and Programming
              Using Python
            </li>
            <li>EdX - HarvardX - Using Python for Research</li>
            <li>EdX - MichiganX - Python Data Structures</li>
          </ul>
        </div>
      </div>

      <div className={styles["item"]}>
        <div>Last but not least:</div>
        <div>
          I decided to channel all my time and focus to JavaScript due to its
          extensive field of use in every walk of programming practices. I have
          learned basics and fundamentals. After I learned Node JS, javascript
          libraries and frameworks, I started building my first project which I
          am currently using to fund myself in this journey.
        </div>
        <div>
          <span>Resources that I have used:</span>
          <ul>
            <li>
              Academind - Maximilian Shwarzmüller - JavaScript Basics and
              Fundamentals
            </li>
            <li>
              Academind - Maximilian Shwarzmüller - Node JS - MVC - Restful API
            </li>
            <li>Academind - Maximilian Shwarzmüller - React JS - Next JS</li>
            <li>Academind - Maximilian Shwarzmüller - MySql - PostgreSql</li>
            <li>Academind - Maximilian Shwarzmüller - Mongo DB - Mongoose</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Education;
