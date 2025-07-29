import { AnimatePresence, motion } from "motion/react";
import styles from "./ClickMenu.module.css";

type ClickMenuTypes = {
    showClickMenu: boolean,
    x: number,
    y: number,
};

const ClickMenu = ({ showClickMenu, x, y }: ClickMenuTypes) => {
    return <AnimatePresence
        initial={true}
        mode="wait"
    >
        {showClickMenu && (
            <motion.div
                id="click-menu"
                style={{
                    width: 50,
                    height: 50,
                    border: "2px solid yellow",
                    left: x - 25,
                    top: y - 25,
                    position: "absolute"
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, left: x - 25, top: y - 25, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                key="click-menu"
            >
                click menu
            </motion.div>
        )}
    </AnimatePresence>
}

export default ClickMenu;
