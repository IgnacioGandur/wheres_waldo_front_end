import styles from "./Footer.module.css";

const Footer = () => {
    return <footer
        className={styles.footer}
    >
        <div className={styles["author"]}>
            <span className={styles["letter"]}>
                I
            </span>
            <span className={`material-symbols-sharp ${styles["icon"]}`}>
                crown
            </span>
            <span className={styles["letter"]}>
                G
            </span>
        </div>
        <p
            className={styles["hidden-message"]}
        >
            Created by Ignacio Gandur, 2025
        </p>
    </footer>
}

export default Footer;
