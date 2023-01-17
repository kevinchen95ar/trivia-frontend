import React, { useState, createContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const LayoutContextProvider = createContext();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LayoutContext = (props) => {
  const [headerTitle, setHeaderTitle] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [userID, setUserID] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInRole, setLoggedInRole] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

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
          snackbarSeverity,
          setSnackbarSeverity,
          snackbarMessage,
          setSnackbarMessage,
          openSnackbar,
          setOpenSnackbar,
        }}
      >
        {props.children}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </LayoutContextProvider.Provider>
    </div>
  );
};

export default LayoutContext;
