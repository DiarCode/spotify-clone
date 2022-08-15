import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { getCurrentSongDetails } from "../api/getCurrentTrackDetails";
import { currentSongIdState } from "../store/songSlice";
import useSpotify from "./useSpotify";

const useSongDetails = () => {
  const spotifyApi = useSpotify();
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [songDetails, setSongDetails] = useState(null);

  console.log(currentSongId);

  useEffect(() => {
    const fetchSongDetails = async () => {
      if (currentSongId) {
        const accessToken = spotifyApi.getAccessToken();

        const fetchedSongDetails = await getCurrentSongDetails({
          currentSongId,
          accessToken,
        });

        setSongDetails(fetchedSongDetails);
      }
    };

    fetchSongDetails();
  }, [currentSongId, spotifyApi]);

  return songDetails;
};

export default useSongDetails;
