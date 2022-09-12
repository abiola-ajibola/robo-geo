import axios from "axios";
import cheerio from "cheerio";
import { COUNTRYAPI_KEY, COUNTRYAPI_URL } from "./constants";
import { CountryApiData } from "./types";
import { toLowercaseString } from "./utils";

const countryapiConfig = {
  headers: {
    Authorization: `Bearer ${COUNTRYAPI_KEY}`,
  },
};

export async function getAboutAndFlag(
  geoDataUrl?: string
): Promise<{ about?: string; flag_url?: string }> {
  const wikiDataHtml: string = geoDataUrl
    ? (await axios.get(geoDataUrl)).data
    : "";
  const $ = cheerio.load(wikiDataHtml);
  const section = $("html>body>section")[0];
  const paragraph = $("p", section, wikiDataHtml).text();
  const about = paragraph.replaceAll(/(\[[0-9]*\])/g, ""); // strip out the references
  const flag_url = $(
    "tbody>tr:nth-child(2)>td>div>div:nth-child(1)>div:nth-child(1)>span>a>img",
    section,
    wikiDataHtml
  ).attr("src");

  return {
    about,
    flag_url,
  };
}

export async function getReverseGeocodeData(
  reverseGeocodeUrl?: string
): Promise<{
  country: string;
  state: string;
  ISO_country: string;
  ISO_state: string;
  display_name: string;
  type: string;
}> {
  if (!reverseGeocodeUrl) {
    throw new Error("Server error");
  }
  const reverseGeocodeData = (await axios.get(reverseGeocodeUrl)).data;
  const country = reverseGeocodeData.address.country;
  const state = reverseGeocodeData.address.state;
  const display_name = reverseGeocodeData.display_name;
  const [ISO_country, ISO_state] =
    reverseGeocodeData.address["ISO3166-2-lvl4"].split("-");

  return {
    country,
    state,
    ISO_country,
    ISO_state,
    display_name,
    type: "country",
  };
}

export async function getOceanReverseGeocode(
  oceanReverseGeocodeUrl?: string
): Promise<{ name: string; type: string }> {
  if (!oceanReverseGeocodeUrl) {
    throw new Error("Server error");
  }

  const oceanGeoData: {
    ocean: {
      name: string;
    };
  } = (await axios.get(oceanReverseGeocodeUrl)).data;
  return { name: oceanGeoData?.ocean.name, type: "ocean" };
}

export async function getCountryData(country: string): Promise<{
  official_name: string;
  top_level_domain: string[];
  calling_code: string;
  capital: string;
  population: number;
  area: number;
  timezones: string[];
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
}> {
  const _countryData = (
    await axios.get(
      COUNTRYAPI_URL + toLowercaseString(country),
      countryapiConfig
    )
  ).data;

  const countryCode = Object.keys(_countryData)[0];
  const countryData = _countryData[countryCode];
  const {
    official_name,
    topLevelDomain: top_level_domain,
    callingCode: calling_code,
    capital,
    population,
    area,
    timezones,
    currencies: __currencies,
  }: CountryApiData = countryData;

  const currencies = Object.entries(__currencies).map(
    ([code, { name, symbol }]) => ({ code, name, symbol })
  );

  return {
    official_name,
    top_level_domain,
    calling_code,
    capital,
    population,
    area,
    timezones,
    currencies,
  };
}
