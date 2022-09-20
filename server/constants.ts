import * as dotenv from "dotenv";
dotenv.config();

const {
  NODE_PORT,
  TILELAYER_BASE_URL,
  REVERSE_GEOCODING_URL,
  GEODATA_API_URL,
  COUNTRYAPI_KEY,
  OCEAN_REVERSE_GEOCODING_URL,
} = process.env;

console.log({NODE_PORT})

export { NODE_PORT };
export { TILELAYER_BASE_URL };
export { REVERSE_GEOCODING_URL };
export { GEODATA_API_URL };
export { COUNTRYAPI_KEY };
export { OCEAN_REVERSE_GEOCODING_URL };
export const COUNTRYAPI_URL: string = "https://countryapi.io/api/name/";
