import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Country from '../../pages/Country/Country';
import NotFound from '../../pages/NotFound/NotFound';
import Navbar from '../Navbar/Navbar';
import CountryContext from '../../store/country-context';
import styles from './App.module.css';

const App = () => {
  const { theme } = useContext(CountryContext);

  document.body.classList = `${
    theme === 'darkTheme' ? styles.darkTheme : styles.lightTheme
  }`;

  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* id: country calling code  */}
        <Route path="/:id" element={<Country />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
