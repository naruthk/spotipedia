import React, { useContext } from 'react';

import { AuthContext } from "../auth/AuthContext";
import PageLayout from "../layout/PageLayout";

import styles from "./Login.module.scss";

const IMAGES_DATA = [
  {
    author: "Yannis Papanastasopoulos",
    profile: "https://unsplash.com/@yannispap",
    image: "/static/images/unsplash_yannis-papanastasopoulos-yWF2LLan-_o_1920.jpg"
  }
]

export default function Login() {
  const { login } = useContext(AuthContext);

  const artistCreditBio = IMAGES_DATA[0]; // TO-DO: Randomized if multiple images

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
              href={artistCreditBio.profile}
              target="_blank"
              rel="noopener noreferrer"
            > {artistCreditBio.author}</a></span>
          <br />
          <span className={styles.artworkCreditService}>Unsplash</span>
        </div>
      </div>
    </PageLayout>
  )
}
