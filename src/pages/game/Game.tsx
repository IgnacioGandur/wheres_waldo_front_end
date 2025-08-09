import styles from "./Game.module.css"
import {
    useLoaderData,
} from "react-router";
import {
    useState,
} from "react";
import GameScreen from "./game-screen/GameScreen";

const Game = () => {
    const loaderData = useLoaderData();
    const [gameStarted, setGameStarted] = useState(false);

    return <div className={styles["game"]}>
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
                Find all the characters in the picture!
            </h1>
            <p
                className={styles["rules"]}
            >The rules are simple! Find all the characters in the list as fast as you can.</p>
            <button
                className={styles["start-game"]}
                onClick={() => setGameStarted(true)}
            >
                Start the game!
            </button>
        </div>
    </div>
}

export default Game;
