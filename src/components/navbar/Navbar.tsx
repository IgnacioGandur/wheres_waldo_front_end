import styles from "./Navbar.module.css";
import { NavLink } from "react-router";

type LinksTypes = {
    text: string,
    icon: string,
    href: string
};

const links: LinksTypes[] = [
    {
        text: "Home",
        icon: "home",
        href: "/",
    },
    {
        text: "Games",
        icon: "buttons_alt",
        href: "/games",
    },
    {
        text: "Leaderboard",
        icon: "trophy",
        href: "/leaderboards",
    },
];

type NavbarTypes = {
    toggleVisibility: () => void
};

const Navbar = ({ toggleVisibility }: NavbarTypes) => {
    return <nav
        className={styles.navbar}
    >
        <div className={styles.logo}>
            <h1>Where's Sonic?</h1>
        </div>
        <div className={styles.links}>
            {links.map((link) => {
                return <NavLink
                    className={styles.link}
                    key={link.text}
                    to={link.href}
                >
                    {link.text}
                    <span className="material-symbols-sharp">
                        {link.icon}
                    </span>
                </NavLink>
            })}
        </div>
        <button
            onClick={toggleVisibility}
        >
            Credits
        </button>
    </nav>
}

export default Navbar;
