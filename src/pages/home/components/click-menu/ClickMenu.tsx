import { AnimatePresence, motion } from "motion/react";
import styles from "./ClickMenu.module.css";
import { useEffect, useState } from "react";

type Character = {
    name: string,
    imageName: string,
};

type ClickMenuTypes = {
    characters: Character[],
    gameSlug: string,
    handleUserChoiceSubmition: (character: string) => void,
};

const ClickMenu = ({
    characters,
    gameSlug,
    handleUserChoiceSubmition
}: ClickMenuTypes) => {
    const [showClickMenu, setShowClickMenu] = useState(false);
    const [clickCoordinates, setClickCoordinates] = useState({
        x: 0,
        y: 0,
    });

    // Ignore clicks outside image.
    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.classList.contains("magnifier-image")) {
                setShowClickMenu(false);
            } else {
                setClickCoordinates({
                    x: e.clientX,
                    y: e.clientY,
                });
                setShowClickMenu(true);
            }
        };

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        }
    }, [showClickMenu]);

    return <AnimatePresence
        initial={true}
        mode="wait"
    >
        {showClickMenu && (
            <motion.div
                className={styles["click-menu"]}
                id="click-menu"
                style={{
                    left: clickCoordinates.x,
                    top: clickCoordinates.y,
                    position: "absolute"
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    left: clickCoordinates.x,
                    top: clickCoordinates.y,
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
                        return <button
                            key={character.name}
                            className={styles["option"]}
                            onClick={() => {
                                handleUserChoiceSubmition(character.name);
                            }}
                        >
                            <img
                                className={styles["image"]}
                                src={`/images/games/${gameSlug}/characters/${character.imageName}`}
                                alt={character.name}
                            />
                            {/* <div className={styles["vertical-separator"]}></div> */}
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
