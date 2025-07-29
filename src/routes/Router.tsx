import { createBrowserRouter } from "react-router";
import App from "../pages/app/App";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: Home,
            }
        ]
    }
])

export default router;
