import React from "react";
import PropTypes from "prop-types";

import "../src/styles/global.scss";
import { AuthProvider } from "../src/components/auth/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

App.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
};
