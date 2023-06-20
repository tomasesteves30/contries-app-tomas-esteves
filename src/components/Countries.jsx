import { useEffect, useState } from "react"
import { CountryCard } from "./CountryCard"

import styles from './Countries.module.css'
import { Search } from './Search'

export function Countries() {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")

    useEffect(() => {
        setLoading(true)
        fetch("https://restcountries.com/v3.1/all")
            .then(response => response.json())
            .then(data => {
                const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
                setCountries(sortedCountries)
                setLoading(false)
            }).catch(error => {
                setError(error)
                setLoading(false)
            })
    }, [])

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search))

    function getSearchValue(e) {
        e.preventDefault()
        setSearch(e.target.value.toLowerCase())
    }

    if (loading) {
        return <div>Loading....</div>
    } else if (error) {
        return <div>error</div>
    } else {
        return (
            <>
                <Search
                    total={filteredCountries.length}
                    search={getSearchValue}
                />
                <div className={styles.container}>
                    {filteredCountries.map(country => (
                        <CountryCard
                            key={country.cca3}
                            code={country.cca3}
                            flag={country.flags.png}
                            name={country.name.common}
                        />
                    ))}
                </div>
            </>
        )
    }
}