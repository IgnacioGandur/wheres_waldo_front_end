import styles from "./SubmittingSpinner.module.css";
import { BarLoader } from "react-spinners";
import { motion } from "motion/react";

type SubmittingSpinnerProps = {
    message: string,
};

const SubmittingSpinner = ({
    message
}: SubmittingSpinnerProps) => {
    return <motion.div
        className={styles["submitting-spinner"]}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
    >
        <div
            className={styles["wrapper"]}
        >
            <BarLoader
                color="#fff"
            />
            <p className={styles["message"]}>
                {message}
            </p>
        </div>
    </motion.div>
}

export default SubmittingSpinner;
