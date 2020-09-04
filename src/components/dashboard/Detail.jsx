import React, { useContext, useState } from 'react';

import { PlayerContext } from "../player/PlayerContext";
import Playlists from "../feed/Playlists";
import PlaylistDetail from "../feed/PlaylistDetail";
import PlaybackDetail from "../playback/PlaybackDetail";

import styles from "./Detail.module.scss";

/**
 * Determines whether or not (A) or (B) should be shown at any given time
 * A) Detail about the chosen song that is being played
 * B) Detail about a selected playlist
 */
export default function Detail() {
  const {
    isOpeningSongDetail,
    setIsOpeningSongDetail,
    selectedPlaylist,
    setSelectedPlaylist
  } = useContext(PlayerContext);

  const [isOpeningPlaylistDetail, setIsOpeningPlaylistDetail] = useState(false);

  return (
    <div className={styles.container}>
      {isOpeningSongDetail
        ? <PlaybackDetail setIsOpeningSongDetail={setIsOpeningSongDetail} />
        : (!isOpeningPlaylistDetail
          ? (
              <Playlists
                setSelectedPlaylist={setSelectedPlaylist}
                setIsOpeningPlaylistDetail={setIsOpeningPlaylistDetail}
              />
            )
          : (
              <PlaylistDetail
                playlist={selectedPlaylist}
                setIsOpeningPlaylistDetail={setIsOpeningPlaylistDetail}
              />
            )
        )
      }
    </div>
  )
}
