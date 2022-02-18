import React, { useContext } from 'react';
import CountryDetail from '../../components/Country/CountryDetail/CountryDetail';
import CountryContext from '../../store/country-context';
import { useNavigate } from 'react-router-dom';
import styles from './Country.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Country = () => {
  const { theme } = useContext(CountryContext);
  const navigate = useNavigate();

  const navigateListHandler = () => {
    navigate('/');
  };

  return (
    <React.Fragment>
      <div
        className={`${
          theme === 'darkTheme' ? styles.darkTheme : styles.lightTheme
        } ${styles.navigationContainer}`}
      >
        <button
          className={`${theme}  ${styles.navigateBackButton}`}
          onClick={navigateListHandler}
        >
          <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
          Back
        </button>
      </div>

      <CountryDetail />
    </React.Fragment>
  );
};

export default Country;
