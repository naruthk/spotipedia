import React, { useContext } from "react";
import styled, { css } from "styled-components";

import { PlayerContext } from "../player/PlayerContext";

import Sidebar from "./Sidebar";
import Navigation from "./Navigation";
import Detail from "./Detail";
import Player from "./Player";

import styles from "./Dashboard.module.scss";

const ContextSwitcher = styled.div`
  ${props => props.hasActiveSong && css`
    margin-left: 260px
  `}
`;

/**
 * Dashboard displays the interface of the sidebar, player controls,
 * and main information about the artists or songs 
 */
export default function Dashboard() {
  const { activeSong } = useContext(PlayerContext);

  return (
    <div className={styles.container}>
      <main className={styles.app}>
        {activeSong && <Sidebar />}
        <ContextSwitcher
          className={styles.contextSwitcherContainer}
          hasActiveSong={!!activeSong}
        >
          <Navigation />
          <Detail />
        </ContextSwitcher>
      </main>
      <Player />
    </div>
  )
}
