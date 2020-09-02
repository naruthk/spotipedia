import React, { useContext, useState } from 'react';
import { FaSearch, FaHome } from "react-icons/fa";

import { PlayerContext } from "../player/PlayerContext";

import styles from "./Navigation.module.scss";

export default function Navigation() {
  const {
    activeSong,
    isOpeningSongDetail,
    setIsOpeningSongDetail
  } = useContext(PlayerContext);
  const [isSearchInputActive, setSearchInputActive] = useState(false);

  return (
    <div
      className={styles.container} 
      onClick={e => {
        e.preventDefault();
        // if (isSearchInputActive) setSearchInputActive(false)
      }}
    >
      <ul>
        <li>
          {isOpeningSongDetail && (
            <button
              title="Home"
              className={styles.homeButton}
              onClick={() => setIsOpeningSongDetail(false)}
            >
              <FaHome className={styles.icon} />
            </button>
          )}
        </li>
        <li>
          {
            isSearchInputActive
            ? 
              <input
                type="input"
                placeholder="Search songs, albums, singers"
              />
            : <button
                title="Search"
                onClick={e => {
                  e.preventDefault();
                  // setSearchInputActive(!isSearchInputActive)
                }}
              >
                <FaSearch className={styles.icon} />
              </button>
          }
        </li>
        {activeSong && (
          <li>
            <section className={styles.deviceStatus}>
              <h1>Currently playing on</h1>
              <h2>
                {activeSong && activeSong.device && activeSong.device.name}
              </h2>
            </section>
          </li>
        )}
      </ul>
    </div>
  )
}