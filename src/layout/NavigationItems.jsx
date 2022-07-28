import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import QuizIcon from "@mui/icons-material/Quiz";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

const navLinkStyle = { textDecoration: "none", color: "black" };

export const mainListItems = (
  <React.Fragment>
    <NavLink to="/ranking" style={navLinkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Ranking" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/trivia" style={navLinkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <QuizIcon />
        </ListItemIcon>
        <ListItemText primary="Trivia" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/users" style={navLinkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItemButton>
    </NavLink>
    <NavLink to="/integration" style={navLinkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integraciones" />
      </ListItemButton>
    </NavLink>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* Agregar auth para que solo muestre si no esta iniciado */}
    <NavLink to="/login" style={navLinkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText primary="Iniciar sesión" />
      </ListItemButton>
    </NavLink>

    {/* Agregar auth para que solo muestre si esta iniciado */}
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Cerrar sesión" />
    </ListItemButton>
  </React.Fragment>
);
