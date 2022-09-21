import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";
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
