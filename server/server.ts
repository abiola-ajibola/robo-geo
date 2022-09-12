import axios from "axios";
import express, { Request, Response, Express } from "express";
import path from "node:path";
import {
  getAboutAndFlag,
  getCountryData,
  getOceanReverseGeocode,
  getReverseGeocodeData,
} from "./apiRequests";
import {
  GEODATA_API_URL,
  NODE_PORT,
  REVERSE_GEOCODING_URL,
  TILELAYER_BASE_URL,
  OCEAN_REVERSE_GEOCODING_URL,
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
    const oceanReverseGeocodeUrl = OCEAN_REVERSE_GEOCODING_URL?.replace(
      "{{lat}}",
      query.lat as string
    ).replace("{{lng}}", query.lon as string);
    if (reverseGeocodeUrl || oceanReverseGeocodeUrl) {
      try {
        const reverseGeocodeData = await Promise.allSettled([
          getReverseGeocodeData(reverseGeocodeUrl),
          getOceanReverseGeocode(oceanReverseGeocodeUrl),
        ]);
        if (reverseGeocodeData?.[0].status === "fulfilled") {
          const { country, state, ISO_country, ISO_state, display_name, type } =
            reverseGeocodeData[0].value;

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
            type,
          });
        }

        if (reverseGeocodeData?.[1].status === "fulfilled") {
          const { name: ocean_name, type } = reverseGeocodeData[1].value;
          const formatName = ocean_name.split(" ");
          if (formatName.length > 2) formatName.shift();
          const { about } = await getAboutAndFlag(
            GEODATA_API_URL?.replace(
              "{{title}}",
              encodeURIComponent(formatName.join(" "))
            )
          );
          if (ocean_name) res.json({ ocean_name, type, about });
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Server error" });
      }
    } else {
      console.log({ error: "no reverse geolocation url" });
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
