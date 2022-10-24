import Head from "next/head";

import Home from "../components/home/Home.js";

function Homepage() {
  return (
    <>
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
    </>
  );
}

export default Homepage;
