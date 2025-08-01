import styles from "./LoaderComponent.module.css";
import { ScaleLoader } from "react-spinners";


type LoaderComponentType = {
    loadMessage: string
};

const LoaderComponent = ({ loadMessage }: LoaderComponentType) => {
    return <div className={styles["loader"]}>
        <ScaleLoader
            color="var(--color-main)"
        />
        <p className={styles["message"]}>
            {loadMessage}
        </p>
    </div>
}

export default LoaderComponent;
