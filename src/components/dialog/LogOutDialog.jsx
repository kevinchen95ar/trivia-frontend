import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { LayoutContextProvider } from "../../context/LayoutContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function LogOutDialog({ dialogOpen, setDialogOpen }) {
  const { setLoggedIn } = useContext(LayoutContextProvider);
  //la apertura se maneja desde un useState del padre del dialog con un handleOpen

  const onYes = () => {
    // cerrar ventana, borrar token jwt y eliminar inicio de sesion
    setDialogOpen(false);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setLoggedIn(false);
  };

  const onNo = () => {
    // Cerrar la ventana
    setDialogOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="Logout-Dialog"
        open={dialogOpen}
        maxWidth={"md"}
      >
        <DialogContent dividers>
          <Grid item xs={12} marginBottom={2}>
            <Typography variant="h6">¿Desea cerrar sesión?</Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <NavLink
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <IconButton variant="contained" fullWidth onClick={onYes}>
                  <CheckIcon />
                </IconButton>
              </NavLink>
            </Grid>
            <Grid item>
              <IconButton variant="contained" fullWidth onClick={onNo}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
