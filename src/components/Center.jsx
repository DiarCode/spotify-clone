import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { shuffle } from "lodash";
import { playlistExcerptState, playlistIdState } from "../store/playlistSlice";
import { useRecoilValue, useRecoilState } from "recoil";
import { BG_COLORS } from "../lib/bgColors";
import ProfileHeader from "./profileHeader";
import useSpotify from "../hooks/useSpotify";
import SongsList from "./songsList";
import Image from "next/image";

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistExcerptState);

  useEffect(() => {
    const shuffledColor = shuffle(BG_COLORS).pop();
    setColor(shuffledColor);
  }, [playlistId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getPlaylist(playlistId).then(data => setPlaylist(data.body));
    }
  }, [playlistId, setPlaylist, spotifyApi, session]);

  return (
    <div className="relative flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <ProfileHeader user={session?.user} />

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <Image
          width="176px"
          height="176px"
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p className="text-xs md:text-sm">PLAYLIST</p>
          <h1 className="text-4xl md:text-5xl font-bold">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <SongsList />
      </div>
    </div>
  );
};

export default Center;
