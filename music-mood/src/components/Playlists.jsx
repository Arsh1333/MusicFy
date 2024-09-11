import React, { useState, useEffect } from "react";
import axios from "axios";

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("access_token");
  useEffect(() => {
    // Fetch playlists from Spotify API
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: ` Authorization:'Bearer ${token}'`, // Use your Spotify access token here
            },
          }
        );
        setPlaylists(response.data.items); // Set the playlists data
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="playlist-container">
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
    </div>
  );
};

export default Playlist;
