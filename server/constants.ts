import * as dotenv from "dotenv";
dotenv.config();

const {
  NODE_PORT,
  TILELAYER_BASE_URL,
  REVERSE_GEOCODING_URL,
  GEODATA_API_URL,
  COUNTRYAPI_KEY,
} = process.env;

export { NODE_PORT };
export { TILELAYER_BASE_URL };
export { REVERSE_GEOCODING_URL };
export { GEODATA_API_URL };
export { COUNTRYAPI_KEY };
export const COUNTRYAPI_URL: string = "https://countryapi.io/api/name/";