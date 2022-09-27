import "./styles/globals.css";

import store from "../store/store";
import { Provider } from "react-redux";

import Layout from "../components/ui/layout/Layout";
import AuthenticationRefresher from "../util/components/authenticationRefresher/AuthenticationRefresher";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthenticationRefresher>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthenticationRefresher>
    </Provider>
  );
}

export default MyApp;
