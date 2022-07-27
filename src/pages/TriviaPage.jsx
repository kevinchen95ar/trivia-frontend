import React, { useEffect, useContext } from "react";
import { LayoutContextProvider } from "./../context/LayoutContext";

export default function TriviaPage() {
  const { setHeaderTitle } = useContext(LayoutContextProvider);
  useEffect(() => {
    setHeaderTitle("Trivia");
  }, [setHeaderTitle]);

  return <div>Trivia</div>;
}
