import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import CountryContext from '../../store/country-context';

const Navbar = () => {
  let { theme, toggleTheme } = useContext(CountryContext);

  const toggleThemeHandler = () => {
    const toggledTheme = theme === 'darkTheme' ? 'lightTheme' : 'darkTheme';
    toggleTheme(toggledTheme);
  };

  return (
    <React.Fragment>
      <nav className={`${theme} ${styles.nav}`}>
        <div className={theme}>
          <h2>Where in the world?</h2>
        </div>
        <div className={`${theme} ${styles.toggleContainer}`}>
          <FontAwesomeIcon icon={faMoon} transform={{ rotate: -30 }} />
          <button className={theme} onClick={toggleThemeHandler}>
            {theme === 'darkTheme' ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
