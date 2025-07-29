import { motion, AnimatePresence } from "motion/react";
import classes from "./Credits.module.css";

type CreditProps = {
    show: boolean,
    toggleVisibility: () => void
};

const Credits = (
    {
        show,
        toggleVisibility
    }: CreditProps
) => {
    return <AnimatePresence
        initial={true}
        mode="wait"
    >
        {show && (
            <motion.aside
                className={classes.credits}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: "easeOut" }}
                exit={{ x: 200, opacity: 0 }}
                key="credits-aside"
            >
                <button
                    onClick={toggleVisibility}
                >hide</button>
            </motion.aside>
        )}
    </AnimatePresence>
}

export default Credits;
