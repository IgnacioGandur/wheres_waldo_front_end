import styles from "./Game.module.css"
import {
    useLoaderData,
} from "react-router";
import {
    useState,
    useReducer
} from "react";
import GameScreen from "./game-screen/GameScreen";
import audioReducer from "../../reducers/audioReducer";
import {
    AudioStateContext,
    AudioDispatchContext
} from "../../contexts/AudioContext";
import MusicPlayer from "../../components/music-player/MusicPlayer";
import Credits from "./credits/Credits";

type GameData = {
    name: string,
    slug: string,
    filename: string,
    link: string,
    difficulty: string,
    data: {
        image: {
            width: number,
            height: number
        },
        characters: {
            name: string,
            imageName: string,
            points: {
                name: string,
                x: number,
                y: number,
            }
        }
    }
};

const Game = () => {
    const loaderData = useLoaderData();
    const game = loaderData.game as GameData;
    const [gameStarted, setGameStarted] = useState(false);
    const [showCredits, setShowCredits] = useState(false);

    const toggleCredits = () => {
        setShowCredits((prevState) => !prevState);
    };

    const [audio, dispatch] = useReducer(audioReducer, {
        volume: 0.2,
        currentSongIndex: 0,
        isPlaying: true,
    });

    return <AudioStateContext value={audio}>
        <AudioDispatchContext value={dispatch}>
            <div className={styles["game"]}>
                {gameStarted && (
                    <MusicPlayer />
                )}
                <GameScreen
                    gameImageSrc={`/images/games/${loaderData.game.slug}/${loaderData.game.filename}`}
                    gameSlug={loaderData.game.slug}
                    gameStarted={gameStarted}
                />
                <div
                    style={{
                        backgroundImage: `url("/images/games/${loaderData.game.slug}/${loaderData.game.filename}")`
                    }}
                    className={styles["background-image"]}
                >
                </div>
                <div className={styles["content"]}>
                    <h1
                        className={styles["title"]}
                    >
                        {game.name}
                    </h1>
                    <button
                        className={styles["start-game"]}
                        onClick={() => setGameStarted(true)}
                    >
                        Start the game!
                    </button>
                    <Credits
                        showCredits={showCredits}
                        toggleCredits={toggleCredits}
                        imageUrl={loaderData.game.link}
                    />
                </div>
            </div>
        </AudioDispatchContext>
    </AudioStateContext >
}

export default Game;
