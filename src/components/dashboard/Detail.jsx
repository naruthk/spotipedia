import React, { useContext } from 'react';

import { AuthContext } from "../auth/AuthContext";
import { PlayerContext } from "../player/PlayerContext";

import styles from "./Detail.module.scss";

export default function Detail() {
  const { user } = useContext(AuthContext);
  const { activeSong } = useContext(PlayerContext);

  return (
    <div className={styles.container}>
      <div className={styles.lyricsWrapper}>
        <p>Find lyrics using Genius crawl via Cheerio</p>
        <p>Using terminal to search / play song?....</p>
        <p>Dark mode</p>
      </div>
    </div>
  )
}
