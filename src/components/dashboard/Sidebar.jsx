import React, { useContext, useState } from 'react';

import { AuthContext } from "../auth/AuthContext";
import { PlayerContext } from "../player/PlayerContext";

import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedArtistIndex, setSelectedArtistIndex] = useState(0);
  const { user } = useContext(AuthContext);
  const { activeSong } = useContext(PlayerContext);

  if (!activeSong) return null;

  const { album, artists, songName } = activeSong;

  const getMoreSong = e => {
    e.preventDefault();
    alert("Coming soon")
  }

  return (
    <div className={styles.container}>
      {album && album.images && (
        <img
          className={styles.albumCover}
          src={album.images[0]}
          alt={songName}
        />
      )}
      <div className={styles.artistsInformation}>
        <h1>
          {`Get to know the artist${artists && artists.length > 1 && "s" || ""}`}
        </h1>
        <ul>
          {activeSong.artists.map((artist, index) => (
            <li>
              <h2
                onClick={() => {
                  setIsSelected(!isSelected);
                  setSelectedArtistIndex(index)
                }}>
                {artist}
              </h2>
              {isSelected && selectedArtistIndex === index && (
                <>
                  <p>A rising superstar in Asia, Singto is a Thai singer who gained popularity with the song Love From My Hometown (2001).</p>
                  <button
                    onClick={getMoreSong}
                    title={`More songs by ${artist}`}
                  >
                    More songs by {artist}
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
