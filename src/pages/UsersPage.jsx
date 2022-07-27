import React, { useEffect, useContext } from "react";
import { LayoutContextProvider } from "./../context/LayoutContext";

export default function UsersPage() {
  const { setHeaderTitle } = useContext(LayoutContextProvider);
  useEffect(() => {
    setHeaderTitle("Usuarios");
  }, [setHeaderTitle]);

  return <div>Users</div>;
}
