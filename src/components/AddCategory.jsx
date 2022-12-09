import { IconButton, Grid, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import axios from "axios";

export default function AddCategory({ setDialogOpen, setReload }) {
  const [msg, setMsg] = useState("");
  const onYes = () => {
    //Actualizamos las categorias
    axios
      .get("http://localhost:4000/category/update")
      .then((res) => {
        setMsg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onNo = () => {
    // Cerrar la ventana
    setDialogOpen(false);
  };

  const onOk = () => {
    // Cerrar la ventana
    setReload(true);
    setDialogOpen(false);
  };
  return (
    <React.Fragment>
      {msg === "" ? (
        <Grid
          container
          width={300}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} marginBottom={2}>
            <Typography variant="h6">
              ¿Desea actualizar las categorias disponibles?
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <IconButton variant="contained" fullWidth onClick={onYes}>
                <DoneIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton variant="contained" fullWidth onClick={onNo}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          width={300}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} marginBottom={2}>
            <Typography variant="h6">{msg}</Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <IconButton variant="contained" fullWidth onClick={onOk}>
                <DoneIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}
