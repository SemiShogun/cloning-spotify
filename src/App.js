import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import { getTokenFromResponse } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import Player from './components/Player';
import { useDataLayerValue, DataLayer } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch ] = useDataLayerValue();

  // Run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";

    const _token = hash.access_token;
    if (_token) {
      spotify.setAccessToken(_token);

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getPlaylist("37i9dQZEVXbMDoHDwVN2tF").then(playlist => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: playlist,
        });
      });

      spotify.getMyTopArtists().then(res => 
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: res
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });

      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

    }
  }, [token, dispatch]);

  return (
    // BEM Convention: Convention used for React
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;