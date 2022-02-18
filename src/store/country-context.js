import React, { useState, useEffect, useCallback } from 'react';
import { getAllCountries } from '../helpers/apiHelper';

const CountryContext = React.createContext({
  countries: [],
  theme: 'darkTheme',
  isLoading: true,
  translateArray: [],
  filterByName: (name) => {},
  filterByRegion: (region) => {},
  filterByCode: (code) => {},
  toggleTheme: (theme) => {},
  translateCountryNames: (languageKey) => {},
});

export const CountryContextProvider = (props) => {
  const [baseCountries, setBaseCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('darkTheme');
  const [nameFilter, setNameFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [translateArray, setTranslateArray] = useState([]);

  useEffect(() => {
    async function loadCountry() {
      const data = await getAllCountries();
      if (data && Array.isArray(data)) {
        const translateList = [];
        const transformedCountries = data.map((countryData) => {
          let borderCountries = null;
          if (countryData.borders) {
            // alpha3code: borders array has alpha3Codes
            borderCountries = data
              .filter((country) =>
                countryData.borders.includes(country.alpha3Code)
              )
              .map((x) => {
                return { id: x.alpha3Code, name: x.name };
              });
          }

          for (const [key, value] of Object.entries(countryData.translations)) {
            if (!translateList.includes(key)) {
              translateList.push(key);
            }
          }

          return {
            id: countryData.alpha3Code,
            name: countryData.name,
            population: countryData.population,
            region: countryData.region,
            capital: countryData.capital,
            nativeName: countryData.nativeName,
            subRegion: countryData.subregion,
            topLevelDomain: countryData.topLevelDomain.toString(),
            currencies:
              countryData.currencies && countryData.currencies.length > 0
                ? countryData.currencies.map((x) => x.name).toString()
                : '',
            languages:
              countryData.languages && countryData.languages.length > 0
                ? countryData.languages.map((x) => x.name).toString()
                : '',
            borderCountries,
            flag: countryData.flags.svg,
            baseName: countryData.name,
            translations: countryData.translations,
          };
        });

        translateList.push('or');

        setBaseCountries(transformedCountries);
        setCountries(transformedCountries);
        setTranslateArray(translateList);
      }
      setIsLoading(false);
    }

    loadCountry();
  }, []);

  // This function allow us to multi property filtering(like name and region by order)
  const filter = (type, value, countryList) => {
    if (type === 'name') {
      return value.trim() === '' || !value
        ? countryList
        : countryList.filter((country) =>
            country.name.toLowerCase().includes(value.toLowerCase())
          );
    }

    if (type === 'region') {
      return value === 'All' || !value
        ? countryList
        : countryList.filter((country) => country.region === value);
    }
  };

  const filterByName = useCallback(
    (name) => {
      setNameFilter(name);

      let filteredCountryList = regionFilter
        ? filter('region', regionFilter, baseCountries)
        : baseCountries;

      filteredCountryList = filter('name', name, filteredCountryList);

      setCountries(filteredCountryList);
    },
    [regionFilter, baseCountries]
  );

  const filterByRegion = (region) => {
    setRegionFilter(region);

    let filteredCountryList = nameFilter
      ? filter('name', nameFilter, baseCountries)
      : baseCountries;

    filteredCountryList = filter('region', region, filteredCountryList);

    setCountries(filteredCountryList);
  };

  const filterByCode = useCallback(
    (code) => {
      return baseCountries
        ? baseCountries.find((country) => country.id === code)
        : {};
    },
    [baseCountries]
  );

  const toggleTheme = (theme) => {
    setTheme(theme);
  };

  const translateCountryNames = (languageKey) => {
    setCountries(
      countries.map((country) => {
        country.name =
          languageKey && country.translations[languageKey]
            ? country.translations[languageKey]
            : country.baseName;
        return country;
      })
    );
  };

  return (
    <CountryContext.Provider
      value={{
        countries,
        theme,
        isLoading,
        translateArray,
        filterByName,
        filterByRegion,
        filterByCode,
        toggleTheme,
        translateCountryNames,
      }}
    >
      {props.children}
    </CountryContext.Provider>
  );
};

export default CountryContext;
