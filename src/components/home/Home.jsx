import React, { useEffect, useContext } from 'react';
import Router from 'next/router';
import styles from "./Home.module.scss";

import { AuthContext } from "../auth/AuthContext";
import PageLayout from "../layout/PageLayout";

export default function Home() {
  const { isLoggedIn, login } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) Router.replace("/app");
  }, [])

  return (
    <PageLayout title="Home">
      <div className={styles.container}>
        <section className={styles.featured}>
          <h1 className={styles.title}>Spotipedia</h1>
          <h2 className={styles.subtitle}>Think your favorite music player with the knowledge like Wikipedia</h2>
        </section>

        {/* Promote the player */}
        <div className={styles.landingPageBlock}>
          <section className={styles.promotePlayer}>
            <div>
              <img
                className={styles.promotePlayerImage}
                src="/static/images/landing/pexels-anna-shvets-4315839.jpg"
              />
              <p>Photo by Anna Shvets from Pexels</p>
            </div>
            <div className={styles.landingPageTextBlock}>
              <h2 className={styles.title}>The same music player with more knowledge about artists and songs</h2>
              <p className={styles.landingPageParagraph}>There's more to it than just listening to your music. With Spotipedia, information about your artists comes to life and is beautifully presented.</p>
            </div>
          </section>
        </div>

        {/* Promote the UI */}
        <div className={styles.landingPageBlock}>
          <section className={styles.promoteUserInterface}>
            <h2 className={styles.title}>Beautifully designed to showcase your music</h2>
            <img
              className={styles.interfaceImage}
              src="/static/images/unsplash_yannis-papanastasopoulos-yWF2LLan-_o_1920.jpg"
            />
            <p className={styles.landingPageParagraph}>Designed from the ground up to be fast, responsive, and powerful.</p>
          </section>
        </div>

        {/* Give a try*/}
        <section className={styles.tryApp}>
          <p className={styles.text}>Using just your Spotify account, you can easily give it a try today</p>
          <button
            className={styles.btn}
            title="Try app"
            onClick={() => login()}
          >Sign up with Spotify account</button>
        </section>
      </div>
    </PageLayout>
  )
}
