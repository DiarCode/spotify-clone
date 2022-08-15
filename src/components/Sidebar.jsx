import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { UsersIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { playlistIdState } from "../store/playlistSlice";
import { SIDEBAR_LINKS_BOTTOM, SIDEBAR_LINKS_TOP } from "../lib/sidebarLinks";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => setPlaylists(data.body.items));
    }
  }, [spotifyApi, session]);

  const renderedSidebarLinksTop = SIDEBAR_LINKS_TOP.map(item => (
    <SidebarLink key={item.name} item={item} />
  ));

  const renderedSidebarLinksBottom = SIDEBAR_LINKS_BOTTOM.map(item => (
    <SidebarLink key={item.name} item={item} />
  ));

  const renderedPlaylists = playlists.map(item => (
    <p
      key={item.id}
      onClick={() => setPlaylistId(item.id)}
      className="cursor-pointer hover:text-white"
    >
      {item.name}
    </p>
  ));

  return (
    <div className="hidden md:inline-flex min-w-fit scrollbar-hide text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen">
      <div className="space-y-4">
        {renderedSidebarLinksTop}
        <hr className="border-t-[0.1px] border-gray-900" />
        {renderedSidebarLinksBottom}
        <hr className="border-t-[0.1px] border-gray-900" />
        {renderedPlaylists}
      </div>
    </div>
  );
};

export default Sidebar;
