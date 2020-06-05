import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Router from 'next/router';

import { getHashParams, generateRandomString } from "../../utils/strings";

export const AuthContext = React.createContext();
export const useAuthContext = () => useContext(AuthContext);

const stateKey = 'spotify_auth_state';
const SPOTIFY_AUTH_BASE_URL = "/api/spotify";

const SCOPES_LIST = [
  "user-read-private",
  "user-read-email",
  "user-read-currently-playing",
  "user-read-playback-position",
  "user-read-playback-state",
  "user-modify-playback-state"
];

export const AuthProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
   *  On every refresh, determines if the user has been logged in before using
   *  stored sessions
   */
  useEffect(() => {
    const refresh = async () => {
      const params = getHashParams();
      let { access_token: accessToken, state } = params;

      const storedState = localStorage.getItem(stateKey);

      if (!accessToken) accessToken = localStorage.getItem("token");
      
      if (accessToken && (state === null || state !== storedState)) {
        resetData();
      }
      
      if (accessToken) {
        const userResponse = await axios
          .post(`${SPOTIFY_AUTH_BASE_URL}/authenticate`, {
            accessToken: accessToken
          })
          .catch(err => {
            return;
          });

        if (!userResponse) return;
  
        setUser(userResponse.data);
        setIsLoggedIn(true);
        localStorage.setItem("token", accessToken);

        Router.replace("/dashboard");
      }
    };

    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout: () => resetData(),
        isLoggedIn
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    profileImage: PropTypes.string
  })
};

AuthProvider.defaultProps = {
  user: null
};