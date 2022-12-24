import React, { useState, useEffect, useContext } from "react";
import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { LayoutContextProvider } from "../../context/LayoutContext";

export default function TriviaFinish(props) {
  const {
    finished,
    userAnswers,
    questions,
    elapsedTime,
    triviaTime,
    dialogClose,
    triviaSettings,
  } = props;
  const { userID, setSnackbarSeverity, setSnackbarMessage, setOpenSnackbar } =
    useContext(LayoutContextProvider);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const calculateScore = () => {
    let correct = 0;
    let difFactor = 1;
    let timeFactor = 1;
    let quantity = parseInt(triviaSettings.quantity);

    // cantidad de respuestas correctas
    for (var j = 0; j < quantity; j++) {
      const length = questions[j].Answer.length;

      for (var k = 0; k < length; k++) {
        if (
          questions[j].Answer[k].correct === true &&
          questions[j].Answer[k].answer === userAnswers[j]
        ) {
          correct = correct + 1;
        }
      }
    }
    setCorrectAnswers(correct);

    // Factor dificultad
    switch (triviaSettings.difficulty) {
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
    if (elapsedTime / quantity < 5) {
      timeFactor = 5;
    } else if (elapsedTime / quantity < 20) {
      timeFactor = 3;
    } else {
      timeFactor = 1;
    }

    setScore((correct / quantity) * difFactor * timeFactor);
  };

  //Al finalizar calculamos el puntaje
  useEffect(() => {
    if (finished) {
      calculateScore();
    }
  }, [finished]);

  const onSubmit = async () => {
    dialogClose();
    await axios
      .post("http://localhost:4000/trivia/create", {
        score: score,
        triviaTime: elapsedTime,
        timeAvailable: triviaTime,
        userAnswers: userAnswers,
        userId: userID,
        Questions: questions,
      })
      .then((data) => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Se guardo su resultado correctamente.");
        setOpenSnackbar(true);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setSnackbarSeverity("error");
        setSnackbarMessage(error.message);
        setOpenSnackbar(true);
      });
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
          <b>{score.toFixed(2)}</b>
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
