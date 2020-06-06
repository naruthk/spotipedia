import React from "react";

import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <h1>&copy; 2020 - Spotify Lyrics</h1>
      <p>This app utilizes Spotify Web APIs for access to your playlists, user information, and active playing songs. No data is collected or stored with us. Your privacy is respected.</p>
    </footer>
  );
}
