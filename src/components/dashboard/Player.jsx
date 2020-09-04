import React, { useEffect, useContext } from 'react';

import { PlayerContext } from "../player/PlayerContext";
import Controls from '../player/Controls';
import Progress from '../player/Progress';
// import Actions from '../player/Actions';

import styles from "./Player.module.scss";

export default function Player() {
  const { isPlaying, activeSong, trackingList } = useContext(PlayerContext);

  useEffect(() => {

  }, [])

  return (
    <div className={styles.container}>
      <Controls />
      <Progress />
      {/* <Actions /> */}
    </div>
  )
}
