import React, { useContext, useState, useEffect } from 'react';
import CountryContext from '../../../store/country-context';
import styles from './CountryDetail.module.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CountryDetail = () => {
  const { theme, filterByCode } = useContext(CountryContext);
  const [country, setCountry] = useState(null);
  const params = useParams();

  useEffect(() => {
    setCountry(filterByCode(params.id));
  }, [filterByCode, params]);

  return (
    <React.Fragment>
      {country && (
        <div
          className={`${
            theme === 'darkTheme' ? styles.darkTheme : styles.lightTheme
          }  ${styles.row} ${styles.wrapper} ${styles.container}`}
        >
          <div className={`${styles.flag}`}>
            <img src={country.flag} alt={`${country.name} flag`} />
          </div>

          <div className={` ${styles.info}`}>
            <div className={`${theme} ${styles.name}`}>
              <h2>{country.name}</h2>
            </div>

            <div className={`${styles.column} ${theme}`}>
              <h5>
                <strong>Native Name: </strong>
                {country.nativeName}
              </h5>

              <h5>
                <strong>Population: </strong>
                {country.population.toLocaleString()}
              </h5>

              <h5>
                <strong>Region: </strong>
                {country.region}
              </h5>

              <h5>
                <strong>Sub Region: </strong>
                {country.subRegion}
              </h5>

              <h5>
                <strong>Capital: </strong>
                {country.capital}
              </h5>
            </div>

            <div className={`${styles.column} ${theme}`}>
              <h5>
                <strong>Top Level Domain: </strong>
                {country.topLevelDomain}
              </h5>
              <h5>
                <strong>Currencies: </strong>
                {country.currencies}
              </h5>
              <h5>
                <strong>Languages: </strong>
                {country.languages}
              </h5>
            </div>

            {country.borderCountries && country.borderCountries.length > 0 && (
              <div className={`${styles.borderCountries} ${theme}`}>
                <h4>Border Countries: </h4>
                {country.borderCountries.map((borderCountry) => {
                  return (
                    <span className={theme} key={borderCountry.id}>
                      <Link className={theme} to={`/${borderCountry.id}`}>
                        {borderCountry.name}
                      </Link>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
      {!country && <div className={theme}>There are no records.</div>}
    </React.Fragment>
  );
};

export default CountryDetail;
