import styles from "./WinScreen.module.css";
import ReactConfetti from "react-confetti";
import { AnimatePresence, motion } from "motion/react";
import { useFetcher, NavLink } from "react-router";
import { useState } from "react";
import { useRouteLoaderData } from "react-router";
import Leaderboard from "../../../components/leaderboard/Leaderboard";
import SubmittingSpinner from "../../../components/submitting-spinner/SubmittingSpinner";

type Timer = {
    minutes: number,
    seconds: number,
}

type WinScreenProps = {
    timer: Timer
};

const WinScreen = ({ timer }: WinScreenProps) => {
    const loaderData = useRouteLoaderData("current-game");
    const fetcher = useFetcher();
    const [username, setUsername] = useState("");

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const getTimeInSeconds = () => {
        return (timer.minutes * 60) + timer.seconds;
    }

    return <AnimatePresence
        mode="wait"
    >
        <motion.div
            key="win-screen"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={styles["win-screen"]}
        >
            <ReactConfetti />
            <div className={styles["container"]}>
                <h1>
                    You won!
                </h1>
                <h2>You found all characters in {" "}
                    {timer.minutes < 10 && "0"}{timer.minutes}
                    :{timer.seconds < 10 && "0"}{timer.seconds}
                </h2>
                {fetcher.data?.scoreCreated ? (
                    <AnimatePresence
                        mode="wait"
                    >
                        <motion.p
                            className={styles["score-created"]}
                            key="score-created-message"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                        >
                            {fetcher.data?.message}
                        </motion.p>
                    </AnimatePresence>
                ) : (
                    <fetcher.Form
                        className={styles["submit-score"]}
                        method="POST"
                    >
                        <input
                            type="hidden"
                            name="intent"
                            value="submit-score"
                        />
                        <input
                            type="hidden"
                            name="time"
                            value={getTimeInSeconds()}
                        />
                        <label
                            className={styles["label"]}
                            htmlFor="username"
                        >
                            Submit your time!
                        </label>
                        <div className={styles["input-wrapper"]}>
                            <span className="material-symbols-sharp">
                                signature
                            </span>
                            <div className={styles["vertical-separator"]}></div>
                            <input
                                placeholder="Username"
                                className={styles["input"]}
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={handleUsername}
                                required
                            />
                        </div>
                        <button
                            title="Submit score"
                            className={styles["submit-button"]}
                            type="submit"
                        >
                            <span className="material-symbols-sharp">
                                publish
                            </span>
                        </button>
                    </fetcher.Form>
                )}
                <NavLink
                    to="/games"
                    className={styles["close-win-screen"]}
                >
                    <span className="material-symbols-sharp">
                        close
                    </span>
                </NavLink>
                <AnimatePresence
                    mode="wait"
                >
                    {fetcher.state === "submitting" ? (
                        <SubmittingSpinner
                            key="submitting-spinner"
                            message="Submitting your score..."
                        />
                    ) : (
                        <Leaderboard
                            key="leaderboard"
                            scores={[]}
                            gameName={loaderData.game.name}
                        />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    </AnimatePresence>
}

export default WinScreen;
