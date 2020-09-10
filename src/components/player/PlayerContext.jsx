import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { AuthContext } from "../auth/AuthContext";
import { getHashParams } from "../../utils/strings";

export const PlayerContext = React.createContext();
export const usePlayerContext = () => useContext(PlayerContext);

const SPOTIFY_AUTH_BASE_URL = "/api/spotify";

const getAccessToken = () => {
  const params = getHashParams();
  let { access_token: accessToken } = params;
  if (!accessToken) accessToken = localStorage.getItem("token");
  return accessToken;
};

/**
 * PlayerProvider controls and outputs any information pertaining to the
 * user's interaction with the app. These interactions include actions such
 * as playing and pausing a song to selecting a playlist and fetching the
 * detail for that particular playlist.
 */
export const PlayerProvider = props => {
  // States relating to controls and actions
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSong, setActiveSong] = useState(null);
  const [isOpeningSongDetail, setIsOpeningSongDetail] = useState(false);
  
  // Other types of states
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedPlaylistDetail, setSelectedPlaylistDetail] = useState({});
  const [selectedArtist, setSelectedArtist] = useState(null);

  const { user } = useContext(AuthContext);

  /**
   * Looks up the currently active song being played on an active device
   */
  const fetchPlaybackStatus = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    const response = await axios
      .post(`${SPOTIFY_AUTH_BASE_URL}/fetch-playback`, {
        accessToken,
        market: user && user.country
      })
      .catch(_ => {
        // TO-DO: Do something
      });

    if (!response) return;

    setActiveSong(response.data);
    setIsPlaying(true);
  };

  /**
   * Fetches songs from a particular playlist
   * @param {string} apiUrl URL for retriving the playlist detail
   */
  const fetchPlaylistDetail = async apiUrl => {
    const accessToken = getAccessToken();
    if (!accessToken || !apiUrl) return;

    const response = await axios
      .post(`${SPOTIFY_AUTH_BASE_URL}/fetch-playlist-detail`, {
        accessToken,
        apiUrl
      })
      .catch(_ => {
        // TO-DO: Do something
      });

    if (!response) return;

    setSelectedPlaylistDetail(response.data);
  };

  /**
   * Fetches the song to be played
   * @param {object} param Contains the contextUri for retriving data and
   * method for updating (pause or play)
   */
  const fetchUpdateCurrentPlayback = async ({
    contextUri,
    positionMs = 0,
    updateMethod
  }) => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    const response = await axios
      .post(`${SPOTIFY_AUTH_BASE_URL}/update-playback-state`, {
        accessToken: accessToken,
        contextUri,
        positionMs,
        updateMethod,
        deviceId: activeSong && activeSong.device && activeSong.device.id
      })
      .catch(err => {
        alert(`Unable to ${updateMethod}`)
        setIsPlaying(false);
      });

    if (!response) return setIsPlaying(false);

    if (contextUri) fetchPlaybackStatus();
  };

  /**
   * Skip to the previous song or forward to the next.
   * Accordingly, the function also updates the active playback status.
   * @param {string} direction 
   */
  const skipPreviousOrNext = async direction => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    const response = await axios
      .post(`${SPOTIFY_AUTH_BASE_URL}/skip-prev-next-track`, {
        accessToken,
        skipDirection: direction
      })
      .catch(_ => {
        // TO-DO: Do something
      });

    if (!response) return;

    fetchPlaybackStatus();
  };

  useEffect(() => {
    fetchPlaybackStatus();
    
    return () => setActiveSong(null);
  }, []);

  useEffect(() => {
    fetchPlaylistDetail(selectedPlaylist && selectedPlaylist.tracks.href);
  }, [selectedPlaylist]);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        activeSong,
        isOpeningSongDetail,
        setIsOpeningSongDetail,
        updateCurrentlyPlayingSong: props => fetchUpdateCurrentPlayback(props),
        selectedPlaylist,
        setSelectedPlaylist,
        selectedPlaylistDetail,
        updatePlaylistDetail: apiUrl => fetchPlaylistDetail(apiUrl),
        selectedArtist,
        setSelectedArtist,
        skipPrevious: () => skipPreviousOrNext("previous"),
        skipNext: () => skipPreviousOrNext("next")
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isPlaying: PropTypes.bool,
  activeSong: PropTypes.shape({
    songId: PropTypes.string,
    songName: PropTypes.string,
    songDuration: PropTypes.number
  })
};

PlayerProvider.defaultProps = {
  isPlaying: false,
  activeSong: null
};