import React, { useContext } from 'react';

import styles from "./PlaylistDetail.module.scss";

export default function PlaylistDetail({
  playlist,
  setIsOpeningPlaylistDetail
}) {
  if (!playlist) return null;

  const { name, images } = playlist;

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => setIsOpeningPlaylistDetail(false)}
      >
        Go back
      </button>
      <h1>{name}</h1>
      <main className={styles.playlistDetail}>
        <sidebar className={styles.sidebar}>
          {images.length >= 1 && <img alt={name} src={images[0].url} />}
        </sidebar>
        <div className={styles.trackListing}>
          <ul>
            <li>Song #1</li>
            <li>Song #2</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
