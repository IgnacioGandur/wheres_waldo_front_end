import styles from "./Home.module.css";
import Background from "./Background.tsx";
import { NavLink } from "react-router";

type StepType = {
    description: string;
};

const steps: StepType[] = [
    {
        description: "Pick a game",
    },
    {
        description: "Find all the characters in the list",
    },
    {
        description: "Do it fast! So you can be at the top of the leaderboard",
    },
];

const Home = () => {
    return (
        <>
            <Background />
            <main className={styles.home}>
                <div className={styles["wrapper"]}>
                    <header className={styles["header"]}>
                        <h1>Welcome to my "Find the character" game </h1>
                        <h2>
                            Find Waldo, friends and and many other characters in
                            challenging scenes.
                        </h2>
                    </header>
                    <div className={styles["horizontal-separator"]}></div>
                    <div className={styles["tutorial"]}>
                        <h3>The rules are simple</h3>
                        <ol className={styles["steps"]}>
                            {steps.map((step, index) => {
                                return (
                                    <li
                                        key={step.description}
                                        className={styles["step"]}
                                    >
                                        <span className={styles["step-n"]}>
                                            0{index + 1}
                                        </span>
                                        <p className={styles["description"]}>
                                            {step.description}
                                        </p>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                    <div className={styles["horizontal-separator"]}></div>
                    <div className={styles["go"]}>
                        <h3>Are you ready?</h3>
                        <NavLink
                            viewTransition
                            className={styles["button"]}
                            to="/games"
                        >
                            Go!
                        </NavLink>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
