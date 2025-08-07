import { AnimatePresence, motion, type TargetAndTransition } from "motion/react";
import styles from "./Notification.module.css";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";

const initial: TargetAndTransition = {
    y: -100,
    opacity: 0,
};

const animate: TargetAndTransition = {
    y: 5,
    opacity: 1,
};

const exit: TargetAndTransition = {
    y: 100,
    opacity: 0,
};

const Notification = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState("");
    const fetcher = useFetcher({ key: "game-screen" });

    useEffect(() => {
        if (fetcher.data) {
            setShowNotification(true);
            setMessage(fetcher.data.message);
            const timeout = setTimeout(() => {
                setShowNotification(false);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [fetcher.data]);

    return <AnimatePresence>
        {showNotification && (
            <motion.div
                initial={initial}
                animate={animate}
                exit={exit}
                className={`${styles["notification"]} ${!fetcher.data?.success ? styles["fail"] : styles["success"]}`}
            >
                <p className={styles["message"]}>
                    {message}
                </p>
            </motion.div>
        )}
    </AnimatePresence>
}

export default Notification;
