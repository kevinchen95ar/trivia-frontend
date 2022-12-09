import React, { useMemo, useState, useEffect } from "react";
import {
  Typography,
  Button,
  Grid,
  FormControlLabel,
  Divider,
  Radio,
  RadioGroup,
} from "@mui/material";

export default function TriviaExam(props) {
  const {
    setFinished,
    currentQuestion,
    setCurrentQuestion,
    stopTimer,
    questionQuantity,
    questions,
    setUserAnswers,
  } = props;
  const [answerSelected, setAnswerSelected] = useState("");
  const [answers, setAnswers] = useState([]);

  const triviaFinish = () => {
    setFinished(true);
    stopTimer();
  };

  const lastQuestion = useMemo(() => {
    if (parseInt(questionQuantity) === currentQuestion) {
      return true;
    }
    return false;
  }, [questionQuantity, currentQuestion]);

  // TODO: No anda bien el tema de las respuestas, arranca aca

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

  const onNext = () => {
    if (!answerSelected) {
      return;
    }

    setUserAnswers((p) => [...p, answerSelected]);
    setAnswerSelected("");
    mixAnswers();
    setCurrentQuestion((prev) => prev + 1);
  };

  useEffect(() => {
    if (questions) {
      mixAnswers();
    }
  }, [questions]);

  //TODO: HASTA ACA

  return (
    <Grid>
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

        <Divider />

        {questions[currentQuestion - 1].type === "boolean" ? (
          <Grid item textAlign={"left"} xs={12} style={{ margin: "20px" }}>
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
            <Grid item textAlign={"left"} xs={12} style={{ margin: "20px" }}>
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
      </Grid>

      {/* BOTON NEXT O FINALIZAR */}
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
      >
        {!lastQuestion ? (
          <Button variant="contained" onClick={onNext}>
            Siguiente
          </Button>
        ) : (
          <Button variant="contained" onClick={triviaFinish}>
            Finalizar
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
