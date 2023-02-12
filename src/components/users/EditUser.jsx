import React, { useState, useContext } from "react";
import { Autocomplete, IconButton, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import { LayoutContextProvider } from "../../context/LayoutContext";

export default function EditUser({
  setDialogOpen,
  userData,
  setUserData,
  setReload,
}) {
  const { setSnackbarSeverity, setSnackbarMessage, setOpenSnackbar } =
    useContext(LayoutContextProvider);
  const roles = [{ label: "BASIC" }, { label: "EDITOR" }, { label: "ADMIN" }];

  const onSubmit = () => {
    // Llamada a actualizar el usuario al backend
    axios
      .put("https://trivia-tdp-backend.herokuapp.com/users", userData)
      .then(() => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Actualizacion exitosa.");
        setOpenSnackbar(true);
        // Cerramos ventana y relodeamos la tabla
        setDialogOpen(false);
        setReload(true);
      })
      .catch((error) => {
        setSnackbarSeverity("error");
        setSnackbarMessage(error.message);
        setOpenSnackbar(true);
      });
  };

  return (
    <Grid container width={400}>
      <Grid item xs={12} marginTop={2} marginBottom={1}>
        <Autocomplete
          fullWidth
          id="role-autocomplete"
          options={roles}
          value={userData.role}
          clearIcon={false}
          freeSolo={false}
          renderInput={(params) => <TextField {...params} label="Rol" />}
          onChange={(e, newValue) => {
            setUserData({ ...userData, role: newValue.label });
          }}
        />
      </Grid>
      <Grid container justifyContent="flex-end">
        <IconButton
          variant="contained"
          onClick={() => {
            onSubmit();
          }}
          color="primary"
        >
          <CheckIcon color="action" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
