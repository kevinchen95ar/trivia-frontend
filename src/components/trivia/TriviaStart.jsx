import React from "react";
import { Typography, Button, Grid } from "@mui/material";

export default function TriviaStart(props) {
  const { setStarted, startTimer, triviaSettings } = props;

  const startTrivia = () => {
    setStarted(true);
    startTimer();
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      marginTop={3}
      spacing={2}
    >
      <Grid item>
        <Typography variant="h1"> Trivia</Typography>
      </Grid>
      <Grid item marginX={5}>
        <Typography variant="h5">
          Esta por iniciar un trivia con las siguientes configuraciones:
          <ul>
            <li>
              <b>Categoria:</b> {triviaSettings.category}
            </li>
            <li>
              <b>Dificultad:</b> {triviaSettings.difficulty}
            </li>
            <li>
              <b>Cantidad de preguntas:</b> {triviaSettings.quantity}
            </li>
          </ul>
        </Typography>
      </Grid>
      <Grid item marginX={5} marginY={2}>
        <Typography variant="h6">
          <strong>
            Al iniciar el examen el tiempo situado en la parte superior
            comenzara a correr, el trivia finalizara si completa las preguntas o
            el tiempo caduca. Abandonar el trivia lo cancelara.
          </strong>
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={startTrivia}>
          Iniciar
        </Button>
      </Grid>
    </Grid>
  );
}
