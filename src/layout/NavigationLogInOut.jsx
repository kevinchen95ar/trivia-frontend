import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { LayoutContextProvider } from "./../context/LayoutContext";
import LogOutDialog from "../components/dialog/LogOutDialog";

export default function NavigationLogInOut() {
  const { loggedIn } = useContext(LayoutContextProvider);
  const navLinkStyle = { textDecoration: "none", color: "black" };
  const [logOutDialogOpen, setLogOutDialogOpen] = useState(false);

  const logOut = () => {
    setLogOutDialogOpen(true);
  };

  return (
    <>
      {loggedIn ? (
        <>
          <ListItemButton onClick={logOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItemButton>
          <LogOutDialog
            dialogOpen={logOutDialogOpen}
            setDialogOpen={setLogOutDialogOpen}
          ></LogOutDialog>
        </>
      ) : (
        <NavLink to="/login" style={navLinkStyle}>
          <ListItemButton>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Iniciar sesión" />
          </ListItemButton>
        </NavLink>
      )}
    </>
  );
}
