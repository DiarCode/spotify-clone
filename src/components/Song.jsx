import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";
import { currentSongIdState, isSongPlayingState } from "../store/songSlice";

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();
  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [isSongPlaying, setIsSongPlaying] = useRecoilState(isSongPlayingState);

  const playSong = () => {
    setCurrentSongId(track.id);
    setIsSongPlaying(true);

    spotifyApi.play({
      uris: [track.uri],
    });
  };

  const renderedTrackDuration = millisToMinutesAndSeconds(track.duration_ms);

  return (
    <div
      onClick={playSong}
      className="flex justify-between lg:grid grid-cols-2 hover:bg-white/10 rounded-lg p-2 px-4 cursor-pointer"
    >
      <div className="flex items-center space-x-5 mr-2">
        <p className="text-gray-400 font-normal text-base mr-5">{order + 1}</p>

        <Image
          width="48"
          height="48"
          className="h-12 w-12"
          src={track.album.images[0].url}
          alt=""
        />

        <div className="flex flex-col">
          <p className="w-64 lg:w-80 truncate text-ellipsis overflow-x-hidden text-white font-normal text-base">
            {track.name}
          </p>
          <p className="w-44 lg:w-80 truncate text-gray-400 font-normal text-sm">
            {track.artists[0].name}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between ">
        <p className="hidden lg:inline text-gray-400 font-normal text-sm w-44 lg:w-80 truncate">
          {track.album.name}
        </p>
        <p className="text-gray-400 font-normal text-sm">
          {renderedTrackDuration}
        </p>
      </div>
    </div>
  );
};

export default Song;
