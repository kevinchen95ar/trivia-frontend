import { Autocomplete, IconButton, Grid, TextField } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import React, { useState, useContext } from "react";
import axios from "axios";
import { LayoutContextProvider } from "../../context/LayoutContext";

export default function AddCategory({ setDialogOpen, setReload }) {
  const { setSnackbarSeverity, setSnackbarMessage, setOpenSnackbar } =
    useContext(LayoutContextProvider);
  const sourceOptions = [{ label: "opentdb" }];
  const [source, setSource] = useState("");

  const onYes = () => {
    if (source === "") {
      setSnackbarSeverity("warning");
      setSnackbarMessage("Faltan seleccionar datos");
      setOpenSnackbar(true);
      return;
    }
    //Actualizamos las categorias
    axios
      .put("http://localhost:4000/category/update", { source })
      .then((res) => {
        setSnackbarSeverity("success");
        setSnackbarMessage(res.data);
        setOpenSnackbar(true);
      })
      .catch((err) => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Ocurrio un error");
        setOpenSnackbar(true);
        console.log(err);
      });
    setReload(true);
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      <Grid
        container
        width={300}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Autocomplete
            fullWidth
            id="source-autocomplete"
            options={sourceOptions}
            value={source}
            clearIcon={false}
            freeSolo={false}
            renderInput={(params) => <TextField {...params} label="Source" />}
            onChange={(e, newValue) => {
              setSource(newValue.label);
            }}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          marginTop={0.5}
          marginBottom={-1}
        >
          <Grid item>
            <IconButton variant="contained" fullWidth onClick={onYes}>
              <DoneIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
