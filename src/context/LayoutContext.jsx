import React, { useState, createContext } from "react";

export const LayoutContextProvider = createContext();

const LayoutContext = (props) => {
  const [headerTitle, setHeaderTitle] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <LayoutContextProvider.Provider
        value={{
          headerTitle,
          setHeaderTitle,
          loggedIn,
          setLoggedIn,
        }}
      >
        {props.children}
      </LayoutContextProvider.Provider>
    </div>
  );
};

export default LayoutContext;
