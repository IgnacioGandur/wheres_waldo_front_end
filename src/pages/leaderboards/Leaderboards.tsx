import styles from "./Leaderboards.module.css";
import Leaderboard from "../../components/leaderboard/Leaderboard";
import { useLoaderData } from "react-router";

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
    return <main className={styles["leaderboards"]}>
        <div className={styles["container"]}>
            {allLeaderboards.map((leaderboard, index) => {
                return <Leaderboard
                    key={leaderboard.id}
                    scores={leaderboard.scores}
                    gameName={leaderboard.game.name}
                    extraStyles={{ animationDelay: `${(index + 1) * 3}00ms` }}
                />
            })}
        </div>
    </main>
}

export default Leaderboards;
