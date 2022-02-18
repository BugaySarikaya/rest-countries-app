import React, { useContext } from 'react';
import CountryContext from '../../../store/country-context';
import CountryCard from '../CountryCard/CountryCard';
import styles from './CountryList.module.css';

const CountryList = () => {
  const { countries, theme, isLoading } = useContext(CountryContext);

  return (
    <section
      className={`${
        theme === 'darkTheme' ? styles.darkTheme : styles.lightTheme
      } ${styles.countryContainer}`}
    >
      {isLoading && <h1 className={`${theme} loading`}>Loading...</h1>}

      {!isLoading &&
        countries.length > 0 &&
        countries.map((country) => (
          <CountryCard key={country.id} country={country} />
        ))}

      {!isLoading && countries.length === 0 && (
        <div className={theme}>There are no records.</div>
      )}
    </section>
  );
};

export default CountryList;
