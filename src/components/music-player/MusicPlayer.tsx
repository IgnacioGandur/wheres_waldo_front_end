import styles from "./MusicPlayer.module.css";
import { useEffect, useRef, useState } from "react";

const MusicPlayer = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.2);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentVolume = Number(e.currentTarget.value);
        setVolume(currentVolume);
    }

    const toggleMusic = () => {
        if (audioRef.current) {
            const audio = audioRef.current as HTMLAudioElement;
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
            setIsPlaying(audioRef.current.paused);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current as HTMLAudioElement;
            audio.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }, [])

    return <div className={styles["music-player"]}>
        <span className={styles["toggle-play-state"]}>
            {isPlaying ? "Paused" : "Playing"}
        </span>
        <button
            onClick={toggleMusic}
            className={styles["play-button"]}
        >
            <span className="material-symbols-sharp">
                {isPlaying ? "play_arrow" : "pause"}
            </span>
        </button>
        <audio
            ref={audioRef}
            loop={true}
        >
            <source src="/audio/background-music.webm" type="audio/webm" />
        </audio>
        <div className={styles["audio-controls"]}>
            <input
                className={styles["slider"]}
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
            />
        </div>
    </div>
}

export default MusicPlayer;
