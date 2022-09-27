import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import Nav from "../../navigation/Nav";
import AuthenticationForm from "../components/authenticationForm/AuthenticationForm";

function Layout(props) {
  const { authentication } = useSelector((state) => state);

  return (
    <Fragment>
      <Nav />
      {authentication.displayForm && (
        <AuthenticationForm authentication={authentication} />
      )}
      <main id="main">{props.children}</main>
    </Fragment>
  );
}

export default Layout;
