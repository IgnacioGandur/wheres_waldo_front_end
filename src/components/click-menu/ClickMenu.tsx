import styles from "./ClickMenu.module.css";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useRouteLoaderData, useFetcher } from "react-router";

type Character = {
    name: string,
    imageName: string,
};

type ClickMenuType = {
    foundCharacters: string[],
};

const ClickMenu = ({
    foundCharacters,
}: ClickMenuType) => {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const gameData = useRouteLoaderData("current-game");
    const characters: Character[] = gameData.game.data.characters;
    const gameSlug = gameData.game.slug;
    const fetcher = useFetcher({ key: "game-screen" });

    // Collect info to render the menu in the right position..
    const [menu, setMenu] = useState({
        show: false,
        x: 0,
        y: 0
    });

    // Collect info to check user pick.
    const [clickInfo, setClickInfo] = useState({
        renderedImageWidth: 0,
        renderedImageHeight: 0,
        relativeClickX: 0,
        relativeClickY: 0,
        selectedCharacter: '',
        selectedCharacterImage: ''
    });

    const [clickEvent, setClickEvent] = useState<MouseEvent | null>(null);

    useLayoutEffect(() => {
        if (menu.show && clickEvent && menuRef.current) {
            const menuRect = menuRef.current.getBoundingClientRect();

            setMenu((prevProps) => ({
                ...prevProps,
                x: (clickEvent.clientX + menuRect.width) > window.innerWidth
                    ? clickEvent.clientX - menuRect.width
                    : clickEvent.clientX,
                y: (clickEvent.clientY + menuRect.height) > window.innerHeight
                    ? clickEvent.clientY - menuRect.height
                    : clickEvent.clientY,
            }));
        }
    }, [menu.show, clickEvent]);

    const showMenu = () => {
        setMenu((prevProps) => ({
            ...prevProps,
            show: true,
        }));
    };

    const hideMenu = () => {
        setMenu((prevProps) => ({
            ...prevProps,
            show: false,
        }));
    };

    const handleClickInfo = (
        info: {
            renderedImageWidth: number,
            renderedImageHeight: number,
            relativeClickX: number,
            relativeClickY: number,
        }) => {
        setClickInfo((prevInfo) => ({
            ...prevInfo,
            ...info
        }))
    }

    // Set the selected character that's going to be sent in the request to check the pick.
    const handleCaracterSelection = (character: string, characterImage: string) => {
        setClickInfo((prevInfo) => ({
            ...prevInfo,
            selectedCharacter: character,
            selectedCharacterImage: characterImage
        }));
    }

    // Send the info the game's action function to check if the user pick is correct.
    const checkCharacterPick = () => {
        fetcher.submit(
            clickInfo,
            {
                method: "POST"
            }
        );
    }

    const resetClickInfo = () => {
        setTimeout(() => {
            setClickInfo({
                renderedImageWidth: 0,
                renderedImageHeight: 0,
                relativeClickX: 0,
                relativeClickY: 0,
                selectedCharacter: '',
                selectedCharacterImage: ''
            })
        }, 0);
    }

    // Handle if menu should be shown or not based on click position.
    useLayoutEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Ignore if click is outside image.
            if (!target.classList.contains("magnifier-image")) {
                hideMenu();
            } else {
                showMenu();
                setClickEvent(e);
                const image = e.target as HTMLImageElement;
                const imageRect = image.getBoundingClientRect();
                // Set the click's info relative to the image's top-left corner.
                handleClickInfo({
                    renderedImageWidth: imageRect.width,
                    renderedImageHeight: imageRect.height,
                    relativeClickX: e.clientX - imageRect.x,
                    relativeClickY: e.clientY - imageRect.y,
                });
            }
        };

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        }
    }, []);

    // Validate user pick when character changes.
    useEffect(() => {
        if (clickInfo.selectedCharacter) {
            checkCharacterPick()
        }
    }, [clickInfo.selectedCharacter]);


    return menu.show && (
        <div
            ref={menuRef}
            className={`${styles["click-menu"]} ${menu.show && styles["show"]}`}
            style={{
                left: menu.x,
                top: menu.y,
                position: "fixed"
            }}
        >
            <div className={styles["header"]}>
                <p className={styles["who-that"]}>
                    Who's that?
                </p>
                <button
                    title="Close character selection menu"
                    onClick={() => setMenu((prevProps) => ({ ...prevProps, show: false }))}
                    className={styles["close"]}
                >
                    <span className="material-symbols-sharp">
                        close
                    </span>
                </button>
            </div>
            <div className={styles["horizontal-separator"]}></div>
            <div className={styles["options"]}>
                {characters.map((character: Character) => {
                    return foundCharacters.includes(character.name) ? null : <button
                        key={character.name}
                        className={styles["option"]}
                        onClick={() => {
                            handleCaracterSelection(character.name, character.imageName);
                            resetClickInfo();
                        }}
                    >
                        <img
                            className={styles["image"]}
                            src={`/images/games/${gameSlug}/characters/${character.imageName}`}
                            alt={character.name}
                        />
                        <span
                            className={styles["name"]}
                        >
                            {character.name}
                        </span>
                    </button>
                })}
            </div>
        </div>
    )
}

export default ClickMenu;
