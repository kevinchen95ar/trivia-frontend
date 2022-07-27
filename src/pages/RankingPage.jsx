import React, { useEffect, useContext } from "react";
import { LayoutContextProvider } from "./../context/LayoutContext";

export default function RankingPage() {
  const { setHeaderTitle } = useContext(LayoutContextProvider);
  useEffect(() => {
    setHeaderTitle("Ranking");
  }, [setHeaderTitle]);

  return <div>Ranking</div>;
}
