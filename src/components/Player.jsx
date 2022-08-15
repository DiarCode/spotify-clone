import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import useSongDetails from "../hooks/useSongDetails";
import useSpotify from "../hooks/useSpotify";
import { currentSongIdState, isSongPlayingState } from "../store/songSlice";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const songDetails = useSongDetails();

  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [isSongPlaying, setIsSongPlaying] = useRecoilState(isSongPlayingState);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentSongId) {
      if (!songDetails) {
        spotifyApi
          .getMyCurrentPlayingTrack()
          .then(data => setCurrentSongId(data.body?.item?.id));

        spotifyApi
          .getMyCurrentPlaybackState()
          .then(data => setIsSongPlaying(data.body?.is_playing));
      }
      setVolume(50);
    }
  }, [currentSongId, spotifyApi, session, setCurrentSongId, songDetails, setIsSongPlaying]);

  return (
    <div className="absolute bg-[#121212] border-t-[0.1px] border-t-white/10 bottom-0 left-0 right-0 w-full p-4 flex justify-between items-center gap-x-1">
      <div className="flex space-x-3 items-center">
        <div className="hidden md:inline">
          <Image
            width="48px"
            height="48px"
            src={songDetails?.album.images?.[0].url}
            alt=""
            className="hidden md:inline w-12 h-12"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-white text-sm font-normal">{songDetails?.name}</p>
          <p className="text-gray-400 text-xs font-normal">
            {songDetails?.artists[0]?.name}
          </p>
        </div>
      </div>

      <div className="text-white">Player</div>

      <div className="text-white">Volume</div>
    </div>
  );
};

export default Player;
