import styles from "./SelectGame.module.css"
import { useLoaderData, NavLink } from "react-router";

const SelectGame = () => {
    const loaderData = useLoaderData();
    return <main className={styles["select-game"]}>
        {loaderData.fail && <p className={styles.error}>
            {loaderData.error}
        </p>}
        <h1>games</h1>
        <div className={styles["games-preview"]}>
            {loaderData.games.map((game: any) => {
                return <NavLink
                    key={game.name}
                    className="game"
                    to={`/games/${game.name}`}
                >
                    <h2>{game.name}</h2>
                </NavLink>
            })}
        </div>
    </main>
}

export default SelectGame;
