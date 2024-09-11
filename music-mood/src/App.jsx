import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Playlist from "./components/Playlists.jsx";

const Main = () => {
  const [mood, setMood] = useState("");
  const [playlistsOne, setPlaylistsOne] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [yourPlaylist, setYourPlaylist] = useState(false);

  // Fetch access token from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    if (token) {
      setAccessToken(token);

      // console.log(urlParams.get("access_token"));
    }
  }, []);

  // Fetch playlists from Spotify based on mood
  const fetchPlaylists = async (mood) => {
    const responseOne = await axios
      .get(`https://api.spotify.com/v1/search`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { q: mood, type: "playlist" },
      })
      .then((responseOne) => {
        setPlaylistsOne(responseOne.data.playlists.items);
      })
      .catch((error) => console.log(error));
    // console.log(response.data.items);
  };

  const handleBtn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: ` Authorization:'Bearer ${accessToken}'`, // Use your Spotify access token here
          },
        }
      );
      setPlaylists(response.data.items); // Set the playlists data
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  return (
    <div>
      <button onClick={handleBtn}>Your Playlist</button>
      <h1>Mood-based Music App</h1>
      <div>
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="Enter mood (e.g., happy, sad)"
        />
        <button onClick={() => fetchPlaylists(mood)}>Get Playlists</button>
      </div>
      <div>
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <img
              src={playlist.images[0]?.url}
              alt={playlist.name}
              className="playlist-image"
            />
            <h3>{playlist.name}</h3>

            {/* Button to Open Playlist on Spotify */}
            <button
              onClick={() =>
                window.open(playlist.external_urls.spotify, "_blank")
              }
            >
              Open on Spotify
            </button>
          </div>
        ))}
        {playlistsOne.map((playlist) => (
          <div key={playlist.id}>
            <h3>{playlist.name}</h3>
            <img src={playlist.images[0]?.url} alt={playlist.name} />
            <button
              onClick={() =>
                window.open(playlist.external_urls.spotify, "_blank")
              }
            >
              Open on Spotify
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
