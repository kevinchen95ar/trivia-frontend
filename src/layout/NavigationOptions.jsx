import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import QuizIcon from "@mui/icons-material/Quiz";
import { LayoutContextProvider } from "./../context/LayoutContext";

export default function NavigationOptions() {
  const { loggedIn, loggedInRole } = useContext(LayoutContextProvider);
  const navLinkStyle = { textDecoration: "none", color: "black" };

  return (
    <React.Fragment>
      <NavLink to="/ranking" style={navLinkStyle}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Ranking" />
        </ListItemButton>
      </NavLink>
      {loggedIn ? (
        <NavLink to="/trivia" style={navLinkStyle}>
          <ListItemButton>
            <ListItemIcon>
              <QuizIcon />
            </ListItemIcon>
            <ListItemText primary="Trivia" />
          </ListItemButton>
        </NavLink>
      ) : (
        ""
      )}
      {loggedIn && loggedInRole === "ADMIN" ? (
        <NavLink to="/users" style={navLinkStyle}>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItemButton>
        </NavLink>
      ) : (
        ""
      )}
      {loggedIn && (loggedInRole === "ADMIN" || loggedInRole === "EDITOR") ? (
        <NavLink to="/integration" style={navLinkStyle}>
          <ListItemButton>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integraciones" />
          </ListItemButton>
        </NavLink>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
