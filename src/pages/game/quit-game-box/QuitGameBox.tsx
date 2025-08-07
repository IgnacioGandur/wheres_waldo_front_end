import {
} from "motion/react";
import styles from "./QuitGameBox.module.css";
import { useState, useRef, useEffect } from "react";

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
    const dialogRef = useRef(null);


    useEffect(() => {
        if (dialogRef.current) {
            const dialog = dialogRef.current as HTMLDialogElement;
            if (showBox) {
                dialog.showModal()
            } else {
                dialog.close();
            }
        }
    }, [showBox]);

    return <>
        {showBox && (
            <dialog
                ref={dialogRef}
                className={styles["confirm-quit-box"]}
            >
                <div className={styles["content"]}>
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
                        onClick={toggleBox}
                    >
                        Cancel
                    </button>
                </div>
            </dialog >
        )}
        <button
            onClick={toggleBox}
            title="Quit game"
            className={styles["quit-game"]}
        >
            <span className="material-symbols-sharp">
                close
            </span>
        </button>
    </>
}

export default QuitGameBox;
