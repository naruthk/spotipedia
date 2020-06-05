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
  const [activeSong, setActiveSong] = useState(null); 

  const { user } = useContext(AuthContext);

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

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        trackListing,
        activeSong
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