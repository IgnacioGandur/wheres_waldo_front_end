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
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path fill="#fff" fill-opacity="0.25" fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14M10.087 7.38A5 5 0 0 1 12 7a.5.5 0 0 0 0-1a6 6 0 0 0-6 6a.5.5 0 0 0 1 0a5 5 0 0 1 3.087-4.62" clip-rule="evenodd" /><path stroke="#fff" stroke-linecap="round" d="M20.5 20.5L17 17" stroke-width="1" /><circle cx="11" cy="11" r="8.5" stroke="#fff" stroke-width="1" /></g></svg>
            <div className={styles["vertical-separator"]}></div>
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
