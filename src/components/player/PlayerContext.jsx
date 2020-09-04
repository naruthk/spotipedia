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

export const PlayerProvider = props => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSong, setActiveSong] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isOpeningSongDetail, setIsOpeningSongDetail] = useState(false);
  
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedPlaylistDetail, setSelectedPlaylistDetail] = useState({});
  
  const [selectedArtist, setSelectedArtist] = useState(null);

  const { user } = useContext(AuthContext);

  const fetchPlaybackStatus = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    const response = await axios
      .post(`${SPOTIFY_AUTH_BASE_URL}/fetch-playback`, {
        accessToken: accessToken,
        market: user && user.country
      })
      .catch(err => {
        // TO-DO: Do something
      });

    if (!response) return;

    setActiveSong(response.data);
    setIsPlaying(true);
  };

  /**
   * Looks up currently playing song and the device it is being played on
   */
  useEffect(() => {
    fetchPlaybackStatus();
    
    return () => {
      setActiveSong(null);
      setIsPlaying(false);
      return null;
    }
  }, []);

  /**
   * Looks up songs for a particular playlist that is chosen
   */
  useEffect(() => {
    const fetchPlaylistDetail = async () => {
      const accessToken = getAccessToken();
      if (!accessToken) return;

      const response = await axios
        .post(`${SPOTIFY_AUTH_BASE_URL}/fetch-playlist-detail`, {
          accessToken: accessToken,
          apiUrl: selectedPlaylist && selectedPlaylist.tracks.href
        })
        .catch(err => {
          // TO-DO: Do something
        });

      if (!response) return;

      setSelectedPlaylistDetail(response.data);
    };

    fetchPlaylistDetail();
    
    return;
  }, [selectedPlaylist]);

  /**
   * Play the selected song
   */
  useEffect(() => {
    const fetchUpdateCurrentPlayback = async () => {
      const accessToken = getAccessToken();
      if (!accessToken) return;

      // const response = await axios
      //   .post(`${SPOTIFY_AUTH_BASE_URL}/update-current-playback`, {
      //     accessToken: accessToken,
      //     apiUrl: selectedPlaylist && selectedPlaylist.tracks.href
      //   })
      //   .catch(err => {
      //     // TO-DO: Do something
      //   });

      // if (!response) return;

      // fetchPlaybackStatus();
    };

    fetchUpdateCurrentPlayback();

    return;
  }, []);

  const skipPreviousOrForward = async direction => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    const response = await axios
      .post(`${SPOTIFY_AUTH_BASE_URL}/skip-prev-next-track`, {
        accessToken: accessToken,
        skipDirection: direction
      })
      .catch(err => {
        // TO-DO: Do something
      });

    if (!response) return;

    setActiveSong(response.data);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        activeSong,
        isOpeningSongDetail,
        setIsOpeningSongDetail,
        setSelectedSong,
        selectedPlaylist,
        setSelectedPlaylist,
        selectedPlaylistDetail,
        selectedArtist,
        setSelectedArtist,
        skipPrevious: () => skipPreviousOrForward("previous"),
        skipForward: () => skipPreviousOrForward("forward")
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