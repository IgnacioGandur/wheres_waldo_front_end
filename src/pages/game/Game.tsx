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
                action: `/games/${params.gameName}`,
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
        <h1>Game details</h1>
        <div className={styles["characters-to-find"]}>
            {characters.map((character: any) => {
                return <p
                    key={character.name}
                    className={styles["character"]}
                >
                    {character.name}
                </p>
            })}
        </div>
        <img
            className={styles["image"]}
            data-game-image
            ref={imageRef}
            src={`/images/${params.gameName === "Where's waldo" ? "wheres-waldo.jpg" : null}`}
            alt="Where's Waldo"
        />
        <ClickMenu
            characters={characters}
            handleUserChoiceSubmition={handleUserChoiceSubmition}
        />
    </div>
}

export default Game;
