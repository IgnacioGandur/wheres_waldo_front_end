import styles from "./Leaderboard.module.css";
import { format } from "date-fns";
import { motion } from "motion/react";
import { useRouteLoaderData } from "react-router";

type Score = {
    id: number,
    username: string,
    time: number,
    createdAt: Date
};

type LeaderboardProps = {
    scores: Score[],
    showGameName: boolean
};

const firstPlace = "https://img.icons8.com/color/48/first-place-ribbon.png";
const secondPlace = "https://img.icons8.com/color/48/second-place-ribbon.png";
const thirdPlace = "https://img.icons8.com/color/48/third-place-ribbon.png";

const Leaderboard = ({
    scores,
    showGameName
}: LeaderboardProps) => {
    const loaderData = useRouteLoaderData("current-game");
    return <motion.ul
        className={styles["leaderboard"]}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
    >
        <div className={styles["header"]}>
            <span className={`material-symbols-sharp ${styles['trophy-icon']}`}>
                leaderboard
            </span>
            {showGameName ? (
                <h2>Leaderboard - {loaderData.game.name}</h2>
            ) : (
                <h2>Leaderboard</h2>
            )}
        </div>
        {scores.map((score, index) => {
            return <li
                key={score.id}
                className={`${styles["score"]}  ${styles["ppf"]} ${index === 0 ? styles["first"] : index === 1 ? styles["second"] : index === 2 ? styles["third"] : ''}`}
            >
                {
                    index < 3 && (
                        <img
                            className={styles["icon"]}
                            src={index === 0 ? firstPlace : index === 1 ? secondPlace : thirdPlace}
                            alt="Position ribbon"
                        />
                    )
                }
                <span
                    className={`material-symbols-sharp ${styles["ppf"]}`}
                >
                    person
                </span>
                <span className={styles["date"]}>
                    {format(score.createdAt, "MMMM do, yyyy 'at' hh:mmaa")}
                </span>
                <p className={styles["username"]}>
                    {score.username}
                </p>
                <h3 className={styles["time-title"]}>
                    Time
                </h3>
                <span className={styles["time"]}>
                    {score.time}
                </span>
            </li>
        })}
    </motion.ul>
}

export default Leaderboard;
