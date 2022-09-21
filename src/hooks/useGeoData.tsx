import { useState, useEffect } from "react";
import { GeoData, Point } from "../types";

const { NODE_ENV } = process.env;

export default function useGeoData(point: Point): GeoData | null {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  useEffect(() => {
    const { lat, lng } = point;
    const url = new URL(
      NODE_ENV === "development"
        ? document.location.origin + "/test/getGeoData"
        : document.location.origin + "/getGeoData"
    );
    url.searchParams.set("lat", lat.toString());
    url.searchParams.set("lon", lng.toString());
    (async () => {
      try {
        const response = await fetch(url);
        const data: GeoData = await response.json();
        setGeoData(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [point]);
  return geoData;
}
