import { Link } from "react-router-dom"
import styles from './CountryCard.module.css'
export function CountryCard({ code, flag, name }) {
    return (
        <Link to={`country/${code}`}>
            <article className={styles.card}>
                <div
                    className={styles.flag}
                    style={{
                        backgroundImage: `url(${flag})`
                    }}
                >
                </div>

                <div className={styles.name}>
                    {name}
                </div>
            </article>
        </Link>
    )
}