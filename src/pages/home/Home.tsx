import classes from "./Home.module.css";
import image from "../../assets/images/image.jpg"
import { useState, useEffect, useRef } from "react";
// import ClickMenu from "./components/click-menu/ClickMenu";
import data from "../../assets/data/image-coordinates.json";

const Home = () => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [showClickMenu, setShowClickMenu] = useState(false);
    const [clickCoordinates, setClickCoordinates] = useState({
        x: 0,
        y: 0,
    });
    const [target, setTarget] = useState({
        xStart: Math.ceil(data.points[0].x / data.image.width * 100),
        xEnd: Math.ceil(data.points[1].x / data.image.width * 100),
        yStart: Math.ceil(data.points[1].y / data.image.height * 100),
        yEnd: Math.ceil(data.points[2].y / data.image.height * 100),
    });

    const handleClickCoordinates = (x: number, y: number) => {
        setClickCoordinates({
            x,
            y,
        });
    };

    const checkIfClickWasInTarget = (x: number, y: number) => {
        // Check if click is inside square of coordinates.
        // Check if click is between point x-start and x-end.
        // check if click is between point x-end and y-end.
        // check if click is between point y-end and y-start.
        // check if click is between point y-start and x-start.
        const success = x >= target.xStart
            && x <= target.xEnd
            && y >= target.yStart
            && y <= target.yEnd;
        console.log(success ? "Success" : "fail");
    }

    const handleImageClick = (e: React.MouseEvent) => {
        // Get the user's cursor position on click.
        handleClickCoordinates(e.clientX, e.clientY);
        const rect = imageRef.current?.getBoundingClientRect();
        if (rect) {
            // Get the click's location inside the image from top-left corner.
            const relativeXImageClick = Math.floor(e.clientX - rect.x);
            const relativeYImageClick = Math.floor(e.clientY - rect.y);

            // Get image's size
            const imageWidth = rect?.width;
            const imageHeight = rect?.height;

            // Transform the click's position into percentages so it works in responsive too.
            const percentageX = Math.ceil((relativeXImageClick / imageWidth) * 100);
            const percentageY = Math.ceil((relativeYImageClick / imageHeight) * 100);

            checkIfClickWasInTarget(percentageX, percentageY);
        }

        setShowClickMenu(true);
    }

    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            // Check if user click was in the image.
            const target = e.target as HTMLElement;
            if (target !== imageRef.current) {
                setShowClickMenu(false);
            }
        }

        document.addEventListener("click", handleDocumentClick);

        return () => document.removeEventListener("click", handleDocumentClick);
    }, []);

    // If use clicked inside image, take position of the cursor and show the menu box under the cursor.
    useEffect(() => {
    }, [clickCoordinates.x, clickCoordinates.y]);

    return <main className={classes.home}>
        <img
            ref={imageRef}
            onClick={handleImageClick}
            className={classes.image}
            src={image}
            alt="Image"
        />
        {/* {showClickMenu && ( */}
        {/*     <ClickMenu */}
        {/*         showClickMenu={showClickMenu} */}
        {/*         x={clickCoordinates.x} */}
        {/*         y={clickCoordinates.y} */}
        {/*     /> */}
        {/* )} */}
    </main>
}

export default Home;
