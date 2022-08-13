import React from "react";
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
  UserCircleIcon,
  UserRemoveIcon,
  UsersIcon,
} from "@heroicons/react/outline";

export const SIDEBAR_LINKS_TOP = [
  { name: "Home", icon: className => <HomeIcon className={className} /> },
  { name: "Search", icon: className => <SearchIcon className={className} /> },
  {
    name: "Your Library",
    icon: className => <LibraryIcon className={className} />,
  },
];

export const SIDEBAR_LINKS_BOTTOM = [
  {
    name: "Create Playlist",
    icon: className => <PlusCircleIcon className={className} />,
  },
  {
    name: "Liked Songs",
    icon: className => <HeartIcon className={className} />,
  },
  {
    name: "Your Episodes",
    icon: className => <RssIcon className={className} />,
  },
];

const playlists = [...Array(10)];

const Sidebar = () => {
  const renderedSidebarLinksTop = SIDEBAR_LINKS_TOP.map((item, index) => (
    <button
      key={index}
      className="flex items-center space-x-2 hover:text-white"
    >
      {item.icon("h-5 w-5")}
      <p>{item.name}</p>
    </button>
  ));

  const renderedSidebarLinksBottom = SIDEBAR_LINKS_BOTTOM.map((item, index) => (
    <button
      key={index}
      className="flex items-center space-x-2 hover:text-white"
    >
      {item.icon("h-5 w-5")}
      <p>{item.name}</p>
    </button>
  ));

  const renderedPlaylists = playlists.map((_, index) => (
    <p key={index} className="cursor-pointer hover:text-white">
      Playlist name
    </p>
  ));

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
      <div className="space-y-4">
      <button
      className="flex items-center space-x-2 hover:text-white"
    >
      <UsersIcon className="h-5 w-5" />
      <p>Logout</p>
    </button>

        {renderedSidebarLinksTop}
        <hr className="border-t-[0.1px] border-gray-900" />
        {renderedSidebarLinksBottom}
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* {Playlists} */}

        {renderedPlaylists}
      </div>
    </div>
  );
};

export default Sidebar;
