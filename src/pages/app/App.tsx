import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Credits from "../../components/credits/Credits";

const App = () => {
    const [showCredits, setShowCredits] = useState(false);
    const toggleVisibility = () => setShowCredits(!showCredits);
    return <>
        <Navbar toggleVisibility={toggleVisibility} />
        <Outlet />
        <Footer />
        <Credits
            show={showCredits}
            toggleVisibility={toggleVisibility}
        />
    </>
}

export default App;
