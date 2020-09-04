import React from "react";

import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <h1>&copy; 2020 - Spotipedia</h1>
      <p>This app utilizes available Spotify Web APIs to access your playlists and songs playing on your devices. No data is collected or stored. Your privacy is respected.</p>
    </footer>
  );
}
