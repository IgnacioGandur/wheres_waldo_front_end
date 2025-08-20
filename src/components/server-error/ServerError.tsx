import styles from "./ServerError.module.css";

type ServerErrorType = {
    message: string;
};

const ServerError = ({ message }: ServerErrorType) => {
    return <div className={styles["server-error"]}>{message}</div>;
};

export default ServerError;
