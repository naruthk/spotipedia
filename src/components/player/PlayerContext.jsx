import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { AuthContext } from "../auth/AuthContext";
import { getHashParams } from "../../utils/strings";

export const PlayerContext = React.createContext();
export const usePlayerContext = () => useContext(PlayerContext);

const SPOTIFY_AUTH_BASE_URL = "/api/spotify";

export const PlayerProvider = props => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackListing, setTrackListing] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedPlaylistDetail, setSelectedPlaylistDetail] = useState({});
  const [activeSong, setActiveSong] = useState(null);
  const [isOpeningSongDetail, setIsOpeningSongDetail] = useState(false);

  const { user } = useContext(AuthContext);

  /**
   * Looks up currently playing song and the device it is being played on
   */
  useEffect(() => {
    const fetchPlaybackStatus = async () => {
      const params = getHashParams();
      let { access_token: accessToken } = params;
      if (!accessToken) accessToken = localStorage.getItem("token");
      
      if (accessToken) {
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
      }
    };

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
      const params = getHashParams();
      let { access_token: accessToken } = params;
      if (!accessToken) accessToken = localStorage.getItem("token");
      
      if (accessToken) {
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
      }
    };

    fetchPlaylistDetail();
    
    return () => {
      return null;
    }
  }, [selectedPlaylist]);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        trackListing,
        activeSong,
        isOpeningSongDetail,
        setIsOpeningSongDetail,
        selectedPlaylist,
        setSelectedPlaylist,
        selectedPlaylistDetail
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isPlaying: PropTypes.bool,
  trackListing: PropTypes.array,
  activeSong: PropTypes.shape({
    songId: PropTypes.string,
    songName: PropTypes.string,
    songDuration: PropTypes.number
  })
};

PlayerProvider.defaultProps = {
  isPlaying: false,
  trackingListing: [],
  activeSong: null
};