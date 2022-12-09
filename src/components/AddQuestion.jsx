import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

const quantity = [
  { label: "10" },
  { label: "20" },
  { label: "30" },
  { label: "40" },
  { label: "50" },
];

export default function AddQuestion(props) {
  const { categories, setDialogOpen } = props;
  const [questionSettings, setQuestionSettings] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [category, setCategory] = useState([]);

  //useEffect de difficulty
  useEffect(() => {
    axios
      .get("http://localhost:4000/difficulty/all")
      .then((res) => {
        var dif = [];
        res.data.forEach((e) => {
          dif.push({ label: e.difficulty });
        });
        setDifficulty(dif);
      })
      .catch((err) => {
        console.log(err);
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

  //TODO: falta hacer
  const onSubmit = () => {
    // Cerrar el dialog y hacer el promise para traer las preguntas con las questionSettings
    console.log("agregar preguntas");
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
        {/* Agregar una opcion de cantidad de preguntas */}
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
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid item xs={3}>
          <Button variant="contained" fullWidth onClick={onSubmit}>
            Agregar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
