// Essa função retorna todas as combinações de moedas disponíveis
export const availableCombinations = async () => {
  try {
    const response = await fetch(
      "https://economia.awesomeapi.com.br/json/available"
    );
    const currencies = await response.json();

    return currencies;
  } catch (error) {
    console.error("Error:", error);
  }
};

const availableCurrencies = async () => {
  try {
    const response = await fetch(
      "https://economia.awesomeapi.com.br/json/available/uniq"
    );
    const countries = await response.json();

    return Object.keys(countries);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Essa função recebe um código de moeda e retorna o nome do país correspondente
export const convertCurrency = async (from, toCurrencies) => {
  const availableCurrenciesCombination = await availableCombinations();

  const currencies = toCurrencies
    .map((currency) => `${from}-${currency}`)
    .filter((currency) => {
      return Object.keys(availableCurrenciesCombination).includes(currency);
    })
    .join(",");

  try {
    const response = await fetch(
      `https://economia.awesomeapi.com.br/last/${currencies}`
    );
    const currenciesData = await response.json();

    return currenciesData;
  } catch (error) {
    console.error("Error:", error);
  }
};

// Essa função retorna todos os países e suas moedas
export const fetchCountryData = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();

    return countries
      .map((country) => {
        const countryName = country.name.common;
        const id = country.name.official;
        const currencyCode = Object.keys(country.currencies || {})[0];
        const currencySymbol = country.currencies?.[currencyCode]?.symbol;
        const currencyName = country.currencies?.[currencyCode]?.name;
        const states = country?.administrative?.states;

        return {
          id,
          name: countryName,
          currency: currencyCode,
          symbol: currencySymbol,
          currencyName,
          portugueseName: country.translations.por.common,
        };
      })
      .sort((a, b) => a.portugueseName.localeCompare(b.portugueseName));
  } catch (error) {
    console.error("Error:", error);
  }
};

// Por meio dessa função ocorre um filtro que verifica se possui a moeda do pais, serve para verificar se o país vai estar disponivel e assim o usuário utilizá-lo
export async function availableCountries() {
  const countryData = await fetchCountryData();
  const availableCurrenciesData = await availableCurrencies();

  const countryDataWithAvailableCurrencies = countryData.filter((country) =>
    availableCurrenciesData.includes(country.currency)
  );

  return countryDataWithAvailableCurrencies;
}
