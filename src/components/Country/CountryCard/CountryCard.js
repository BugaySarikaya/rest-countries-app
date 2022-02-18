import React, { useContext } from 'react';
import CountryContext from '../../../store/country-context';
import styles from './CountryCard.module.css';
import { Link } from 'react-router-dom';

const CountryCard = (props) => {
  const { theme } = useContext(CountryContext);
  const { country } = props;

  return (
    <React.Fragment>
      <article className={styles.article}>
        <Link to={`/${country.id}`}>
          <div className={`${theme} ${styles.card}`}>
            <div className={styles.flag}>
              <img src={country.flag} alt={`${country.name} flag`} />
            </div>
            <div className={`${theme} ${styles.info}`}>
              <h3>
                <strong>{country.name}</strong>
              </h3>
              <h5>
                <strong>Population: </strong>
                {country.population.toLocaleString()}
              </h5>
              <h5>
                <strong>Region: </strong>
                {country.region}
              </h5>
              <h5>
                <strong>Capital: </strong>
                {country.capital}
              </h5>
            </div>
          </div>
        </Link>
      </article>
    </React.Fragment>
  );
};

export default CountryCard;
