import React, { useContext } from 'react';

import { AuthContext } from "../auth/AuthContext";

import Sidebar from "./Sidebar";
import Player from "../player/Player";

import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className={styles.container}>
        <main className={styles.app}>
          <Sidebar />
          <div className={styles.contextSwitcherContainer}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search for music, albums, singers" />
            <h1>Feed</h1>
          </div>
        </main>
        <Player />
      </div>
    </>
  )
}
