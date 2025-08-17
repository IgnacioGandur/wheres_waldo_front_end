import { AnimatePresence, motion, type TargetAndTransition } from "motion/react";
import styles from "./Credits.module.css";

type CreditsType = {
    showCredits: boolean;
    toggleCredits: () => void;
    imageUrl: string;
};

const initialAndExit: TargetAndTransition = { x: 100, opacity: 0 };
const animate: TargetAndTransition = { x: 0, opacity: 1 };

const Credits = ({
    showCredits,
    toggleCredits,
    imageUrl
}: CreditsType) => {
    return <AnimatePresence
        mode="popLayout"
    >
        {showCredits ? (
            <motion.aside
                key="credits"
                className={styles["credits"]}
                initial={initialAndExit}
                animate={animate}
                exit={initialAndExit}
            >
                <h2>Credits</h2>
                <p>
                    The source of the beatiful image that was used for this game was taken from
                    {" "}<a
                        className={styles["link"]}
                        target="_blank"
                        href={imageUrl}
                    >
                        Here!
                    </a> {" "}
                    The link points to either the original author of the image or somebody else making it publicly available, so all credits and thanks go to the original author of the asset.
                </p>

                <button
                    onClick={toggleCredits}
                    className={styles["hide-credits"]}
                >
                    Hide
                </button>
            </motion.aside>
        ) : (
            <motion.button
                key="toggle-button"
                initial={initialAndExit}
                animate={animate}
                exit={initialAndExit}
                onClick={toggleCredits}
                className={styles["show-credits"]}
            >
                <span className="material-symbols-sharp">
                    info_i
                </span>
            </motion.button>
        )}
    </AnimatePresence>
};

export default Credits;
