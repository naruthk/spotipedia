import React, { useContext } from 'react';

import { AuthContext } from "../auth/AuthContext";
import PageLayout from "../layout/PageLayout";

import styles from "./Login.module.scss";

export default function Login() {
  const { login } = useContext(AuthContext);

  return (
    <PageLayout title="Login">
      <div className={styles.container}>
        <section>
          <button
            className={styles.buttonLogin}
            onClick={() => login()}
            title="Log in"
          >
            Log in using Spotify account
          </button>
        </section>
        <div className={styles.artworkCreditSection}>
          <span className={styles.artworkCreditAuthor}>
            Photo by 
            <a
              href="https://unsplash.com/@yannispap"
              target="_blank"
              rel="noopener noreferrer"
            > Yannis Papanastasopoulos</a></span>
          <br />
          <span className={styles.artworkCreditService}>Unsplash</span>
        </div>
      </div>
    </PageLayout>
  )
}
