import React, { useContext, useState } from 'react';

import { PlayerContext } from "../player/PlayerContext";
import Playlists from "../feed/Playlists";
import PlaylistDetail from "../feed/PlaylistDetail";
import PlaybackDetail from "../playback/PlaybackDetail";

import styles from "./Detail.module.scss";

export default function Detail() {
  const { isOpeningSongDetail, setIsOpeningSongDetail } = useContext(PlayerContext);

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
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
