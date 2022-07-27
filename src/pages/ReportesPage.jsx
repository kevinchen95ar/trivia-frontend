import React, { useContext, useEffect } from "react";
import { LayoutContextProvider } from "./../context/LayoutContext";

export default function ReportesPage() {
  const { setHeaderTitle } = useContext(LayoutContextProvider);

  useEffect(() => {
    setHeaderTitle("Reportes");
  }, [setHeaderTitle]);
  return <div>ReportesPage</div>;
}
