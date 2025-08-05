import { AnimatePresence, motion, type TargetAndTransition } from "motion/react";
import styles from "./Notification.module.css";
import type { FetcherWithComponents } from "react-router";
import { useEffect, useState } from "react";

export type NotificationType = {
    fetcher: FetcherWithComponents<any>,
    time: number,
};

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
}

const Notification = ({ fetcher, time }: NotificationType) => {
    const [showNotification, setShowNotification] = useState(false);
    useEffect(() => {
        if (fetcher.data) {
            setShowNotification(true);
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, time);

            return () => clearTimeout(timer);
        }
    }, [fetcher.data, fetcher.state]);
    return <AnimatePresence>
        {showNotification && (
            <motion.div
                initial={initial}
                animate={animate}
                exit={exit}
                className={styles["notification"]}
            >
                <p
                    className={`${styles["message"]} ${fetcher.data?.success ? styles["found"] : styles["not-found"]}`}
                >
                    {fetcher.state === "submitting"
                        ? "Checking..."
                        : fetcher.state === "idle"
                            && fetcher.data
                            ? (fetcher.data?.message)
                            : null}
                </p>
            </motion.div>
        )}
    </AnimatePresence>
}

export default Notification;
