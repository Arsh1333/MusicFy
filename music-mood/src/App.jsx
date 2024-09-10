import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [mood, setMood] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  // Fetch access token from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  // Fetch playlists from Spotify based on mood
  const fetchPlaylists = (mood) => {
    axios
      .get(`https://api.spotify.com/v1/search`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { q: mood, type: "playlist" },
      })
      .then((response) => {
        setPlaylists(response.data.playlists.items);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
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
          <div key={playlist.id}>
            <h3>{playlist.name}</h3>
            <img src={playlist.images[0]?.url} alt={playlist.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
