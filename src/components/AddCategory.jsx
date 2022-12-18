import {
  Autocomplete,
  IconButton,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import React, { useState } from "react";
import axios from "axios";

export default function AddCategory({ setDialogOpen, setReload }) {
  const sourceOptions = [{ label: "opentdb" }];
  const [source, setSource] = useState("");
  const [msg, setMsg] = useState("");

  const onYes = () => {
    //Actualizamos las categorias
    axios
      .put("http://localhost:4000/category/update", { source })
      .then((res) => {
        setMsg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
