import React from "react";

const SidebarLink = ({ item }) => {
  return (
    <button
      className="flex items-center space-x-2 hover:text-white"
    >
      {item.icon("h-5 w-5")}
      <p>{item.name}</p>
    </button>
  );
};

export default SidebarLink;
