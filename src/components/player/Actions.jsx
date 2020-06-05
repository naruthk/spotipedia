import React, { useContext } from 'react';
import { FaRegHeart, FaHeart, FaBars, } from "react-icons/fa";

import { PlayerContext } from "./PlayerContext";

import styles from "./Actions.module.scss";

export default function Actions() {
  const { activeSong } = useContext(PlayerContext);

  return (
    <div className={styles.container}>
      {activeSong && <button title="Favorite"><FaRegHeart className={styles.icon} /></button>}
      <button title="Settings"><FaBars className={styles.icon} /></button>
    </div>
  )
}