import { AnimatePresence, motion } from "motion/react";
import styles from "./Timer.module.css";
import { useState, useEffect } from "react";

const Timer = () => {
    const [timer, setTimer] = useState({
        seconds: 0,
        minutes: 0,
    });
    useEffect(() => {
        if (timer.seconds > 10) {
            setTimer((prevTime) => ({ ...prevTime, minutes: prevTime.minutes + 1 }));
        }
        const interval = setInterval(() => {
            setTimer((prevTime) => ({ ...prevTime, seconds: prevTime.seconds + 1 }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timer.seconds > 59) {
            setTimer((prevTime) => ({ ...prevTime, minutes: prevTime.minutes + 1 }));
            setTimer((prevTimer) => ({ ...prevTimer, seconds: 0 }));
        }
    }, [timer.seconds]);
    return <div className={styles["timer"]}>
        <h2>Timer</h2>
        <AnimatePresence mode="wait">
            <motion.span
                className={styles["time"]}
                key={timer.seconds}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
            >
                {timer.minutes < 10 && "0"}{timer.minutes}:{timer.seconds < 10 && "0"}{timer.seconds}
            </motion.span>
        </AnimatePresence>
    </div>
}

export default Timer;
