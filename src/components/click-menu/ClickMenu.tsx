import { AnimatePresence, motion } from "motion/react";
import styles from "./ClickMenu.module.css";
import { useEffect, useState, useRef } from "react";
import { useRouteLoaderData, type FetcherWithComponents } from "react-router";

type Character = {
    name: string,
    imageName: string,
};

type ClickMenuType = {
    fetcher: FetcherWithComponents<any>,
    foundCharacters: string[],
    getLatestClickCoordinates: (x: number, y: number) => void
};

const ClickMenu = ({
    fetcher,
    foundCharacters,
    getLatestClickCoordinates
}: ClickMenuType) => {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const gameData = useRouteLoaderData("current-game");
    const characters: Character[] = gameData.game.data.characters;
    const gameSlug = gameData.game.slug;

    // To render the characters list when the user clicks.
    const [showClickMenu, setShowClickMenu] = useState(false);
    const [clickPosition, setClickPosition] = useState({
        x: 0,
        y: 0
    });

    // To collect info when the user clicks.
    const [clickInfo, setClickInfo] = useState({
        renderedImageWidth: 0,
        renderedImageHeight: 0,
        relativeClickX: 0,
        relativeClickY: 0,
        selectedCharacter: '',
    });

    const handleClickInfo = (
        info: {
            renderedImageWidth: number,
            renderedImageHeight: number,
            relativeClickX: number,
            relativeClickY: number,
        }) => {
        setClickInfo((prevInfo) => ({
            ...prevInfo,
            ...info
        }))
    }

    const handleCaracterSelection = (character: string) => {
        setClickInfo((prevInfo) => ({
            ...prevInfo,
            selectedCharacter: character
        }));
    }

    const checkCharacterPick = () => {
        fetcher.submit(
            clickInfo,
            {
                method: "POST"
            }
        );
    }

    // Ignore clicks outside image.
    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.classList.contains("magnifier-image")) {
                setShowClickMenu(false);
            } else {
                setClickPosition({ x: e.clientX, y: e.clientY });
                const image = e.target as HTMLImageElement;
                if (image) {
                    const imageRect = image.getBoundingClientRect();
                    handleClickInfo({
                        renderedImageWidth: imageRect.width,
                        renderedImageHeight: imageRect.height,
                        relativeClickX: e.clientX - imageRect.x,
                        relativeClickY: e.clientY - imageRect.y,
                    });
                    setShowClickMenu(true);
                }
            }
        };

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        }
    }, [showClickMenu]);

    // Validate user pick when character changes.
    useEffect(() => {
        if (clickInfo.selectedCharacter) {
            checkCharacterPick()
        }
    }, [clickInfo.selectedCharacter]);

    // FIX: Corrects the click menu when it goes outside of viewport. Needs fix for the first click.
    useEffect(() => {
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const overflowsX = rect.right > window.innerWidth;
            const overflowsY = rect.bottom > window.innerHeight;
            if (overflowsX) {
                setClickPosition((prevPosition) => ({ ...prevPosition, x: window.innerWidth - rect.width }));
            }
            if (overflowsY) {
                setClickPosition((prevPosition) => ({ ...prevPosition, y: window.innerHeight - rect.height }));
            }
        }
    }, [clickPosition.x, clickPosition.y]);

    return <AnimatePresence
        initial={true}
        mode="wait"
    >
        {showClickMenu && (
            <motion.div
                ref={menuRef}
                className={styles["click-menu"]}
                id="click-menu"
                style={{
                    left: clickPosition.x,
                    top: clickPosition.y,
                    position: "fixed"
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    left: clickPosition.x,
                    top: clickPosition.y,
                }}
                exit={{ scale: 0, opacity: 0 }}
                key="click-menu"
            >
                <div className={styles["header"]}>
                    <p className={styles["who-that"]}>
                        Who's that?
                    </p>
                    <button
                        title="Close character selection menu"
                        onClick={() => setShowClickMenu(false)}
                        className={styles["close"]}
                    >
                        <span className="material-symbols-sharp">
                            close
                        </span>
                    </button>
                </div>
                <div className={styles["horizontal-separator"]}></div>
                <div className={styles["options"]}>
                    {characters.map((character: Character) => {
                        return foundCharacters.includes(character.name) ? null : <button
                            key={character.name}
                            className={styles["option"]}
                            onClick={(e) => {
                                handleCaracterSelection(character.name);
                                getLatestClickCoordinates(e.clientX, e.clientY);
                            }}
                        >
                            <img
                                className={styles["image"]}
                                src={`/images/games/${gameSlug}/characters/${character.imageName}`}
                                alt={character.name}
                            />
                            <span
                                className={styles["name"]}
                            >
                                {character.name}
                            </span>
                        </button>
                    })}
                </div>
            </motion.div>
        )}
    </AnimatePresence>
}

export default ClickMenu;
