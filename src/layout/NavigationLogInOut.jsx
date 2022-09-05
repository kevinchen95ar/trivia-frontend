import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { LayoutContextProvider } from "./../context/LayoutContext";

export default function NavigationLogInOut() {
  const { loggedIn, setLoggedIn } = useContext(LayoutContextProvider);
  const navLinkStyle = { textDecoration: "none", color: "black" };

  return (
    <>
      {loggedIn ? (
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItemButton>
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
