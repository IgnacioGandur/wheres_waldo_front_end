import styles from "./Game.module.css"
import {
    useParams,
    useLoaderData,
    useFetcher
} from "react-router";
import ClickMenu from "../home/components/click-menu/ClickMenu";
import {
    useRef,
    useState,
    useEffect
} from "react";

import GameScreen from "./GameScreen";

const Game = () => {
    const fetcher = useFetcher();
    const params = useParams();
    const loaderData = useLoaderData();
    const imageRef = useRef(null);
    const characters = loaderData.game.data.characters;
    const [userChoice, setUserChoice] = useState({
        imageWidth: 0,
        imageHeight: 0,
        x: 0,
        y: 0,
        character: ""
    });
    const [gameStarted, setGameStarted] = useState(false);

    const toggleGameStatus = () => {
        setGameStarted(prevStatus => !prevStatus);
    }

    const handleUserChoiceSubmition = (character: string) => {
        fetcher.submit(
            {
                imageWidth: userChoice.imageWidth,
                imageHeight: userChoice.imageHeight,
                x: userChoice.x,
                y: userChoice.y,
                character: character,
            },
            {
                method: "POST",
                action: `/games/${params.gameSlug}`,
            }
        );
    };

    useEffect(() => {
        // get image
        if (imageRef.current) {
            const image: HTMLImageElement = imageRef.current;
            const handleClick = (e: MouseEvent) => {
                if (e.target !== image) {
                    return;
                } else {
                    const imageRect = image.getBoundingClientRect();
                    const renderedImageWidth = image.offsetWidth;
                    const renderedImageHeight = image.offsetHeight;
                    setUserChoice({
                        imageWidth: renderedImageWidth,
                        imageHeight: renderedImageHeight,
                        x: e.clientX - imageRect.x,
                        y: e.clientY - imageRect.y,
                        character: "",
                    })
                }
            }

            document.addEventListener("click", handleClick);

            return () => {
                document.removeEventListener("click", handleClick);
            }
        }
    }, []);

    return <div className={styles["game"]}>
        <GameScreen
            gameImageSrc={`/images/games/${loaderData.game.slug}/${loaderData.game.filename}`}
            gameSlug={loaderData.game.slug}
            gameStarted={gameStarted}
            characters={characters}
            toggleGameStatus={toggleGameStatus}
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
        <ClickMenu
            characters={characters}
            handleUserChoiceSubmition={handleUserChoiceSubmition}
        />
    </div>
}

export default Game;
