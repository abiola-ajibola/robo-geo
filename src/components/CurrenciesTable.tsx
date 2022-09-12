import { PropsWithChildren } from "react";

export default function CurrenciesTable({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <table
      className={
        className ? className + " currencies-table" : "currencies-table"
      }
    >
      <thead>
        <tr>
          <td>Name</td>
          <td>Code</td>
          <td>Symbol</td>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
