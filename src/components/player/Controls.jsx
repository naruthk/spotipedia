import React, { useContext } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";

import { PlayerContext } from "./PlayerContext";

import styles from "./Controls.module.scss";

export default function Controls() {
  const {
    isPlaying,
    setIsPlaying,
    updateCurrentlyPlayingSong,
    skipPrevious,
    skipNext
  } = useContext(PlayerContext);

  const toggleState = () => {
    if (isPlaying) {
      updateCurrentlyPlayingSong({ updateMethod: "pause"});
    } else {
      updateCurrentlyPlayingSong({ updateMethod: "play"});
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <div className={styles.container}>
      <button
        title="Previous"
        onClick={() => skipPrevious()}
      >
        <FaStepBackward className={styles.icon} />
      </button>
      <button
        onClick={toggleState}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying
          ? <FaPause className={[styles.icon, styles.large].join(" ")} />
          : <FaPlay className={[styles.icon, styles.large].join(" ")} />
        }
      </button>
      <button
        title="Next"
        onClick={() => skipNext()}
      >
        <FaStepForward className={styles.icon} />
      </button>
    </div>
  )
}
