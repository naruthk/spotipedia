import React from 'react';

import Sidebar from "./Sidebar";
import Navigation from "./Navigation";
import Detail from "./Detail";
import Player from "../player/Player";

import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <main className={styles.app}>
        <Sidebar />
        <div className={styles.contextSwitcherContainer}>
          <Navigation />
          <Detail />
        </div>
      </main>
      <Player />
    </div>
  )
}
