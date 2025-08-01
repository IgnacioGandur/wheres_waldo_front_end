import { AnimatePresence, motion } from "motion/react";
import styles from "./ClickMenu.module.css";
import { useEffect, useState } from "react";

type Point = {
    x: number,
    y: number,
    name: string,
};

type Character = {
    name: string,
    points: Point[]
};

type ClickMenuTypes = {
    characters: Character[],
    handleUserChoiceSubmition: (character: string) => void,
};

const ClickMenu = ({
    characters,
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
            if (!target.getAttribute("data-game-image")) {
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
                <button
                    onClick={() => setShowClickMenu(false)}
                    className={styles["close"]}
                >
                    Close
                </button>
                <p className={styles["who-that"]}>
                    Who's that?
                </p>
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
                            {character.name}
                        </button>
                    })}
                </div>
            </motion.div>
        )}
    </AnimatePresence>
}

export default ClickMenu;
