import { Autocomplete, IconButton, Grid, TextField } from "@mui/material";
import { LayoutContextProvider } from "../../context/LayoutContext";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";

const sourceOptions = [{ label: "opentdb" }];

const quantity = [
  { label: "10" },
  { label: "20" },
  { label: "30" },
  { label: "40" },
  { label: "50" },
];

export default function AddQuestion(props) {
  const { categories, setDialogOpen, setReload } = props;
  const { setSnackbarSeverity, setSnackbarMessage, setOpenSnackbar } =
    useContext(LayoutContextProvider);
  const [questionSettings, setQuestionSettings] = useState({
    category: "",
    difficulty: "",
    quantity: "",
    source: "",
  });
  const [difficulty, setDifficulty] = useState([]);
  const [category, setCategory] = useState([]);

  //useEffect de difficulty
  useEffect(() => {
    axios
      .get("https://trivia-tdp-backend.herokuapp.com/difficulty/all")
      .then((res) => {
        var dif = [];
        res.data.forEach((e) => {
          dif.push({ label: e.difficulty });
        });
        setDifficulty(dif);
      })
      .catch((err) => {
        console.log(err);
        setSnackbarSeverity("error");
        setSnackbarMessage(err.message);
        setOpenSnackbar(true);
      });
  }, []);

  //useEffect de category
  useEffect(() => {
    var cat = [];
    categories.forEach((e) => {
      cat.push({ label: e.category });
    });
    setCategory(cat);
  }, [categories]);

  const onSubmit = () => {
    //Warning si faltan seleccionar datos
    if (
      questionSettings.category === "" ||
      questionSettings.difficulty === "" ||
      questionSettings.quantity === "" ||
      questionSettings.source === ""
    ) {
      setSnackbarSeverity("warning");
      setSnackbarMessage("Faltan seleccionar datos");
      setOpenSnackbar(true);
      return;
    }
    // Cerrar el dialog y hacer el promise para traer las preguntas con las questionSettings
    axios
      .put(
        "https://trivia-tdp-backend.herokuapp.com/question",
        questionSettings
      )
      .then((res) => {
        setSnackbarSeverity("success");
        setSnackbarMessage(res.data);
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.log(err);
        setSnackbarSeverity("error");
        setSnackbarMessage(err.message);
        setOpenSnackbar(true);
      });
    setReload(true);
    setDialogOpen(false);
  };

  return (
    <Grid container width={400}>
      <Grid item xs={12} marginBottom={2}>
        <Autocomplete
          fullWidth
          id="category-autocomplete"
          options={category}
          value={questionSettings.category}
          clearIcon={false}
          freeSolo={false}
          renderInput={(params) => <TextField {...params} label="Categoria" />}
          onChange={(e, newValue) => {
            setQuestionSettings({
              ...questionSettings,
              category: newValue.label,
            });
          }}
        />
      </Grid>
      <Grid item xs={12} marginBottom={2}>
        <Autocomplete
          fullWidth
          id="difficulty-autocomplete"
          options={difficulty}
          value={questionSettings.difficulty}
          clearIcon={false}
          freeSolo={false}
          renderInput={(params) => <TextField {...params} label="Dificultad" />}
          onChange={(e, newValue) => {
            setQuestionSettings({
              ...questionSettings,
              difficulty: newValue.label,
            });
          }}
        />
      </Grid>
      <Grid item xs={12} marginBottom={2}>
        <Autocomplete
          fullWidth
          id="quantity-autocomplete"
          options={quantity}
          value={questionSettings.quantity}
          clearIcon={false}
          freeSolo={false}
          renderInput={(params) => <TextField {...params} label="Cantidad" />}
          onChange={(e, newValue) => {
            setQuestionSettings({
              ...questionSettings,
              quantity: newValue.label,
            });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          fullWidth
          id="source-autocomplete"
          options={sourceOptions}
          value={questionSettings.source}
          clearIcon={false}
          freeSolo={false}
          renderInput={(params) => <TextField {...params} label="Source" />}
          onChange={(e, newValue) => {
            setQuestionSettings({
              ...questionSettings,
              source: newValue.label,
            });
          }}
        />
      </Grid>
      <Grid item xs={12} marginTop={1}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <IconButton variant="contained" fullWidth onClick={onSubmit}>
            <CheckIcon color="action" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
