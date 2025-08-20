import styles from "./InputErrors.module.css";

type InputErrorObject = {
    location: string;
    msg: string;
    path: string;
    type: string;
    value: string;
};

type InputErrorType = {
    success: boolean;
    message: string;
    errors: InputErrorObject[];
};

type InputErrorsProps = {
    inputErrorObject: InputErrorType;
};

const InputErrors = ({ inputErrorObject }: InputErrorsProps) => {
    return (
        <div className={styles["input-errors"]}>
            <h3 className="title">{inputErrorObject.message}</h3>
            <ul className={styles["errors-container"]}>
                {inputErrorObject.errors.map(
                    (error: InputErrorObject, index: number) => {
                        return (
                            <li
                                key={index}
                                className={styles["error"]}
                            >
                                {error.msg}
                            </li>
                        );
                    },
                )}
            </ul>
        </div>
    );
};

export default InputErrors;
