import {
  HTMLAttributes,
  DetailedHTMLProps,
} from "react";
import { useMap } from "react-leaflet";
import { User } from "../../types";

export default function SidePaneIcon(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    user: User;
  }
): JSX.Element {
  const { user } = props;
  const map = useMap();
  return (
    <div
      {...props}
      className="side-pane-icon"
      onClick={() => map.panTo(user.address.geo)}
    >
      <img src={user.image_url} alt="" />
    </div>
  );
}
