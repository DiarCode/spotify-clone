import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
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
