import styles from "./Leaderboards.module.css";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import { useLoaderData } from "react-router";
import { useState, useEffect, } from "react";
import { AnimatePresence, motion } from "motion/react";
import Background from "./Background";

type Score = {
    id: number;
    username: string;
    time: number;
    leaderboardId: number;
    createdAt: Date;
}

type LoaderDataType = {
    success: boolean;
    message: string;
    leaderboards: LeaderboardType[];
}

type LeaderboardType = {
    id: number;
    gameSlug: string;
    game: any,
    scores: Score[],
};

const Leaderboards = () => {
    const loaderData: LoaderDataType = useLoaderData();
    const allLeaderboards = loaderData.leaderboards;
    const [leaderboardIndexes, setLeaderboardIndexes] = useState({
        previous: allLeaderboards.length - 1,
        current: 0,
        next: 1
    });
    const [animation, setAnimation] = useState<"" | "next" | "previous">("");

    const nextLeaderboard = () => {
        setAnimation("next");
        setLeaderboardIndexes((prevIndexes) => ({
            // if current is 0, previous should be last leadearboard.
            previous: prevIndexes.current,
            // if index is equals to leaderboards length - 1, restart to 0 otherwise current index + 1.
            current: (prevIndexes.current + 1) % allLeaderboards.length,
            // if current is last leaderboard, next should be 0 otherwise next should be current + 1.
            next: (prevIndexes.current + 2) % allLeaderboards.length,
        }));
    };

    const previousLeaderboard = () => {
        setAnimation("previous");
        setLeaderboardIndexes((prevIndexes) => ({
            previous: (prevIndexes.current - 2 + allLeaderboards.length) % allLeaderboards.length,
            current: (prevIndexes.current - 1 + allLeaderboards.length) % allLeaderboards.length,
            next: prevIndexes.current,
        }))
    }

    useEffect(() => {
    }, [leaderboardIndexes]);

    return <>
        <Background />
        <main className={styles["leaderboards"]}>
            <header className={styles["header"]}>
                <span className="material-symbols-sharp">
                    trophy
                </span>
                <h1>
                    Leaderboards
                </h1>
            </header>
            <div className={styles["wrapper"]}>
                <AnimatePresence
                    mode="wait"
                >
                    <motion.div
                        key={leaderboardIndexes.previous}
                        custom={animation}
                        className={styles["previous-leaderboard"]}
                    >
                        <Leaderboard
                            scores={allLeaderboards[leaderboardIndexes.previous].scores}
                            gameName={allLeaderboards[leaderboardIndexes.previous].game.name}
                        />
                    </motion.div>
                </AnimatePresence>
                <AnimatePresence
                    mode="wait"
                >
                    <motion.div
                        key={leaderboardIndexes.current}
                        className={styles["current-leaderboard"]}
                    >
                        <button
                            onClick={previousLeaderboard}
                            className={styles["previous-leaderboard-button"]}
                        >
                            <span className="material-symbols-sharp">
                                arrow_left
                            </span>
                        </button>
                        <Leaderboard
                            key="current"
                            scores={allLeaderboards[leaderboardIndexes.current].scores}
                            gameName={allLeaderboards[leaderboardIndexes.current].game.name}
                        />
                        <button
                            onClick={nextLeaderboard}
                            className={styles["next-leaderboard-button"]}
                        >
                            <span className="material-symbols-sharp">
                                arrow_right
                            </span>
                        </button>
                    </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={leaderboardIndexes.next}
                        className={styles["next-leaderboard"]}>
                        <AnimatePresence
                            mode="wait"
                        >
                            <Leaderboard
                                scores={allLeaderboards[leaderboardIndexes.next].scores}
                                gameName={allLeaderboards[leaderboardIndexes.next].game.name}
                            />
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className={styles["leaderboards-mobile"]}>
                {allLeaderboards.map((leaderboard) => {
                    return <Leaderboard
                        key={leaderboard.id}
                        scores={leaderboard.scores}
                        gameName={leaderboard.game.name}
                    />
                })}
            </div>
        </main >
    </>
}

export default Leaderboards;
