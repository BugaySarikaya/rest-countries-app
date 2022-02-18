import React, { useContext } from 'react';
import CountryContext from '../../store/country-context';
import styles from './TranslateFilter.module.css';

const TranslateFilter = () => {
  const { theme, translateCountryNames, translateArray } =
    useContext(CountryContext);

  return (
    <React.Fragment>
      <div className={`${styles.dropdownContainer}`}>
        <select
          className={theme}
          name="select"
          id="select"
          defaultValue=""
          onChange={(e) => translateCountryNames(e.target.value)}
        >
          {translateArray &&
            translateArray.length > 0 &&
            translateArray.map((x) => (
              <option key={x} value={x === 'or' ? '' : x}>
                {x}
              </option>
            ))}
        </select>

        {/*       <option value="Base">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select> */}
      </div>
    </React.Fragment>
  );
};

export default TranslateFilter;
