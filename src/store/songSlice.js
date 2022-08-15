import { atom } from "recoil";

export const currentSongIdState = atom({
  key: "currentSongState",
  default: null,
});

export const isSongPlayingState = atom({
  key: "isSongPlayingState",
  default: false,
});
