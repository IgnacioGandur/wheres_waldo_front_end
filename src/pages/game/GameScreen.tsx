import styles from "./GameScreen.module.css";
import {
    AnimatePresence,
    motion
} from "motion/react"
import {
    useState,
    useEffect,
    type ComponentType
} from "react";
import Notification from "../../components/notification/Notification";
import { useFetcher } from "react-router";
import QuitGameBox from "./quit-game-box/QuitGameBox";
import MagnifierImport from "react-magnifier";
import ClickMenu from "../../components/click-menu/ClickMenu";
import Timer from "../../components/timer/Timer";

type Marker = {
    x: number,
    y: number
};

// NOTE: This is to shut up the Typescript warning about old react in the react-magnifier package.
const Magnifier = MagnifierImport as unknown as ComponentType<any>;

type Character = {
    imageName: string,
    name: string,
};

type GameScreenProps = {
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
}: GameScreenProps) => {
    const fetcher = useFetcher();
    const [foundCharacters, setFoundCharacters] = useState<string[]>([]);
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [latestClick, setLatestClick] = useState({ x: 0, y: 0 });
    useEffect(() => {
        if (fetcher.data?.success) {
            const isAlreadyFound = foundCharacters.includes(fetcher.data.foundCharacter);
            if (isAlreadyFound) {
                return;
            } else {
                setFoundCharacters((prevCharacters) => ([
                    ...prevCharacters,
                    fetcher.data.foundCharacter,
                ]))
            }
        }
    }, [fetcher.data]);

    const getLatestClickCoordinates = (x: number, y: number) => {
        setLatestClick({
            x,
            y
        });
    };

    // Check the actions.success field, if true push the successfull coordinate to the markers array.
    useEffect(() => {
        if (fetcher?.data?.success) {
            setMarkers((prevMarkers) => ([
                ...prevMarkers,
                latestClick,
            ]))
        }
    }, [fetcher.state]);

    return <AnimatePresence>
        {gameStarted && (
            <motion.section
                className={styles["game-screen"]}
                initial={{ scale: 0, opacity: 0, }}
                animate={{ scale: 1, opacity: 1, }}
                exit={{ scale: 0, opacity: 0, }}
            >
                <header className={styles["header"]}>
                    <div className="empty"></div>
                    <Timer />
                    <div className={styles["characters"]}>
                        <h2>Can you find them?</h2>
                        <div className={styles["container"]}>
                            {characters.map((character) => {
                                return <div
                                    key={character.name}
                                    className={styles["character"]}
                                >
                                    <h3
                                        className={styles["character-name"]}
                                    >
                                        {character.name}
                                    </h3>
                                    <div className={styles["image-wrapper"]}>
                                        <img
                                            className={`${styles["image"]} ${foundCharacters.includes(character.name) && styles["found"]}`}
                                            src={`/images/games/${gameSlug}/characters/${character.imageName}`}
                                            alt={character.name}
                                        />
                                        {foundCharacters.includes(character.name) ? <span className="material-symbols-sharp">check_circle</span> : null}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <QuitGameBox
                        quitGameFunction={toggleGameStatus}
                    />
                </header>
                <Notification fetcher={fetcher} time={3000} />
                <ClickMenu
                    fetcher={fetcher}
                    foundCharacters={foundCharacters}
                    getLatestClickCoordinates={getLatestClickCoordinates}
                />
                <Magnifier
                    height="100%"
                    src={gameImageSrc}
                    mgShowOverflow={false}
                    className={styles["main-game-image"]}
                />
                {
                    markers.map((marker) => {
                        return <span
                            style={{
                                position: "fixed",
                                top: `${marker.y}px`,
                                left: `${marker.x}px`,
                                zIndex: 999
                            }}
                            className="material-symbols-sharp"
                        >
                            distance
                        </span>
                    })
                }
            </motion.section>
        )}
    </AnimatePresence>
}

export default GameScreen;
