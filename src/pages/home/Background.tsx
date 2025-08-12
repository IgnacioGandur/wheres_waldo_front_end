import styles from "./Background.module.css";

const Background = () => {
    return <svg className={styles["background"]} viewBox="0 0 1849 1066" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="bg">
            <path className={styles["top-left"]} d="M248 254C341.336 254 417 178.336 417 85C417 -8.33612 341.336 -84 248 -84C154.664 -84 79 -8.33612 79 85C79 178.336 154.664 254 248 254Z" fill="white" />
            <path className={styles["bottom-right"]} d="M1367 968C1402.35 968 1431 939.346 1431 904C1431 868.654 1402.35 840 1367 840C1331.65 840 1303 868.654 1303 904C1303 939.346 1331.65 968 1367 968Z" fill="white" />
            <path className={styles["center"]} d="M878 651C952.558 651 1013 590.558 1013 516C1013 441.442 952.558 381 878 381C803.442 381 743 441.442 743 516C743 590.558 803.442 651 878 651Z" fill="white" />
            <path className={styles["bottom-left"]} d="M121 1066C187.826 1066 242 1011.83 242 945C242 878.174 187.826 824 121 824C54.1735 824 0 878.174 0 945C0 1011.83 54.1735 1066 121 1066Z" fill="white" />
            <path className={styles["top-right"]} d="M1793 557C1869.22 557 1931 495.215 1931 419C1931 342.785 1869.22 281 1793 281C1716.78 281 1655 342.785 1655 419C1655 495.215 1716.78 557 1793 557Z" fill="white" />
        </g>
    </svg>
}

export default Background;
