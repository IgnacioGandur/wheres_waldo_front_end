import {
    AnimatePresence,
    motion,
    type TargetAndTransition,
} from "motion/react";
import styles from "./Notification.module.css";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { SyncLoader } from "react-spinners";

const initial: TargetAndTransition = {
    opacity: 0,
    x: "-50%",
    y: "-100%",
};

const animate: TargetAndTransition = {
    opacity: 1,
    x: "-50%",
    y: "0%",
};

const exit: TargetAndTransition = {
    opacity: 0,
    x: "-50%",
    y: "100%",
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

    return (
        <AnimatePresence mode="wait">
            {fetcher.state === "submitting" ? (
                <motion.div
                    key="checking-submittion"
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    className={styles["checking"]}
                >
                    <SyncLoader color="#fff" />
                    <span>Checking your pick</span>
                </motion.div>
            ) : showNotification ? (
                <motion.div
                    key="result"
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    className={`${styles["notification"]} ${!fetcher.data?.success ? styles["fail"] : styles["success"]}`}
                >
                    <p className={styles["message"]}>{message}</p>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default Notification;
