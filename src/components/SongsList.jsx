import { ClockIcon } from "@heroicons/react/outline";
import React from "react";
import { useRecoilValue } from "recoil";
import { playlistExcerptState } from "../store/playlistSlice";
import Song from "./Song";

const SongsList = () => {
  const playlist = useRecoilValue(playlistExcerptState);

  const renderedSongs = playlist?.tracks?.items?.map((song, index) => (
    <Song key={song.track.id} order={index} track={song.track} />
  ));

  return (
    <div>
      <div className="flex flex-col px-8 space-y-1 pb-28 text-white">
        <div className="sticky top-0 z-20 bg-black flex justify-between lg:grid grid-cols-2 p-2 px-4 border-b-[0.1px] text-xs text-gray-400 uppercase border-white/20 mt-10 mb-5">
          <div className="flex items-center space-x-5 mr-2">
            <p className="text-base">#</p>
            <p>Title</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="hidden lg:inline">Album</p>
            <p><ClockIcon className="w-5 h-5"/></p>
          </div>
        </div>
        {renderedSongs}
      </div>
    </div>
  );
};

export default SongsList;
