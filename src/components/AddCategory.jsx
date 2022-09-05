import { Button, Grid, Typography } from "@mui/material";
import React from "react";

export default function AddCategory() {
  const onYes = () => {
    // actualizar las categorias con  https://opentdb.com/api_category.php
  };

  const onNo = () => {
    // Cerrar la ventana
  };
  return (
    <Grid container width={300}>
      <Grid item xs={12} marginBottom={2}>
        <Typography variant="h5">
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
          <Button variant="contained" fullWidth onClick={() => onYes}>
            Si
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" fullWidth onClick={() => onNo}>
            No
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
