import React, { useContext } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
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

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

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
        aria-labelledby="customized-dialog-title"
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
                <Button variant="contained" fullWidth onClick={onYes}>
                  Si
                </Button>
              </NavLink>
            </Grid>
            <Grid item>
              <Button variant="contained" fullWidth onClick={onNo}>
                No
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
