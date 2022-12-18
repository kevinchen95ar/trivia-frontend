import React, { useState, useEffect } from "react";
import { Autocomplete, IconButton, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";

export default function EditUser({
  setDialogOpen,
  userData,
  setUserData,
  setReload,
}) {
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [userData.username]);

  const roles = [{ label: "BASIC" }, { label: "EDITOR" }, { label: "ADMIN" }];

  const onSubmit = () => {
    // Llamada a actualizar el usuario al backend
    axios
      .put("http://localhost:4000/users", userData)
      .then(() => {
        // Cerramos ventana y relodeamos la tabla
        setDialogOpen(false);
        setReload(true);
      })
      .catch((error) => {
        setErrMsg("Fallo en el registro");
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
