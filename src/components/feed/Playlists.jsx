import React, { useContext } from 'react';

import { AuthContext } from "../auth/AuthContext";

import styles from "./Playlists.module.scss";

export default function Playlists({
  setSelectedPlaylist,
  setIsOpeningPlaylistDetail
}) {
  const { playlists } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <h1>My Playlists</h1>
      <ul>
        {playlists && playlists.data.map(playlist => {
          const { name, images, tracks } = playlist;
          return (
            <li onClick={() => {
              setSelectedPlaylist(playlist);
              setIsOpeningPlaylistDetail(true);
            }}>
              <div className={styles.albumBackground}>
                {images.length >= 1 && <img alt={name} src={images[0].url} />}
              </div>
              <h2>{name}</h2>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
