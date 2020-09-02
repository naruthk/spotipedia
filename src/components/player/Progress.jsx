import React, { useState, useEffect, useContext } from 'react';

import { PlayerContext } from "./PlayerContext";
import { millisToMinutesAndSeconds } from "../../utils/time";

import styles from "./Progress.module.scss";

export default function Progress() {   
  const [timer, setTimer] = useState(null); 
  const [timeElapsed, setTimeElapsed] = useState(null);
  const [formattedElapsedTime, setFormattedElapsedTime] = useState("");

  const {
    isPlaying,
    activeSong,
    isOpeningSongDetail,
    setIsOpeningSongDetail
  } = useContext(PlayerContext);

  useEffect(() => {
    if (!activeSong) return;

    if (!isPlaying) {
      clearInterval(timer);
      return;
    }

    if (timeElapsed >= activeSong.duration) {
      clearInterval(timer);
      // updateSong();
    }

    setTimer(setInterval(() => {
      setTimeElapsed(activeSong.timeElapsed + 1);
    }, 1000));

    return () => clearInterval(timer);
  }, [isPlaying, activeSong, timeElapsed]);

  if (!activeSong) return null;
 
  return (
    <div className={styles.container}>
      <div
        className={styles.artwork}
        onClick={() => setIsOpeningSongDetail(!isOpeningSongDetail)}
      >
        {activeSong && activeSong.album.images && (
          <img
            className={styles.albumCover}
            src={activeSong.album.images[0]}
            alt={activeSong.songName}
          />
        )}
      </div>
      <div className={styles.playerInformation}>
        <section className={styles.information}>
          <h1 className={styles.songName}>{activeSong.songName}</h1>
          <p className={styles.timestamp}>
            {timeElapsed} / {millisToMinutesAndSeconds(activeSong.duration)}
          </p>
        </section>
        <div className={styles.progressBar}>
          <span
            className={styles.foreground}
            style={{ width: `${(timeElapsed / activeSong.duration) * 100}%` }}></span>
          <span
            className={styles.background}
            style={{ width: `${100 - ((timeElapsed / activeSong.duration) * 100)}%` }}></span>
        </div>
      </div>
    </div>
  )
}
