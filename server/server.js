const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const SpotifyWebApi = require("spotify-web-api-node");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "http://localhost:3000/callback",
});

// Login Route
app.get("/", (req, res) => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
  ];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  res.redirect(authorizeURL);
});

//callback route
app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const accessToken = data.body["access_token"];
      res.redirect(`http://localhost:5173?access_token=${accessToken}`);
    })
    .catch((err) => res.send("Error logging in"));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
