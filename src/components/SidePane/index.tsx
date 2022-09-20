import { useState, createRef } from "react";
import { motion } from "framer-motion";
import { OnIntersectionProps, User, VisibilityState } from "../../types";
import "./style.css";
import DoubleArrow from "../DoubleArrow";
import SingleArrow from "../SingleArrow";
import ScrollablePane from "./ScrollablePane";

const scroll = (
  element: HTMLDivElement | null,
  direction: "up" | "down"
): void => {
  element?.scrollBy({
    behavior: "smooth",
    top: direction === "up" ? -128 : 128,
  });
};

export default function SidePane({ users }: { users: User[] }): JSX.Element {
  const [{ firstIconVisible, lastIconVisible, position }, setVisibleIcon] =
    useState<VisibilityState>({
      firstIconVisible: true,
      lastIconVisible: false,
      position: "start",
    });

  const sidePaneRef = createRef<HTMLDivElement>();
  const [hidden, setHidden] = useState(false);
  const [transitionMode, setTransitionMode] = useState(0);
  const switchPane = (value: boolean) => {
    setHidden(value);
    setTransitionMode(value ? -80 : 0);
  };
  const length = users.length;
  const handleIntersection = ({ id, entry }: OnIntersectionProps) => {
    if (id === "0") {
      if (entry.intersectionRatio === 1 && position !== "start") {
        setVisibleIcon((visibleIcon: VisibilityState) => ({
          ...visibleIcon,
          firstIconVisible: true,
          position: "start",
        }));
      }

      if (entry.intersectionRatio !== 1 && position === "start") {
        setVisibleIcon((visibleIcon: VisibilityState) => ({
          ...visibleIcon,
          firstIconVisible: false,
          position: "middle",
        }));
      }
    }

    if (id === `${length - 1}`) {
      if (entry.intersectionRatio === 1 && position !== "end") {
        setVisibleIcon((visibleIcon: VisibilityState) => ({
          ...visibleIcon,
          lastIconVisible: true,
          position: "end",
        }));
      }

      if (entry.intersectionRatio !== 1 && position === "end") {
        setVisibleIcon((visibleIcon: VisibilityState) => ({
          ...visibleIcon,
          lastIconVisible: false,
          position: "middle",
        }));
      }
    }
  };

  return (
    <motion.div animate={{ x: transitionMode }} className="side-pane__wrapper">
      <div className="side-pane-button">
        {hidden ? (
          <button onClick={() => switchPane(false)}>
            <DoubleArrow />
          </button>
        ) : (
          <button className="reverse" onClick={() => switchPane(true)}>
            <DoubleArrow />
          </button>
        )}
      </div>
      <div className="side-pane-scroll-button__wrapper">
        <button
          disabled={firstIconVisible}
          onClick={() => scroll(sidePaneRef.current, "up")}
          className="side-pane-scroll-button scroll-up"
        >
          <SingleArrow />
        </button>
      </div>
      <ScrollablePane
        onIntersection={({ entry, id }) => handleIntersection({ entry, id })}
        users={users}
        ref={sidePaneRef}
        onScroll={(e) => console.log({ e })}
      />
      <div className="side-pane-scroll-button__wrapper">
        <button
          disabled={lastIconVisible}
          onClick={() => scroll(sidePaneRef.current, "down")}
          className="side-pane-scroll-button scroll-down"
        >
          <SingleArrow />
        </button>
      </div>
    </motion.div>
  );
}
