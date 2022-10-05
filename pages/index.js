import React, { Fragment } from "react";
import Head from "next/head";

import Home from "../components/home/Home";

function MainPage() {
  return (
    <Fragment>
      <Head>
        <title>EngPot English</title>
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=1"
          shrink-to-fit="no"
        />
        <meta
          name="description"
          content="An extensive platform designed for English Learners as well as English Teachers."
        />
      </Head>
      <Home />
    </Fragment>
  );
}

export default MainPage;
