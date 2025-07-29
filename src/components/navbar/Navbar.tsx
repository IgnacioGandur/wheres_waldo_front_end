import classes from "./Navbar.module.css";

type NavbarTypes = {
    toggleVisibility: () => void
};

const Navbar = ({ toggleVisibility }: NavbarTypes) => {
    return <nav
        className={classes.navbar}
    >
        <div className={classes.logo}>
            <h1>Where's Sonic?</h1>
        </div>
        <button
            onClick={toggleVisibility}
        >
            Credits
        </button>
    </nav>
}

export default Navbar;
