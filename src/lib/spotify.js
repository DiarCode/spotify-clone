import SpotifyWebApi from "spotify-web-api-node";

const scope = [
  "user-read-email",
  "playlist-read-collaborative",
  "playlist-read-private",
  "streaming",
  "user-follow-read",
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-library-read",
  "user-read-recently-played",
  "user-top-read",
  "user-read-private",
].join(",");

const params = {
  scope,
};

const queryParamString = new URLSearchParams(params).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;
export { LOGIN_URL };
