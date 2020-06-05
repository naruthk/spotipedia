import React, { useEffect, useContext } from 'react';

import { PlayerContext } from "./PlayerContext";
import Controls from './Controls';
import Progress from './Progress';
import Actions from './Actions';

import styles from "./Player.module.scss";

export default function Player() {
  const { isPlaying, activeSong, trackingList } = useContext(PlayerContext);

  useEffect(() => {

  }, [])

  return (
    <div className={styles.container}>
      <Controls />
      <Progress />
      <Actions />
    </div>
  )
}
