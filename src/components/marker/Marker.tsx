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
                top: `${marker.y}px`,
                left: `${marker.x}px`
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
