import { PropsWithChildren } from "react";

export default function LabeledListItem({
  label,
  children,
  className = "",
}: PropsWithChildren<{ label: string; className?: string }>): JSX.Element {
  return (
    <li className={className ? className + " labeled-li" : "labeled-li"}>
      <div>
        <span className="key">{label}: </span>
        <span className="value">{children}</span>
      </div>
    </li>
  );
}
