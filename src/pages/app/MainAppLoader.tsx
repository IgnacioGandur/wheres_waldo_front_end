import styles from "./MainAppLoader.module.css";
import { PuffLoader } from "react-spinners";

const MainAppLoader = () => {
    return (
        <div className={styles["main-app-loader"]}>
            <PuffLoader color="#fff" />
            <p className={styles["message"]}>Loading, please wait...</p>
        </div>
    );
};

export default MainAppLoader;
