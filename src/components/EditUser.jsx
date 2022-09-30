import React, { useState, useEffect } from "react";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

export default function EditUser({
  setDialogOpen,
  userData,
  setUserData,
  setReload,
}) {
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [userError, setUserError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidName(USER_REGEX.test(userData.username));
    setUserError(false);
    setErrMsg("");
  }, [userData.username]);

  const roles = [
    { label: "Normal" },
    { label: "Editor" },
    { label: "Administrador" },
  ];

  const onSubmit = () => {
    if (!validName) {
      setUserError(true);
      return;
    }
    // Llamada a actualizar el usuario al backend
    axios
      .put("http://localhost:4000/users", userData)
      .then(() => {
        // Cerramos ventana y relodeamos la tabla
        setDialogOpen(false);
        setReload(true);
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          setErrMsg("El nombre de usuario ya esta en uso");
          setUserError(true);
        } else {
          setErrMsg("Fallo en el registro");
        }
      });
  };

  return (
    <Grid container width={400}>
      {errMsg !== "" ? (
        <Grid item marginLeft={1} marginBottom={1} marginTop={1}>
          <Typography
            style={{
              color: "#d32f2f",
              borderRadius: "5px",
            }}
            variant="h7"
            gutterBottom
            textAlign={"center"}
          >
            {errMsg}
          </Typography>
        </Grid>
      ) : (
        ""
      )}
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
          error={userError}
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
