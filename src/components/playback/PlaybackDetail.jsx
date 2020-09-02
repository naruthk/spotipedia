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
      {/* <h1>{name}</h1>
      <main className={styles.playlistDetail}>
        <sidebar className={styles.sidebar}>
          {images.length >= 1 && <img alt={name} src={images[0].url} />}
        </sidebar>
        <div className={styles.trackListing}>
          <ul>
            <li>Song #1</li>
            <li>Song #2</li>
          </ul>
        </div>
      </main> */}
    </div>
  )
}
