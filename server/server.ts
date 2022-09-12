import axios from "axios";
import express, { Request, Response, Express } from "express";
import path from "node:path";
import {
  getAboutAndFlag,
  getCountryData,
  getReverseGeocodeData,
} from "./apiRequests";
import {
  GEODATA_API_URL,
  NODE_PORT,
  REVERSE_GEOCODING_URL,
  TILELAYER_BASE_URL,
} from "./constants";
const app: Express = express();

const { cwd } = process;

const buildPath = path.resolve(cwd(), "build");
app.use(express.static(buildPath));

app.get("/gettiles", async (req: Request, res: Response) => {
  const { query } = req;
  const s = query.s;
  const { x, y, z } = query;
  const url = s
    ? `https://${s}.${TILELAYER_BASE_URL}/${z}/${x}/${y}`
    : `https://${TILELAYER_BASE_URL}/${z}/${x}/${y}`;
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    res.send(response.data as Buffer);
  } catch (e: any) {
    console.log({ e: e.message });
  }
});

app.get("/getGeoData", async (req, res) => {
  const { query } = req;
  if ("lat" in query && "lon" in query) {
    const reverseGeocodeUrl = REVERSE_GEOCODING_URL?.replace(
      "{{lat}}",
      query.lat as string
    ).replace("{{lon}}", query.lon as string);
    if (reverseGeocodeUrl) {
      try {
        const { country, state, ISO_country, ISO_state, display_name } =
          await getReverseGeocodeData(reverseGeocodeUrl);
        const { about, flag_url } = await getAboutAndFlag(
          GEODATA_API_URL?.replace("{{title}}", encodeURIComponent(country))
        );

        const {
          official_name,
          top_level_domain,
          calling_code,
          capital,
          population,
          area,
          timezones,
          currencies,
        } = await getCountryData(country);

        res.json({
          country,
          state,
          ISO_country,
          ISO_state,
          display_name,
          about,
          flag_url,
          official_name,
          top_level_domain,
          calling_code,
          capital,
          population,
          area,
          timezones,
          currencies,
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Server error" });
      }
    } else {
      console.log({ error: "no reverse geolocation url urls" });
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Invalid query" });
  }
});

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(buildPath, "index.html"), (err) => {
    if (err) console.error(err);
  });
});

app.listen(NODE_PORT, () => {
  console.log("Listening on port " + NODE_PORT);
});
