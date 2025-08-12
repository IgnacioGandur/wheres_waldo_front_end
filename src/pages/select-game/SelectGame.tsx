import styles from "./SelectGame.module.css"
import { useLoaderData, NavLink } from "react-router";

type GameData = {
    fail: boolean;
    error: boolean;
    message: string;
    games: {
        name: string;
        slug: string;
        filename: string;
        link: string;
        difficulty: string;
        fail: boolean;
        error: string;
        data: JSON;
    }[]
};

const SelectGame = () => {
    const loaderData: GameData = useLoaderData();

    return <main className={styles["select-game"]}>
        <div className={styles["background"]}>
            <div className={styles["overlay"]}></div>
        </div>
        <div className={styles["content"]}>
            <header className={styles["header"]}>
                {loaderData.fail && <p className={styles.error}>
                    {loaderData.error}
                </p>}
                <h1>
                    Which game would you like to play?
                </h1>
            </header>
            <div className={styles["games-preview"]}>
                {loaderData.games.map((game: any, index: number) => {
                    return <NavLink
                        viewTransition
                        key={game.id}
                        className={styles["game"]}
                        to={`/games/${game.slug}`}
                        style={{ animationDelay: `${(index + 1) * 3}00ms` }}
                    >
                        <img
                            className={styles["background-image"]}
                            src={`/images/previews/${game.filename}`.split(".")[0] + ".jpg"}
                            alt={game.name}
                        />
                        <div className={styles["overlay"]}>
                            <h2
                                className={styles["title"]}
                            >
                                {game.name}
                            </h2>
                            <p className={styles[`difficulty`]}>
                                {game.difficulty}
                            </p>
                        </div>
                        <div className={styles["game-name"]}>
                            <h2>{game.name}</h2>
                        </div>
                    </NavLink>
                })}
            </div>
        </div>
    </main>
}

export default SelectGame;
