import { AnimatePresence, motion } from "motion/react";
import styles from "./Timer.module.css";
import { useState, useEffect, useRef } from "react";

type TimerProps = {
    playerWon: boolean,
    getTime: any
};

const Timer = ({
    playerWon,
    getTime
}: TimerProps) => {
    const [timer, setTimer] = useState({
        seconds: 0,
        minutes: 0,
    });
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer.seconds >= 59) {
                    return {
                        minutes: prevTimer.minutes + 1,
                        seconds: 0
                    }
                }
                return {
                    ...prevTimer,
                    seconds: prevTimer.seconds + 1,
                }
            })
        }, 1000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    })

    useEffect(() => {
        if (playerWon) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            getTime(timer);
        }
    }, [playerWon, timer, getTime]);

    return <div className={styles["timer"]}>
        <h2>Timer</h2>
        <AnimatePresence mode="wait">
            <motion.span
                className={styles["time"]}
                key={"timer"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
            >
                {timer.minutes < 10 && "0"}{timer.minutes}:
                {timer.seconds < 10 && "0"}{timer.seconds}
            </motion.span>
        </AnimatePresence>
    </div>
}

export default Timer;
