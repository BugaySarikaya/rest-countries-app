import React, { useContext } from 'react';
import CountryContext from '../../store/country-context';
import styles from './DropdownFilter.module.css';

const DropdownFilter = () => {
  const { theme, filterByRegion } = useContext(CountryContext);

  return (
    <React.Fragment>
      <div className={`${styles.dropdownContainer}`}>
        <select
          className={theme}
          name="select"
          id="select"
          defaultValue="All"
          onChange={(e) => filterByRegion(e.target.value)}
        >
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </React.Fragment>
  );
};

export default DropdownFilter;
