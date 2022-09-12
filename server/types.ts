export type CountryApiData = {
  official_name: string;
  topLevelDomain: string[];
  callingCode: string;
  capital: string;
  population: number;
  area: number;
  timezones: string[];
  currencies: {
    code: {
      name: string;
      symbol: string;
    };
  };
};
