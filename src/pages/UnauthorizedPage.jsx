import React, { useEffect, useContext } from "react";
import { LayoutContextProvider } from "./../context/LayoutContext";

export default function UnauthorizedPage() {
  const { setHeaderTitle } = useContext(LayoutContextProvider);
  useEffect(() => {
    setHeaderTitle("Sin autorización");
  }, [setHeaderTitle]);

  return <div>Inicie sesión con una cuenta autorizada.</div>;
}
