import styles from "./GameScreen.module.css";
import {
    AnimatePresence,
    motion
} from "motion/react"
import { useState, type ComponentType } from "react";
import QuitGameBox from "./quit-game-box/QuitGameBox";
import MagnifierImport from "react-magnifier";
import ClickMenu from "../home/components/click-menu/ClickMenu";

// NOTE: This is to shut up the Typescript warning about old react in the react-magnifier package.
const Magnifier = MagnifierImport as unknown as ComponentType<any>;

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
    return <AnimatePresence>
        {gameStarted && (
            <motion.section
                className={styles["game-screen"]}
                initial={{ scale: 0, opacity: 0, }}
                animate={{ scale: 1, opacity: 1, }}
                exit={{ scale: 0, opacity: 0, }}
            >
                <ClickMenu
                    characters={characters}
                    gameSlug={gameSlug}
                    handleUserChoiceSubmition={() => console.log("choosed")}
                />
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
                <Magnifier
                    src={gameImageSrc}
                    mgShowOverflow={false}
                    className={styles["main-game-image"]}
                />
            </motion.section>
        )}
    </AnimatePresence>
}

export default GameScreen;
