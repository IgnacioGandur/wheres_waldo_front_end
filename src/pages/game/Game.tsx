import styles from "./Game.module.css"
import {
    useLoaderData,
} from "react-router";
import {
    useState,
} from "react";
import GameScreen from "./game-screen/GameScreen";

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
                {game.name}
            </h1>
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
