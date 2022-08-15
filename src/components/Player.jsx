import { ReplyIcon } from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import useSongDetails from "../hooks/useSongDetails";
import useSpotify from "../hooks/useSpotify";
import { currentSongIdState, isSongPlayingState } from "../store/songSlice";
import { debounce } from "lodash";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const songDetails = useSongDetails();

  const [currentSongId, setCurrentSongId] = useRecoilState(currentSongIdState);
  const [isSongPlaying, setIsSongPlaying] = useRecoilState(isSongPlayingState);
  const [volume, setVolume] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceAdjustVolume = useCallback(
    debounce(volume => {
      spotifyApi.setVolume(volume).catch(err => {});
    }, 500),
    []
  );

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then(data => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsSongPlaying(false);
      } else {
        spotifyApi.play();
        setIsSongPlaying(true);
      }
    });
  };

  const handleVolumeButtons = () => {
    volume === 0 ? setVolume(50) : setVolume(0);
  };

  const renderedPlayingButton = isSongPlaying ? (
    <PauseIcon className="w-10 h-10" onClick={handlePlayPause} />
  ) : (
    <PlayIcon className="w-10 h-10" onClick={handlePlayPause} />
  );

  const renderedVolumeButton =
    volume === 0 ? (
      <VolumeOffIcon className="w-5 h-5" onClick={handleVolumeButtons} />
    ) : (
      <VolumeUpIcon className="w-5 h-5" onClick={handleVolumeButtons} />
    );

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
  }, [
    currentSongId,
    spotifyApi,
    session,
    setCurrentSongId,
    songDetails,
    setIsSongPlaying,
  ]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [debounceAdjustVolume, volume]);

  return (
    <div className="absolute bg-[#121212] border-t-[0.1px] border-t-white/10 bottom-0 left-0 right-0 w-full md:py-4 p-2 md:px-4 flex justify-between items-center">
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

        <div className="flex flex-col gap-1 w-28 md:w-48">
          <p className="truncate text-ellipsis overflow-x-hidden text-white text-sm font-normal">
            {songDetails?.name}
          </p>
          <p className="truncate text-ellipsis overflow-x-hidden text-gray-400 text-xs font-normal">
            {songDetails?.artists[0]?.name}
          </p>
        </div>
      </div>

      <div className="text-white">
        <div className="flex items-center space-x-3 md:space-x-4">
          <SwitchHorizontalIcon className="w-5 h-5" />
          <RewindIcon className="w-5 h-5" />
          {renderedPlayingButton}
          <FastForwardIcon className="w-5 h-5" />
          <ReplyIcon className="w-4 h-4" />
        </div>
      </div>

      <div className="text-white flex items-center space-x-3 md:space-x-4">
        {renderedVolumeButton}
        <input
          className="w-14 md:w-24"
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={e => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Player;
