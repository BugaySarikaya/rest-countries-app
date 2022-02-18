const API_URL = 'https://restcountries.com/v2';

export async function getAllCountries() {
  try {
    const response = await fetch(`${API_URL}/all`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Could not fetch countries - ${error} `);
  }
}
