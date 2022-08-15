import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/outline";
import { signOut } from "next-auth/react";
import React from "react";

const ProfileHeader = ({ user }) => {
  const isUserHasAvatar = Boolean(user?.image);
  const renderedAvatar = isUserHasAvatar ? (
    <img
      className="rounded-full w-10 h-10"
      src={user?.image}
      alt=""
    />
  ) : (
    <UserCircleIcon className="w-8 h-8" />
  );

  return (
    <header className="absolute top-5 right-8 text-white">
      <div
        onClick={() => signOut()}
        className="flex items-center bg-black space-x-3 hover:bg-black/80 cursor-pointer rounded-full p-1 pr-2"
      >
        {renderedAvatar}
        <h2>{user?.name}</h2>
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    </header>
  );
};

export default ProfileHeader;
