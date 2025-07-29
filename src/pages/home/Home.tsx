import classes from "./Home.module.css";
import image from "../../assets/images/image.jpg"
import { useState, useEffect, useRef } from "react";
import ClickMenu from "./components/click-menu/ClickMenu";

const Home = () => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [showClickMenu, setShowClickMenu] = useState(false);
    const [clickCoordinates, setClickCoordinates] = useState({
        x: 0,
        y: 0,
    });

    const handleClickCoordinates = (x: number, y: number) => {
        setClickCoordinates({
            x,
            y,
        });
    };

    const handleImageClick = (e: React.MouseEvent) => {
        // Get the user's cursor position on click.
        handleClickCoordinates(e.clientX, e.clientY);
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
        {showClickMenu && (
            <ClickMenu
                showClickMenu={showClickMenu}
                x={clickCoordinates.x}
                y={clickCoordinates.y}
            />
        )}
    </main>
}

export default Home;
