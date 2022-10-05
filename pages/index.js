import React, { Fragment } from "react";
import Head from "next/head";

import Home from "../components/home/Home";

function MainPage() {
  if (typeof window !== "undefined") {
    setTimeout(function () {
      window.scrollTo(0, 1);
    }, 0);
  }

  return (
    <Fragment>
      <Head>
        <title>EngPot English</title>
        <meta
          name="description"
          content="An extensive platform designed for English Learners as well as English Teachers."
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <Home />
    </Fragment>
  );
}

export default MainPage;
