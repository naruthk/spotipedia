import React from "react";

import Controls from '../player/Controls';
import Progress from '../player/Progress';
// import Actions from '../player/Actions';

import styles from "./Player.module.scss";

const Player = () => (
  <div className={styles.container}>
    <Controls />
    <Progress />
    {/* TO-DO: Enable <Actions /> component after integrating Favorites */}
  </div>
);

export default Player;
