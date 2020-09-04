import React, { useContext } from 'react';

import { PlayerContext } from "../player/PlayerContext";

import styles from "./PlaybackDetail.module.scss";

export default function PlaybackDetail() {
  const { activeSong } = useContext(PlayerContext);
  const { artists, album } = activeSong;

  return (
    <div className={styles.container}>
      <div className={styles.lyricsWrapper}>
        <h2>Lyrics</h2>
        <h2>More by {artists.map(artist => artist.name).join(", ")}</h2>
        <h2>Videos</h2>
        <h2>News</h2>
        <h2>Images</h2>
      </div>
    </div>
  )
}
