import React from "react";
import PropTypes from "prop-types";
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Spotipedia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
