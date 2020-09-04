import React from "react";
import PropTypes from "prop-types";
import Head from 'next/head';

import Header from "../header/Header";
import Footer from "../footer/Footer";

import styles from "./PageLayout.module.scss";

export default function PageLayout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} - Spotipedia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
