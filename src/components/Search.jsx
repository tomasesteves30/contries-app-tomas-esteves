import styles from './Search.module.css'

export function Search({ total, search }) {
    return (
        <div className={styles.container}>
            <div className={styles.total}>{total} countries found</div>
            <form className={styles.form}>
                <input
                    placeholder="search"
                    type="text"
                    onChange={search}
                />
            </form>
        </div>
    )
}