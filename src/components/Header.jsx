import { CgDarkMode } from 'react-icons/cg'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'


export function Header() {

    const [theme, setTheme] = useState("light")

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme", localStorage.getItem("theme")
        )
    }, [])

    function changeTheme() {
        if (theme === "light") {
            saveTheme("dark")

        } else {
            saveTheme("light")
        }
    }

    function saveTheme(theme) {
        setTheme(theme)
        localStorage.setItem("theme", theme)
        document.documentElement.setAttribute("data-theme", theme)
    }

    return (
        <header className={styles.header}>
            <h1>
                <Link to="/">Countries App</Link>
            </h1>
            <button
                className={styles.themeButton}
                onClick={changeTheme}
            >
                <CgDarkMode />
            </button>
        </header>
    )
}