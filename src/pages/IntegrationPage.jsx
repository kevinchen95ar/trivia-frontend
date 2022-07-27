import React, { useEffect, useContext } from "react";
import { LayoutContextProvider } from "./../context/LayoutContext";

export default function IntegrationPage() {
  const { setHeaderTitle } = useContext(LayoutContextProvider);
  useEffect(() => {
    setHeaderTitle("Integraciones");
  }, [setHeaderTitle]);

  return <div>Integracion</div>;
}
