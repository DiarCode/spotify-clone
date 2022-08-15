export const getCurrentSongDetails = async ({ currentSongId, accessToken }) => {
  if (!currentSongId && !accessToken) {
    return {};
  }

  return await fetch(`https://api.spotify.com/v1/tracks/${currentSongId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then(res => res.json());
};
