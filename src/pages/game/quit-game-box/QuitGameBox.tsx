import {
    motion,
    AnimatePresence,
    type TargetAndTransition
} from "motion/react";
import styles from "./QuitGameBox.module.css";
import { useState } from "react";

type QuitGameType = {
    quitGameFunction: () => void,
}

const QuitGameBox = ({
    quitGameFunction
}: QuitGameType) => {
    const [showBox, setShowBox] = useState(false);
    const toggleBox = () => {
        setShowBox((prevState) => !prevState);
    }
    return <AnimatePresence
        mode="wait"
        initial={true}
    >
        {showBox ? (<motion.div
            className={styles["confirm-quit-box"]}
            initial={initialAndExit}
            animate={animate}
            exit={initialAndExit}
        >
            <p className={styles["message"]}>
                <span>
                    Quit game?
                </span>
                <span
                    className={styles["warning"]}
                >(This will erase all your progress)</span>
            </p>
            <button
                onClick={quitGameFunction}
                className={styles["confirm"]}
            >
                Yes
            </button>
            <button
                className={styles["cancel"]}
                onClick={() => setShowBox(false)}
            >
                Cancel
            </button>
        </motion.div >
        ) : (
            <motion.button
                initial={initialAndExit}
                animate={animate}
                exit={initialAndExit}
                onClick={toggleBox}
                title="Quit game"
                className={styles["quit-game"]}
            >
                <span className="material-symbols-sharp">
                    close
                </span>
            </motion.button>
        )}
    </AnimatePresence>
}

const initialAndExit: TargetAndTransition = {
    scale: 0,
    opacity: 0,
};

const animate: TargetAndTransition = {
    scale: 1,
    opacity: 1,
};

export default QuitGameBox;
