import styles from "./Background.module.css";

const Background = () => {
    return <div className={styles["background"]}>
        <svg viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="home-bg" clip-path="url(#clip0_1_2)">
                <path id="Vector" d="M1920 0H0V1080H1920V0Z" fill="black" />
                <g id="Group">
                    <path className={styles["top-right"]} d="M1920 540C1853.4 530.4 1786.7 520.7 1713.4 498.9C1640 477.1 1559.9 443.1 1540.3 379.7C1520.7 316.3 1561.5 223.6 1544.9 155.4C1528.3 87.2 1454.1 43.6 1380 0H1920V540Z" fill="white" />
                </g>
                <g id="Group_2">
                    <path className={styles["bottom-left"]} d="M0 540C67.5 555.6 135 571.2 200.9 595C266.8 618.7 331.2 650.5 381.8 698.2C432.4 745.8 469.3 809.4 493.4 875.6C517.4 941.9 528.7 1011 540 1080H0V540Z" fill="white" />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_1_2">
                    <rect width="1920" height="1080" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </div>
}

export default Background;
