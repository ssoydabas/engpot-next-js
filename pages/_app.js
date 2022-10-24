import "./styles/globals.css";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "../store/store.js";
import AuthenticationRefresher from "../util/components/authenticationRefresher/AuthenticationRefresher.js";
import SSRProvider from "react-bootstrap/SSRProvider";

import Layout from "../components/ui/layout/Layout.js";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthenticationRefresher>
        <SSRProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SSRProvider>
      </AuthenticationRefresher>
    </Provider>
  );
}

export default MyApp;
