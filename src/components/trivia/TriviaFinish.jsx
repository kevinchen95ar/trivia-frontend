import React, { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";

export default function TriviaFinish(props) {
  const {
    finished,
    userAnswers,
    questions,
    quantity,
    elapsedTime,
    dialogClose,
  } = props;
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const calculateScore = () => {
    let correct = 0;
    let difFactor = 1;
    let timeFactor = 1;
    let quan = parseInt(quantity);

    // cantidad de respuestas correctas
    for (var j = 0; j < quantity; j++) {
      if (questions[j].correct_answer === userAnswers[j]) {
        correct = correct + 1;
      }
    }
    setCorrectAnswers(correct);
    // Factor dificultad
    switch (questions[5].difficulty) {
      case "easy":
        difFactor = 1;
        break;
      case "medium":
        difFactor = 3;
        break;
      case "hard":
        difFactor = 5;
        break;
      default:
        difFactor = 0;
        break;
    }
    //  Factor tiempo
    if (elapsedTime / quan < 5) {
      timeFactor = 5;
    } else if (elapsedTime / quan < 20) {
      timeFactor = 3;
    } else {
      timeFactor = 1;
    }

    setScore((correct / quan) * difFactor * timeFactor);
  };

  //Al finalizar calculamos el puntaje
  useEffect(() => {
    if (finished) {
      calculateScore();
    }
  }, [finished]);

  const onSubmit = () => {
    dialogClose();
    //TODO: hacer la request para enviar el puntaje a bd
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} marginTop={15} marginBottom={2}>
        <Typography variant="h2">¡Trivia finalizado!</Typography>
      </Grid>
      <Grid item xs={12} marginBottom={2}>
        <Typography variant="h4">Tu puntaje es de:</Typography>
      </Grid>
      <Grid item xs={12} marginBottom={4}>
        <Typography variant="h1">
          <b>{score}</b>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" marginBottom={4}>
          <b>Aciertos: {correctAnswers}</b>
        </Typography>
      </Grid>
      <Grid item xs={12} marginX={2} marginBottom={3}>
        <Typography variant="h6">
          Gracias por participar, haga click para continuar y guardar su
          puntaje.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={onSubmit} variant="contained">
          Continuar
        </Button>
      </Grid>
    </Grid>
  );
}
