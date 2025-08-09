import styles from "./Navbar.module.css";
import { NavLink } from "react-router";
import { ScaleLoader } from "react-spinners";

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
            <h1>Find The Character</h1>
        </div>
        <div className={styles.links}>
            {links.map((link) => {
                return <NavLink
                    viewTransition
                    className={({ isActive }) => {
                        return isActive
                            ? `${styles["active"]} ${styles["link"]}`
                            : styles["link"]
                    }}
                    key={link.text}
                    to={link.href}
                >
                    {({ isPending }) => (
                        <>
                            <span className={`material-symbols-sharp ${styles["icon"]} ${isPending ? styles["loading"] : ""}`}>
                                {isPending ? "app_badging" : link.icon}
                            </span>
                            <span className={styles["text"]}>
                                {link.text}
                            </span>
                        </>
                    )}
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
