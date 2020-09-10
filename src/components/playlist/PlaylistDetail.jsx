import React, { useContext, useState } from "react";

import { PlayerContext } from "../player/PlayerContext";
import { ScrollToBottomListener } from "../events";

import styles from "./PlaylistDetail.module.scss";

const displayTrackListing = (listing, setSong) => {
  if (!listing) return;

  return (
    <ul className={styles.songDetailListWrapper}>
      {listing.map((song, index) => {
        const { albumUri, name, images, artists } = song;
        return (
          <li
            className={styles.songDetailList} key={`${name}-${index}`}
            onClick={() => setSong({ contextUri: albumUri, updateMethod: "play" })}
          >
            <h3 className={styles.index}>{index + 1}</h3>
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
      })}
    </ul>
  );
};

export default function PlaylistDetail({
  playlist,
  setIsOpeningPlaylistDetail
}) {
  if (!playlist) return null;

  const {
    selectedPlaylistDetail,
    updateCurrentlyPlayingSong,
    updatePlaylistDetail
  } = useContext(PlayerContext);

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [nextPage, setNextPage] = useState(selectedPlaylistDetail && selectedPlaylistDetail.next || false);
  const [songs, setSongs] = useState(selectedPlaylistDetail && selectedPlaylistDetail.data || []);

  const { name, images, tracks } = playlist;

  const onScrollReachBottom = async () => {
    if (isLoadingData || !nextPage) return;

    setIsLoadingData(true);

    const response = await updatePlaylistDetail(selectedPlaylistDetail.next);

    setIsLoadingData(false);
    setNextPage(response.next);
    setSongs(songs.concat(response.data));
  }

  return (
    <ScrollToBottomListener onScrollReachBottom={onScrollReachBottom}>  
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
            {displayTrackListing(songs, updateCurrentlyPlayingSong)}
          </div>
        </main>
      </div>
    </ScrollToBottomListener>
  )
}
