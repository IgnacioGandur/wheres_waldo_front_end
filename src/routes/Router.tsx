import { createBrowserRouter } from "react-router";
// Pages
import App from "../pages/app/App";
import Home from "../pages/home/Home";
import SelectGame from "../pages/select-game/SelectGame";
import Game from "../pages/game/Game";
import Leaderboards from "../pages/leaderboards/Leaderboards";

// Components
import LoaderComponent from "../components/loader-component/LoaderComponent.tsx";

// Loaders
import selectGameLoader from "../pages/select-game/selectGameLoader";
import gameLoader from "../pages/game/gameLoader.ts";
import leaderboardsLoader from "../pages/leaderboards/leaderboardsLoader.ts";

// Actions
import gameAction from "../pages/game/gameAction.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/games",
                Component: SelectGame,
                loader: selectGameLoader,
                hydrateFallbackElement: <LoaderComponent
                    loadMessage="Loading available games, please wait..."
                />
            },
            {
                id: "current-game",
                path: "/games/:gameSlug",
                Component: Game,
                loader: gameLoader,
                hydrateFallbackElement: <LoaderComponent
                    loadMessage="We are loding your game, please wait..."
                />,
                action: gameAction,
            },
            {
                id: "leaderboards",
                path: "/leaderboards",
                Component: Leaderboards,
                loader: leaderboardsLoader,
                hydrateFallbackElement: <LoaderComponent
                    loadMessage="Loading leaderboards, please wait..."
                />
            }
        ]
    }
])

export default router;
