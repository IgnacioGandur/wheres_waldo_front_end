import { createContext, useContext } from "react";

export type AudioStateType = {
  volume: number;
  currentSongIndex: number;
  isPlaying: boolean;
};

// Defined mutiple types for the multiple actions the dispatcher is going to handle.
export type AudioActionType =
  | { type: "updateVolume", updatedVolume: number; }
  | { type: "previousSong" }
  | { type: "nextSong" }
  | { type: "startPlayingRandomSong", randomSongIndex: number; }
  | { type: "setIsPlaying", isPlaying: boolean; }

type AudioDispatchType = React.Dispatch<AudioActionType>;

// Export the contexts to use them as context providers.
export const AudioStateContext = createContext<AudioStateType | undefined>(undefined);
export const AudioDispatchContext = createContext<AudioDispatchType | undefined>(undefined);

// Export the contexts as hooks to avoid repeated "useContext" in the 
// files that will use them.

export const useAudioState = () => {
  return useContext(AudioStateContext);
};
export const useAudioDispatcher = () => {
  return useContext(AudioDispatchContext);
};

