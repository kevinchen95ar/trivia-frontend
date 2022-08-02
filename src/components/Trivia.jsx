import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export default function Trivia(props) {
  const {
    currentQuestion,
    questions,
    increaseCurrentQuestion,
    quantity,
    setReload,
    setDialogOpen,
    finished,
    setFinished,
    timeLeft,
    triviaTime,
    triviaSettings,
  } = props;
  const [answers, setAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerSelected, setAnswerSelected] = useState("");
  const [score, setScore] = useState(0);

  const mixAnswers = () => {
    // Creamos un array con todas las respuestas
    var respuestas = questions[currentQuestion - 1].incorrect_answers;
    respuestas.push(questions[currentQuestion - 1].correct_answer);
    if (respuestas.length < 2) {
      return;
    }
    var mixedAnswers = [];
    const k = respuestas.length - 1;
    //tomamos un item randomico del array y lo vamos colocando en las respuestas mezcladas
    //de esta manera obtenemos un array mezclado
    for (var j = 0; j <= k; j++) {
      var i = Math.floor(Math.random() * respuestas.length);
      var item = respuestas[i];
      respuestas.splice(i, 1);
      mixedAnswers.push(item);
    }
    setAnswers(mixedAnswers);
  };

  const calculateScore = () => {
    let correct = 0;
    let difFactor = 1;
    let timeFactor = 1;
    let quan = parseInt(quantity);

    //cantidad de respuestas correctas --OK
    for (var j = 0; j < quantity; j++) {
      if (questions[j].correct_answer === userAnswers[j]) {
        correct = correct + 1;
      }
    }
    //factor dificultad --OK
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
    //factor tiempo --OK
    if ((triviaTime - timeLeft) / quan < 5) {
      timeFactor = 5;
    } else if ((triviaTime - timeLeft) / quan < 20) {
      timeFactor = 3;
    } else {
      timeFactor = 1;
    }
    setScore((correct / quan) * difFactor * timeFactor);
  };

  const onClickNext = () => {
    if (!answerSelected) {
      return;
    }
    let p = userAnswers;
    p.push(answerSelected);
    setUserAnswers(p);
    setAnswerSelected("");

    if (currentQuestion === quantity) {
      calculateScore();
      setFinished(true);
    } else {
      increaseCurrentQuestion();
    }
  };

  const onClickSave = () => {
    //Guardar datos de los resultados del trivia en BD  --TODO

    //Devolvemos los valores a iniciales y cerramos el modal

    //NO FUNCIONAAAAAAA
    setReload(true);
    setDialogOpen(false);
    setScore(0);
    setAnswers([]);
    setUserAnswers([]);
  };

  useEffect(() => {
    if (currentQuestion) {
      mixAnswers();
    }
  }, [currentQuestion]);

  return (
    <>
      <Grid container style={{ backgroundColor: "grey", height: 1000 }}>
        <Card
          style={{
            height: 800,
            width: 800,
            padding: "20px 5px",
            margin: "20px auto",
          }}
        >
          {finished ? (
            <Grid>
              <Grid item textAlign={"center"} xs={12} margin={5}>
                <Typography variant="h3">Resultados del trivia</Typography>
              </Grid>
              <Divider></Divider>
              <Grid item textAlign={"left"} xs={12} margin={5}>
                <Typography variant="h4">
                  Dificultad: {triviaSettings.difficulty}
                </Typography>
              </Grid>
              <Grid item textAlign={"left"} xs={12} margin={5}>
                <Typography variant="h4">
                  Categoria: {triviaSettings.category}
                </Typography>
              </Grid>
              <Grid item textAlign={"left"} xs={12} margin={5}>
                <Typography variant="h4">
                  Cantidad de preguntas: {triviaSettings.quantity}
                </Typography>
              </Grid>
              <Grid item textAlign={"center"} xs={12} margin={5}>
                <Typography fontWeight={"bold"} variant="h4">
                  Puntaje Final: {score}
                </Typography>
              </Grid>
              <Grid container justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={onClickSave}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item textAlign={"center"} xs={12} height={100} margin={5}>
                  <Typography variant="h5">
                    {questions[currentQuestion - 1].question}
                  </Typography>
                </Grid>
              </Grid>
              <Divider></Divider>
              {questions[currentQuestion - 1].type === "boolean" ? (
                <Grid
                  item
                  textAlign={"left"}
                  xs={12}
                  style={{ margin: "20px" }}
                >
                  <RadioGroup
                    name="boolean-quiz"
                    value={answerSelected}
                    onChange={(e) => {
                      setAnswerSelected(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value={answers[0]}
                      control={<Radio />}
                      label={answers[0]}
                    ></FormControlLabel>
                    <FormControlLabel
                      value={answers[1]}
                      control={<Radio />}
                      label={answers[1]}
                    ></FormControlLabel>
                  </RadioGroup>
                </Grid>
              ) : (
                <Grid>
                  <Grid
                    item
                    textAlign={"left"}
                    xs={12}
                    style={{ margin: "20px" }}
                  >
                    <RadioGroup
                      name="multiplechoice-quiz"
                      value={answerSelected}
                      onChange={(e) => {
                        setAnswerSelected(e.target.value);
                      }}
                    >
                      <FormControlLabel
                        value={answers[0]}
                        control={<Radio />}
                        label={answers[0]}
                      ></FormControlLabel>
                      <FormControlLabel
                        value={answers[1]}
                        control={<Radio />}
                        label={answers[1]}
                      ></FormControlLabel>
                      <FormControlLabel
                        value={answers[2]}
                        control={<Radio />}
                        label={answers[2]}
                      ></FormControlLabel>
                      <FormControlLabel
                        value={answers[3]}
                        control={<Radio />}
                        label={answers[3]}
                      ></FormControlLabel>
                    </RadioGroup>
                  </Grid>
                </Grid>
              )}

              <Grid
                container
                direction="column"
                justifyContent="flex-end"
                alignItems="center"
              >
                {currentQuestion === quantity ? (
                  <Button
                    onClick={onClickNext}
                    size="large"
                    variant="contained"
                  >
                    Finalizar
                  </Button>
                ) : (
                  <Button
                    onClick={onClickNext}
                    size="large"
                    variant="contained"
                  >
                    Siguiente
                  </Button>
                )}
              </Grid>
            </Grid>
          )}
        </Card>
      </Grid>
    </>
  );
}
