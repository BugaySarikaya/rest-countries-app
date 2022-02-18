import React, { useContext, useRef } from 'react';
import CountryContext from '../../store/country-context';
import styles from './SearchBox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash.debounce';

const SearchBox = () => {
  const { theme, filterByName } = useContext(CountryContext);
  const searchRef = useRef();

  const debouncedFilter = debounce((search) => {
    filterByName(search);
  }, 500);

  if (!searchRef.current) {
    debouncedFilter('');
  }

  return (
    <React.Fragment>
      <div className={`${theme} ${styles.searchBoxContainer}`}>
        <FontAwesomeIcon icon={faSearch} />
        <input
          className={`${theme}`}
          type="text"
          id="search"
          autoComplete="off"
          placeholder="Search for a country..."
          ref={searchRef}
          onChange={(e) => debouncedFilter(e.target.value)}
        />
      </div>
    </React.Fragment>
  );
};

export default SearchBox;
