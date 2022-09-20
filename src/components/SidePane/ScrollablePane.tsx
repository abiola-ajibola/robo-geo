import { Ref, forwardRef, useEffect, MutableRefObject, useRef } from "react";
import { ScrollablePaneProps } from "../../types";
import SidePaneIcon from "./SidePaneIcon";

const ScrollablePane = forwardRef(
  (props: ScrollablePaneProps, ref: Ref<HTMLDivElement>) => {
    const { users, onIntersection } = props;
    const sidePaneInnerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (sidePaneInnerRef.current) {
        const length = sidePaneInnerRef.current?.children.length;
        const firstIcon = sidePaneInnerRef.current?.children[0];
        const lastIcon =
          length && length > 1
            ? sidePaneInnerRef.current?.children[length - 1]
            : null;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const id = entry.target.id;
              onIntersection({ id, entry });
            });
          },
          {
            root: (ref as MutableRefObject<HTMLDivElement>).current,
            threshold: 1,
          }
        );

        firstIcon && observer.observe(firstIcon as Element);
        lastIcon && observer.observe(lastIcon as Element);
        return () => observer.disconnect();
      }
    }, [ref, onIntersection]);
    return (
      <div className="side-pane" ref={ref}>
        <div ref={sidePaneInnerRef}>
          {users.map((user, index) => {
            return <SidePaneIcon id={`${index}`} key={user.id} user={user} />;
          })}
        </div>
      </div>
    );
  }
);

export default ScrollablePane;
