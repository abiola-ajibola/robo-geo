import { useEffect, useState } from "react";
import { Point } from "../types";

const ZERO_POINT: Point = {
  lat: 6.465422,
  lng: 3.406448,
};

export default function useCurrentLocation(
  defaultLocation: Point = ZERO_POINT
): Point {
  const [location, setLocation] = useState(defaultLocation);
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.error(
        "Geolocation is not enabled in your browser\nCannot determine your current  location"
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation: Point = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation((prev) => {
            return currentLocation;
          });
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);
  return location;
}
