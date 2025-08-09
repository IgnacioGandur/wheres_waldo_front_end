import styles from "./Marker.module.css";

type Mark = {
    x: number,
    y: number,
    character: string,
}

type MarkerProps = {
    markers: Mark[]
};

const Marker = ({
    markers
}: MarkerProps) => {
    return markers.map((marker) => {
        return <div
            key={marker.x + marker.y}
            style={{
                position: "absolute",
                top: `calc(${marker.y}% - 2rem)`,
                left: `calc(${marker.x}% - 2rem)`,
            }}
            className={styles["marker"]}
        >
            <span
                className={`material-symbols-sharp ${styles["icon"]}`}
            >
                distance
            </span>
        </div>
    })
}

export default Marker;
