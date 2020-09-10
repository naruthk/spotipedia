import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Router from 'next/router';

import Loading from "./Loading";
import { getHashParams, generateRandomString } from "../../utils/strings";

export const AuthContext = React.createContext();
export const useAuthContext = () => useContext(AuthContext);

/**
 * The following keys are required for authenticating with 
 * Spotify Developer APIs
 */
const stateKey = "spotify_auth_state";
const SPOTIFY_AUTH_BASE_URL = "/api/spotify";
const SCOPES_LIST = process.env.NEXT_PUBLIC_SPOTIFY_SCOPE.split(",");

/**
 * Context for authentication. Authentication takes place via a web interface
 * connected through Spotify APIs. When logged in, the information such as the
 * user's information, device the song is currently playing on, and saved
 * playlists are downloaded.
 * @param {object} props 
 */
export const AuthProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const resetData = () => {
    localStorage.removeItem(stateKey);
    localStorage.removeItem("token");

    Router.push("/");
  };

  const login = async () => {  
    const state = generateRandomString(16);
  
    let url = process.env.NEXT_PUBLIC_SPOTIFY_AUTH_API;
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID);
    url += '&scope=' + encodeURIComponent(SCOPES_LIST.join(" "));
    url += '&redirect_uri=' + encodeURIComponent(process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI);
    url += '&state=' + encodeURIComponent(state);

    localStorage.setItem(stateKey, state);

    window.location.href = url;
  };

  /**
   *  On every refresh, determines if the user has been logged
   *  in before using the stored session
   */
  useEffect(() => {
    const refresh = async () => {
      const params = getHashParams();
      let { access_token: accessToken, state } = params;

      if (!accessToken) accessToken = localStorage.getItem("token");
      
      const storedState = localStorage.getItem(stateKey);
      if (accessToken && (state === null || state !== storedState)) {
        resetData();
      }

      if (!accessToken) return;
    
      setIsLoading(true);

      // (1) Fetches user's profile and saved playlists
      const userResponse = await axios
        .post(`${SPOTIFY_AUTH_BASE_URL}/authenticate`, {
          accessToken: accessToken
        })
        .catch(_ => {
          setIsLoading(false);
        });

      if (!userResponse) return;

      // (2) Fetches playlists from the user's account
      const playlistsResponse = await axios
        .post(`${SPOTIFY_AUTH_BASE_URL}/fetch-playlists`, {
          accessToken: accessToken
        })
        .catch(_ => {
          setIsLoading(false);
        });

      if (!playlistsResponse) return;

      setUser({
        user: userResponse.data,
        playlists: playlistsResponse.data
      });

      setIsLoggedIn(true);
      setIsLoading(false);

      localStorage.setItem("token", accessToken);

      Router.replace("/app");
    };

    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user && user.user,
        playlists: user && user.playlists,
        login,
        logout: () => resetData(),
        isLoggedIn
      }}
    >
      {isLoading ? <Loading /> : props.children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    profileImage: PropTypes.string
  }),
  playlists: PropTypes.shape({
    data: PropTypes.arrayOf({
      id: PropTypes.string,
      name: PropTypes.string
    })
  })
};

AuthProvider.defaultProps = {
  user: null,
  playlists: null
};