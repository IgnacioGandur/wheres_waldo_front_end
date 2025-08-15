import styles from "./Leaderboard.module.css";
import { format } from "date-fns";
import { motion } from "motion/react";

const firstPlace = "https://img.icons8.com/color/48/first-place-ribbon.png";
const secondPlace = "https://img.icons8.com/color/48/second-place-ribbon.png";
const thirdPlace = "https://img.icons8.com/color/48/third-place-ribbon.png";

type Score = {
    id: number,
    username: string,
    time: number,
    createdAt: Date
};

type LeaderboardProps = {
    scores: Score[];
    gameName?: string;
    extraStyles?: React.CSSProperties;
};

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);

    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const Leaderboard = ({
    scores,
    gameName,
    extraStyles
}: LeaderboardProps) => {
    return <motion.ul
        className={styles["leaderboard"]}
        style={extraStyles}
    >
        <div className={styles["header"]}>
            <span className={`material-symbols-sharp ${styles['trophy-icon']}`}>
                leaderboard
            </span>
            <div className={styles["vertical-separator"]}></div>
            <h2>
                {gameName}
            </h2>
        </div>
        <div className={styles["horizontal-separator"]}></div>
        {scores.length === 0 ? (
            <div className={styles["empty-score"]}>
                <svg className={styles["empty-icon"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="currentColor" d="M32 2C15.428 2 2 15.428 2 32s13.428 30 30 30s30-13.428 30-30S48.572 2 32 2m0 57.5C16.836 59.5 4.5 47.164 4.5 32S16.836 4.5 32 4.5S59.5 16.836 59.5 32c0 1.357-.103 2.69-.294 3.996c-.838-5.66-5.69-10.766-5.69-10.766s-5.828 6.113-5.828 12.375c0 6.353 6.393 7.996 9.708 4.937C53.251 52.488 43.431 59.5 32 59.5"></path><circle cx={38.498} cy={35} r={5} fill="currentColor"></circle><circle cx={15.498} cy={35} r={5} fill="currentColor"></circle><path fill="currentColor" d="M21.992 21.58c.541-.469-.971-2.061-1.414-1.674a14.23 14.23 0 0 1-11.693 3.133c-.578-.113-1.088 2.021-.385 2.156a16.42 16.42 0 0 0 13.492-3.615m23.121 1.307c-4.168.748-8.455-.4-11.691-3.133c-.443-.389-1.955 1.205-1.412 1.674a16.42 16.42 0 0 0 13.492 3.615c.703-.135.191-2.27-.389-2.156M38.074 47.33c-5.766-1.549-12.049-.428-16.93 3.014c-1.205.869 1.053 4.027 2.252 3.152c3.223-2.268 8.352-3.834 13.66-2.432c1.423.377 2.536-3.308 1.018-3.734"></path></svg>
                <h2>
                    Seems like nobody has submitted a score yet...
                </h2>
            </div>
        ) : (
            scores.map((score: Score, index: number) => {
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
                        {formatTime(score.time)}
                    </span>
                </li>
            })
        )}
    </motion.ul>
}

export default Leaderboard;
