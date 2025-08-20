import { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ServerError from "../../components/server-error/ServerError";
import { useRouteLoaderData } from "react-router";

const App = () => {
    const loaderData = useRouteLoaderData("main");
    // Add "notranslate" class to all goole icons so they don't break if user translates the page.
    useEffect(() => {
        const icons: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
            ".material-symbols-sharp",
        );
        icons.forEach((icon: HTMLSpanElement) => {
            icon.classList.add("notranslate");
        });
    }, []);

    // De-select/blur selected elements when the user pressed the escape key.
    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                const activeElement = document.activeElement as HTMLElement;
                if (activeElement && activeElement !== document.body) {
                    activeElement.blur();
                } else {
                    return;
                }
            }
        };

        document.addEventListener("keydown", handleEscapeKey);

        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, []);
    return (
        <>
            <Navbar />
            {loaderData?.error && <ServerError message={loaderData.message} />}
            <Outlet />
            <Footer />
        </>
    );
};

export default App;
