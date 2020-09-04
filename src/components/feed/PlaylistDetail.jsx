import React, { useContext } from "react";

import { PlayerContext } from "../player/PlayerContext";

import styles from "./PlaylistDetail.module.scss";

const displaySongDetail = song => {
  const { name, images, artists, popularity } = song;
  return (
    <li className={styles.songDetailList}>
      <h3 style={styles.popularityIndex}>{popularity}</h3>
      <img
        className={styles.artwork}
        src={images && images[0]}
        title={name}
      />
      <div>
        <h2 className={styles.songName}>{name}</h2>
        <p className={styles.artists}>{artists.map(artist => artist.name).join(", ")}</p>
      </div>
    </li>
  );
};

export default function PlaylistDetail({
  playlist,
  setIsOpeningPlaylistDetail
}) {
  if (!playlist) return null;

  const { selectedPlaylistDetail } = useContext(PlayerContext);

  const { name, images, tracks } = playlist;

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => setIsOpeningPlaylistDetail(false)}
      >
        Go back
      </button>
      <h1>
        {name}
        <small className={styles.subheading}>({tracks.total} songs)</small>
      </h1>
      <main className={styles.playlistDetail}>
        <aside className={styles.sidebar}>
          {images.length >= 1 && <img alt={name} src={images[0].url} />}
        </aside>
        <div className={styles.trackListing}>
          <ul>
            {selectedPlaylistDetail && selectedPlaylistDetail.data && selectedPlaylistDetail.data.map(song => displaySongDetail(song))}
          </ul>
        </div>
      </main>
    </div>
  )
}
