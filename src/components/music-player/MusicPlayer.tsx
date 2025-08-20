import styles from "./MusicPlayer.module.css";
import { useEffect, useRef, useState } from "react";
import { useAudioState, useAudioDispatcher } from "../../contexts/AudioContext";
import audioData from "../../assets/data/audio.json";

const MusicPlayer = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioState = useAudioState();
    const audioDispatcher = useAudioDispatcher();
    const [isPlaying, setIsPlaying] = useState(true);

    // FIX: figure out how to sync this fucking shit with the audio being played and the play/pause icon.

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioDispatcher) {
            audioDispatcher({
                type: "updateVolume",
                updatedVolume: Number(e.target.value),
            });
        }
    };

    const previousSong = () => {
        if (audioDispatcher) {
            audioDispatcher({
                type: "previousSong",
            });
        }
    };

    const nextSong = () => {
        if (audioDispatcher) {
            audioDispatcher({
                type: "nextSong",
            });
        }
    };

    // Toggle Play / pause
    const toggleMusic = () => {
        if (audioRef.current) {
            const audio = audioRef.current as HTMLAudioElement;
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    };

    // Set the volume music from the audioContext.
    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current as HTMLAudioElement;
            if (audioState) {
                audio.volume = audioState?.volume;
            }
        }
    }, [audioState]);

    // Start playing a random song when the game starts.
    useEffect(() => {
        if (!audioDispatcher) return;

        const randomSongIndex = Math.floor(
            Math.random() * audioData.songs.length,
        );
        audioDispatcher({ type: "startPlayingRandomSong", randomSongIndex });
    }, []);

    // Update the audio tag source when the user plays the next/previous song
    useEffect(() => {
        if (!audioRef.current || !audioState) return;

        const audio = audioRef.current;
        audio.src = audioData.songs[audioState.currentSongIndex].route || "";
        audio.load();
        if (audioState.isPlaying) {
            audio
                .play()
                // Silence promise error
                .catch(() => {});
        }
    }, [audioState?.currentSongIndex]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const playNext = () => {
            audioDispatcher?.({ type: "nextSong" });
        };

        audio.addEventListener("ended", playNext);

        return () => {
            audio.removeEventListener("ended", playNext);
        };
    }, [audioState?.currentSongIndex]);

    // Sync the UI with the song playing state.
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        setIsPlaying(!audio.paused);

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
        };
    }, [audioState?.currentSongIndex]);

    return (
        audioState && (
            <div className={styles["music-player"]}>
                <div className={styles["change-songs-buttons"]}>
                    <button
                        onClick={previousSong}
                        className={styles["previous-song"]}
                        title="Previous song"
                    >
                        <span className="material-symbols-sharp">
                            skip_previous
                        </span>
                    </button>
                    <button
                        onClick={nextSong}
                        className={styles["next-song"]}
                        title="Next song"
                    >
                        <span className="material-symbols-sharp">
                            skip_next
                        </span>
                    </button>
                </div>
                <button
                    title="Toggle music play"
                    onClick={toggleMusic}
                    className={styles["play-button"]}
                >
                    <span className="material-symbols-sharp">
                        {isPlaying ? "pause" : "play_arrow"}
                    </span>
                </button>
                <audio
                    ref={audioRef}
                    autoPlay={true}
                    key={audioState.currentSongIndex}
                    src={audioData.songs[audioState.currentSongIndex].route}
                />
                <div className={styles["volume-and-song"]}>
                    <div className={styles["audio-controls"]}>
                        <input
                            title="Music volume"
                            className={styles["slider"]}
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={audioState?.volume}
                            onChange={handleVolumeChange}
                        />
                    </div>
                    <a
                        title="Current song"
                        href={audioData.songs[audioState.currentSongIndex].link}
                        target="_blank"
                        className={styles["current-song-title"]}
                    >
                        {audioData.songs[audioState?.currentSongIndex].name}
                    </a>
                </div>
            </div>
        )
    );
};

export default MusicPlayer;
