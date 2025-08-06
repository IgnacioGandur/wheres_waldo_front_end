import styles from "./SelectGame.module.css"
import { useLoaderData, NavLink } from "react-router";

const SelectGame = () => {
    const loaderData = useLoaderData();
    return <main className={styles["select-game"]}>
        <header className={styles["header"]}>
            {loaderData.fail && <p className={styles.error}>
                {loaderData.error}
            </p>}
            <h1>
                Which game would you like to play?
            </h1>
        </header>
        <div className={styles["games-preview"]}>
            {loaderData.games.map((game: any) => {
                return <NavLink
                    viewTransition
                    key={game.name}
                    className={styles["game"]}
                    to={`/games/${game.slug}`}
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
                </NavLink>
            })}
        </div>
    </main>
}

export default SelectGame;
