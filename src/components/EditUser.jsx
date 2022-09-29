import React, { useState, useEffect } from "react";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

export default function EditUser({
  setDialogOpen,
  userData,
  setUserData,
  setReload,
}) {
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(userData.username));
    setError(false);
  }, [userData.username]);

  const roles = [
    { label: "Normal" },
    { label: "Editor" },
    { label: "Administrador" },
  ];

  const onSubmit = () => {
    if (!validName) {
      setError(true);
      return;
    }
    // Agregar llamada al backend

    setDialogOpen(false);
    setReload(true);
  };

  return (
    <Grid container width={400}>
      <Grid item xs={12}>
        <TextField
          id="username"
          autoComplete="off"
          placeholder="Ingresa un nombre de usuario "
          label="Nombre de usuario"
          type="text"
          value={userData["username"]}
          margin="normal"
          variant="outlined"
          color="primary"
          error={error}
          fullWidth
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          helperText={
            !validName || userFocus ? (
              <Typography>
                El nombre de usuario debe contener de 4 a 24 caracteres y
                comenzar con una letra
              </Typography>
            ) : (
              ""
            )
          }
        />
      </Grid>
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
        <Button
          variant="contained"
          onClick={() => {
            onSubmit();
          }}
          color="primary"
        >
          Editar
        </Button>
      </Grid>
    </Grid>
  );
}
