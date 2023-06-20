import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import styles from "./CountryInfo.module.css"

export function CountryInfo() {
    const { code } = useParams()
    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch(`https://restcountries.com/v3.1/alpha/${code}`)
            .then(response => response.json())
            .then(data => {
                setCountry(data)
                setLoading(false)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            })


    }, [code])

    if (loading) {
        return <div>Loading....</div>
    } else if (error) {
        return <div>error</div>
    } else {
        return (
            <>
                {country?.map((country, index) => (
                    <div className={styles.container} key={index}>
                        <div>
                            <img className={styles.flag} src={country.flags.png} alt={country.name.common} />
                        </div>
                        <div>
                            <section className={styles.header}>
                                <div className={styles.name}>
                                    {country.name.common}
                                </div>
                                <div className={styles.capital}>
                                    {country.capital}
                                </div>
                            </section>
                            <section>
                                <div className={styles.info}>
                                    <div>Region</div>
                                    <div>{country.region}
                                    </div>
                                </div>


                                <div className={styles.info}>
                                    <div>Subregion</div>
                                    <div>{country.subregion}
                                    </div>
                                </div>


                                <div className={styles.info}>
                                    <div>Population</div>
                                    <div>{new Intl.NumberFormat().format(country.population)}
                                    </div>
                                </div>


                                <div className={styles.info}>
                                    <div>Languages</div>
                                    <div>{country.languages && Object.values(country.languages).map(language => language).join(', ')}
                                    </div>
                                </div>


                                <div className={styles.info}>
                                    <div>Currencies</div>
                                    <div>{country.currencies && Object.values(country.currencies).map(currency => currency.name).join(', ')}
                                    </div>
                                </div>


                                {country.maps.googleMaps &&
                                    <a
                                        className={styles.map}
                                        href={country.maps.googleMaps}
                                        target="_blank"
                                    >
                                        Find on Map
                                    </a>

                                }
                            </section>
                        </div>
                    </div>
                ))}
            </>
        )
    }
}