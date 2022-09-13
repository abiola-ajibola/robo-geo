import { useState } from "react";
import { motion } from "framer-motion";
import { useMap } from "react-leaflet";
import { User } from "../../types";
import "./style.css";

function SidePaneIcon({ user }: { user: User }): JSX.Element {
  const map = useMap();
  return (
    <div className="side-pane-icon" onClick={() => map.panTo(user.address.geo)}>
      <img src={user.image_url} alt="" />
    </div>
  );
}

export default function SidePane({ users }: { users: User[] }): JSX.Element {
  const [hidden, setHidden] = useState(false);
  const [transitionMode, setTransitionMode] = useState(0);
  const switchPane = (value: boolean) => {
    setHidden(value);
    setTransitionMode(value ? -80 : 0);
  };
  return (
    <motion.div animate={{ x: transitionMode }} className="side-pane__wrapper">
      <div className="side-pane-button">
        {hidden ? (
          <button onClick={() => switchPane(false)}>{">>"}</button>
        ) : (
          <button onClick={() => switchPane(true)}>{"<<"}</button>
        )}
      </div>
      <div className={"side-pane"}>
        {users.map((user) => (
          <SidePaneIcon user={user} />
        ))}
      </div>
    </motion.div>
  );
}
