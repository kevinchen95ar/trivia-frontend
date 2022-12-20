import React, { useState, createContext } from "react";

export const LayoutContextProvider = createContext();

const LayoutContext = (props) => {
  const [headerTitle, setHeaderTitle] = useState("");
  const [userID, setUserID] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState("");

  return (
    <div>
      <LayoutContextProvider.Provider
        value={{
          headerTitle,
          setHeaderTitle,
          loggedIn,
          setLoggedIn,
          loggedInRole,
          setLoggedInRole,
          userID,
          setUserID,
        }}
      >
        {props.children}
      </LayoutContextProvider.Provider>
    </div>
  );
};

export default LayoutContext;
