import { Popup } from "react-leaflet";

type PopupProps = { name: string; email: string; phone: string };

export default function MyPopup(props: PopupProps): JSX.Element {
  const { name, email, phone } = props;
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
      </ul>
    </Popup>
  );
}