import React, { useContext } from 'react';

import { PlayerContext } from "../player/PlayerContext";

import styles from "./PlaybackDetail.module.scss";

export default function PlaybackDetail({ setIsOpeningSongDetail }) {

  return (
    <div className={styles.container}>
      <div className={styles.lyricsWrapper}>
        <p>Find lyrics using Genius crawl via Cheerio</p>
        <p>Using terminal to search / play song?....</p>
      </div>
    </div>
  )
}
