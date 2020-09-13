import React from "react";

import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <h1>&copy; 2020 - Spotipedia</h1>
      <p><strong>Disclaimer:</strong> This app utilizes publicly available Spotify Web APIs to access your playlists and songs playing on your devices. Your data is not stored with Spotipedia. Your privacy is respected.</p>
    </footer>
  );
}
