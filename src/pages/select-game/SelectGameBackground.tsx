import styles from "./SelectGameBackground.module.css";

const SelectGameBackground = () => {
    return (
        <div className={styles["background"]}>
            <svg
                viewBox="0 0 1920 1080"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="stars-bg">
                    <g id="Group">
                        <path
                            className={styles["star"]}
                            id="star"
                            d="M703.6 871L716.9 912.1H760.2L725.2 937.5L738.6 978.6L703.6 953.2L668.6 978.6L682 937.5L647 912.1H690.3L703.6 871Z"
                            fill="white"
                        />
                        <path
                            className={styles["star"]}
                            id="star_2"
                            d="M1200.2 426L1201.9 431.3H1207.4L1202.9 434.5L1204.6 439.7L1200.2 436.5L1195.8 439.7L1197.5 434.5L1193 431.3H1198.5L1200.2 426Z"
                            fill="white"
                        />
                        <path
                            className={styles["star"]}
                            id="star_3"
                            d="M837.5 0L848.9 35.3H886L856 57L867.5 92.2L837.5 70.5L807.5 92.2L819 57L789 35.3H826.1L837.5 0Z"
                            fill="white"
                        />
                        <path
                            className={styles["star"]}
                            id="star_4"
                            d="M107.9 979L110.2 986.2H117.8L111.7 990.6L114 997.8L107.9 993.4L101.8 997.8L104.1 990.6L98 986.2H105.6L107.9 979Z"
                            fill="white"
                        />
                        <path
                            className={styles["star"]}
                            id="star_5"
                            d="M1567.5 925L1576.8 953.7H1607L1582.6 971.4L1591.9 1000.1L1567.5 982.4L1543.1 1000.1L1552.4 971.4L1528 953.7H1558.2L1567.5 925Z"
                            fill="white"
                        />
                        <path
                            className={styles["star"]}
                            id="star_6"
                            d="M1647.4 440L1656.9 469.4H1687.8L1662.8 487.5L1672.4 516.9L1647.4 498.7L1622.4 516.9L1632 487.5L1607 469.4H1637.9L1647.4 440Z"
                            fill="white"
                        />
                        <path
                            className={styles["star"]}
                            id="star_7"
                            d="M1798.7 94L1803.4 108.4H1818.4L1806.2 117.3L1810.9 131.6L1798.7 122.7L1786.5 131.6L1791.2 117.3L1779 108.4H1794L1798.7 94Z"
                            fill="white"
                        />
                        <path
                            className={styles["star"]}
                            id="star_8"
                            d="M583.4 190L592.9 219.4H623.8L598.8 237.5L608.4 266.9L583.4 248.7L558.4 266.9L568 237.5L543 219.4H573.9L583.4 190Z"
                            fill="white"
                        />
                        <path
                            className={styles["star"]}
                            id="star_9"
                            d="M128.8 61L141.7 100.8H183.6L149.7 125.4L162.6 165.2L128.8 140.6L95 165.2L107.9 125.4L74 100.8H115.9L128.8 61Z"
                            fill="white"
                        />
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default SelectGameBackground;
