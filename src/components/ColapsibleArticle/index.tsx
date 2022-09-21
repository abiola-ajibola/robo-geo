import { DetailedHTMLProps, useState } from "react";
import "./style.css"

export default function ColapsibleArticle(
  props: DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    content?: string;
    moreText?: string;
    lessText?: string;
    minHeight?: string | number;
    defaultCollapsed?: boolean;
  }
) {
  const defaultState = props.defaultCollapsed === false ? false : true;
  const moreText = props.moreText ?? "Show more";
  const lessText = props.lessText ?? "Show less";
  const invalidHeight = !!props.minHeight && isNaN(Number(props.minHeight));
  if (invalidHeight) {
    console.error(
      `Invalid height set for ColapsibleArticle:\n${props.minHeight} is not valid.\nEnter either a number or a string containing only numeric values: For example: "300" or 300`
    );
  }
  const minHeight = props.minHeight ?? "300";
  const [collapsed, setCollapsed] = useState(defaultState);
  const handleClick = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="collapsible-article__wrapper">
      <article
        {...props}
        style={{ height: collapsed ? minHeight.toString() + "px" : "unset" }}
        className={props.className + " collapsible-article"}
      >
        {props.content || ""}
      </article>
      <p>
        <button onClick={handleClick} className="collapsible-article__button">
          {collapsed ? moreText : lessText}
        </button>
      </p>
    </div>
  );
}
