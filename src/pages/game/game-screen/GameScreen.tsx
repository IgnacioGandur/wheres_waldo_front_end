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
import {
    useFetcher,
    useNavigate,
    useRouteLoaderData
} from "react-router";
import QuitGameBox from "../quit-game-box/QuitGameBox";
import MagnifierImport from "react-magnifier";
import ClickMenu from "../../../components/click-menu/ClickMenu";
import Timer from "../../../components/timer/Timer";
import Marker from "../../../components/marker/Marker";
// import MusicPlayer from "../../../components/music-player/MusicPlayer";
import WinScreen from "../win-screen/WinScreen";
import Notification from "../../../components/notification/Notification";
import AudioManager from "../../../managers/AudioManager";
import { useAudioState } from "../../../contexts/AudioContext";

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
}

type Marker = {
    x: number,
    y: number,
    character: string,
};

type Timer = {
    minutes: number,
    seconds: number,
};

const GameScreen = ({
    gameImageSrc,
    gameSlug,
    gameStarted,
}: GameScreenProps) => {
    const fetcher = useFetcher({ key: "game-screen" });
    const loaderData = useRouteLoaderData("current-game");
    const characters = loaderData.game.data.characters as Character[];
    const [foundCharacters, setFoundCharacters] = useState<string[]>([]);
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [playerWon, setPlayerWon] = useState(false);
    const [time, setTime] = useState({
        minutes: 0,
        seconds: 0
    });
    const navigate = useNavigate();
    const audioState = useAudioState();

    const getTime = (timer: Timer) => {
        setTime(timer);
    };

    const quitGame = () => {
        return navigate(0);
    };

    // Check if player won.
    useEffect(() => {
        if (foundCharacters.length === loaderData.game.data.characters.length) {
            setPlayerWon(true);
        }
    }, [foundCharacters]);

    // Handle founded characters.
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

    // Check the actions.success field, if true push the successfull coordinate to the markers array.
    useEffect(() => {
        if (fetcher?.data?.success) {
            setMarkers((prevMarkers) => ([
                ...prevMarkers,
                {
                    x: fetcher.data.x,
                    y: fetcher.data.y,
                    character: fetcher?.data?.foundCharacter,
                }
            ]));
        }
    }, [fetcher.data]);

    // Play sound effects according to guess.
    useEffect(() => {
        if (!audioState) return;

        if (foundCharacters.length === loaderData.game.data.characters.length) {
            AudioManager.playSoundEffect("win", audioState?.volume);
            return;
        }

        if (fetcher.data) {
            if (fetcher.data.success) {
                AudioManager.playSoundEffect("correctGuess", audioState?.volume);
            } else {
                AudioManager.playSoundEffect("wrongGuess", audioState.volume);
            }
        }
    }, [fetcher.data, foundCharacters]);

    return <AnimatePresence>
        {gameStarted && (
            <motion.section
                key="game-screen"
                className={styles["game-screen"]}
                initial={{ scale: 0, opacity: 0, }}
                animate={{ scale: 1, opacity: 1, }}
                exit={{ scale: 0, opacity: 0, }}
            >
                <Notification />
                {/* <MusicPlayer /> */}
                <header className={styles["header"]}>
                    <div className="empty"></div>
                    <Timer
                        playerWon={playerWon}
                        getTime={getTime}
                    />
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
                                        {foundCharacters.includes(character.name) ? <span className="material-symbols-sharp">check</span> : null}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    {!playerWon && (
                        <QuitGameBox
                            quitGameFunction={quitGame}
                        />
                    )}
                </header>
                <ClickMenu
                    foundCharacters={foundCharacters}
                />
                <div
                    style={{ position: "relative" }}
                    className={styles["image-wrapper"]}
                >
                    <Magnifier
                        height="100%"
                        src={gameImageSrc}
                        mgShowOverflow={false}
                        className={styles["main-game-image"]}
                    />
                    <Marker markers={markers} />
                </div>
            </motion.section>
        )}
        {playerWon && (
            <WinScreen timer={time} />
        )}
    </AnimatePresence>
}

export default GameScreen;
