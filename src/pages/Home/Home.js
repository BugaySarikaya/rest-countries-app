import React, { useContext } from 'react';
import CountryList from '../../components/Country/CountryList/CountryList';
import SearchBox from '../../components/SearchBox/SearchBox';
import DropdownFilter from '../../components/DropdownFilter/DropdownFilter';
import styles from './Home.module.css';
import CountryContext from '../../store/country-context';
import TranslateFilter from '../../components/TranslateFilter/TranslateFilter';

const Home = () => {
  const { theme } = useContext(CountryContext);

  return (
    <React.Fragment>
      <section
        className={`${
          theme === 'darkTheme' ? styles.darkTheme : styles.lightTheme
        } ${styles.filterContainer}`}
      >
        <SearchBox />
        <DropdownFilter />
        <TranslateFilter />
      </section>
      <CountryList />
    </React.Fragment>
  );
};

export default Home;
