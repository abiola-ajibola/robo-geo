import L from "leaflet";
import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import useCurrentLocation from "../hooks/useCurrentLocation";
import { Point, User } from "../types";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import useUsers from "../hooks/useUsers";
import MyPopup from "../components/MyPopup";

const CurrentLocationIcon = L.divIcon({
  className: "marker-icon",
  html: `<span></span>`,
});

const { REACT_APP_TILELAYER_URL } = process.env;

function CenterMap({ center }: { center: Point }): JSX.Element {
  const map = useMapEvents({});
  useEffect(() => {
    map.panTo(center);
  }, [center, map]);
  return <></>;
}

export default function MapScreen() {
  const center: Point = useCurrentLocation();
  const users: User[] = useUsers();
  const usersWithIcons: User[] = useMemo<User[]>(
    () =>
      users.map((user) => {
        user.Icon = L.divIcon({
          html: `<img src="${user.image_url}" />`,
        });
        return user;
      }),
    [users]
  );
  return (
    <div className="map-screen__wrapper">
      <MapContainer
        center={center}
        zoom={14}
        attributionControl={false}
        zoomControl={false}
        minZoom={2}
        maxZoom={14}
      >
        <CenterMap center={center} />
        <ZoomControl position="bottomright" />
        <Marker position={center} icon={CurrentLocationIcon}>
          <Popup>
            <p>Your location</p>
          </Popup>
        </Marker>
        {usersWithIcons.map(
          ({ address, Icon, username, name, email, phone }) => (
            <Marker key={username} position={address.geo} icon={Icon}>
              <MyPopup name={name} email={email} phone={phone} />
            </Marker>
          )
        )}
        <TileLayer url={REACT_APP_TILELAYER_URL || ""} />
      </MapContainer>
    </div>
  );
}
