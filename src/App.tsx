import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MapScreen from "./screens/MapScreen";
import Profile from "./screens/Profile";
import { User } from "./types";

const defaultUser: User = {
  id: 0,
  name: "",
  username: "",
  email: "",
  image_url: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: 0,
      lng: 0,
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

// const defaultUser: User = {
//   id: 7,
//   name: "Kurtis Weissnat",
//   username: "Elwyn.Skiles",
//   email: "Telly.Hoeger@billy.biz",
//   address: {
//     street: "Rex Trail",
//     suite: "Suite 280",
//     city: "Howemouth",
//     zipcode: "58804-1099",
//     geo: {
//       lat: 24.8918,
//       lng: 21.8984,
//     },
//   },
//   phone: "210.067.6132",
//   website: "elvis.io",
//   company: {
//     name: "Yost and Sons",
//     catchPhrase: "Switchable contextually-based project",
//     bs: "aggregate real-time technologies",
//   },
//   image_url: "https://robohash.org/Kurtis Weissnat?size=64x64&set=set3",
// };

function App(): JSX.Element {
  const [user, setUser] = useState<User>(defaultUser);
  return (
    <BrowserRouter>
      <div className="app__wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/map" />} />
          <Route path="/map" element={<MapScreen setUser={setUser} />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
