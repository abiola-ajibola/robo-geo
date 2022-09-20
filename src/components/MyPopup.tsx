import { Dispatch, SetStateAction } from "react";
import { Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { User } from "../types";

type PopupProps = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export default function MyPopup({ setUser, user }: PopupProps): JSX.Element {
  const { name, email, phone } = user;
  return (
    <Popup>
      <ul className="popup__list__wrapper">
        <li>
          <p>
            <span>Name: </span>
            <span>{name}</span>
          </p>
        </li>
        <li>
          <p>
            <span>Email: </span>
            <span>{email}</span>
          </p>
        </li>
        <li>
          <p>
            <span>Phone: </span>
            <span>{phone}</span>
          </p>
        </li>
        <li>
          <p>
            <span>Profile: </span>
            <span>
              <Link onClick={() => setUser(user)} to={"/profile"}>
                See profile
              </Link>
            </span>
          </p>
        </li>
      </ul>
    </Popup>
  );
}
