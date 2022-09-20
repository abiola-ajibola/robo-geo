import { useEffect } from "react";

export default function useBlank() {
  useEffect(() => {
    document
      .querySelectorAll("a")
      .forEach((a) => a.setAttribute("target", "blank"));
  }, []);
}
