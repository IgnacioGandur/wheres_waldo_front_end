import styles from "./Home.module.css";
import Background from "./Background.tsx";

const Home = () => {
    return <>
        <Background />
        <main className={styles.home}>
            <header className={styles["header"]}>
                <h1>Welcome! </h1>
            </header>
        </main>
    </>
}

export default Home;
