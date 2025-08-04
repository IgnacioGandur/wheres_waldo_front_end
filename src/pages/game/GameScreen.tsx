import styles from "./GameScreen.module.css";
import {
    AnimatePresence,
    motion
} from "motion/react"
import { useState } from "react";
import QuitGameBox from "./quit-game-box/QuitGameBox";

type Character = {
    imageName: string,
    name: string,
};

type GameScreen = {
    gameImageSrc: string,
    gameSlug: string,
    gameStarted: boolean,
    characters: Character[],
    toggleGameStatus: () => void
}

const GameScreen = ({
    gameImageSrc,
    gameSlug,
    gameStarted,
    characters,
    toggleGameStatus,
}: GameScreen) => {
    const [showQuitGame, setShowQuitGame] = useState(false);
    const toggleQuitGameBox = () => {
        setShowQuitGame((prevState) => !prevState);
    };

    return <AnimatePresence>
        {gameStarted && (
            <motion.section
                className={styles["game-screen"]}
                initial={{ scale: 0, opacity: 0, }}
                animate={{ scale: 1, opacity: 1, }}
                exit={{ scale: 0, opacity: 0, }}
            >
                <header className={styles["header"]}>
                    <div className={styles["timer"]}>
                        <h2>Timer</h2>
                        <p className={styles["time"]}>
                            12:34
                        </p>
                    </div>
                    <div className={styles["characters"]}>
                        <h2>Can you find them?</h2>
                        <div className={styles["container"]}>
                            {characters.map((character) => {
                                return <div className={styles["character"]}>
                                    <h3
                                        className={styles["character-name"]}
                                    >
                                        {character.name}
                                    </h3>
                                    <img
                                        className={styles["image"]}
                                        src={`/images/games/${gameSlug}/characters/${character.imageName}`}
                                        alt={character.name}
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                    <QuitGameBox />
                </header>
                <img
                    className={styles["main-game-image"]}
                    src={gameImageSrc}
                    alt="Game image."
                />
            </motion.section>
        )}
    </AnimatePresence>
}

export default GameScreen;
