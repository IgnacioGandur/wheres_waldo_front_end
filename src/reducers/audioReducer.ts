import audioData from "../assets/data/audio.json";
import {
    type AudioStateType,
    type AudioActionType,
} from "../contexts/AudioContext";

export default function audioReducer(
    state: AudioStateType,
    action: AudioActionType,
): AudioStateType {
    switch (action.type) {
        case "updateVolume": {
            return {
                ...state,
                volume: action.updatedVolume,
            };
        }

        case "previousSong": {
            return {
                ...state,
                currentSongIndex:
                    state.currentSongIndex === 0
                        ? audioData.songs.length - 1
                        : state.currentSongIndex - 1,
            };
        }

        case "nextSong": {
            return {
                ...state,
                currentSongIndex:
                    state.currentSongIndex === audioData.songs.length - 1
                        ? 0
                        : state.currentSongIndex + 1,
            };
        }

        case "startPlayingRandomSong": {
            return {
                ...state,
                currentSongIndex: action.randomSongIndex,
            };
        }

        case "setIsPlaying": {
            return {
                ...state,
                isPlaying: action.isPlaying,
            };
        }

        default: {
            throw new Error(`No action matches the provided action type.`);
        }
    }
}
