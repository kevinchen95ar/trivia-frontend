import React, { useState, useEffect } from "react";
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
    stopTimer,
    questionQuantity,
    questions,
    setUserAnswers,
  } = props;
  const [answerSelected, setAnswerSelected] = useState("");
  const [answers, setAnswers] = useState([]);

  const mixAnswers = () => {
    // Creamos un array con todas las respuestas
    var respuestas = JSON.parse(
      JSON.stringify(questions[currentQuestion.current - 1].Answer)
    );

    // Creamos un array con solo el dato de la respuesta
    var soloRespuestas = [];
    for (var i = 0; i < respuestas.length; i++) {
      soloRespuestas.push(respuestas[i].answer);
    }

    // tomamos un item randomico del array y lo vamos colocando en las respuestas mezcladas
    var mixedAnswers = [];
    const length = soloRespuestas.length;
    for (var j = 0; j < length; j++) {
      var k = Math.floor(Math.random() * soloRespuestas.length);
      var item = soloRespuestas[k];
      mixedAnswers.push(item);
      soloRespuestas.splice(k, 1);
    }

    setAnswers(mixedAnswers);
  };

  const onNext = () => {
    if (!answerSelected) {
      return;
    }
    setUserAnswers((p) => [...p, answerSelected]);
    setAnswerSelected("");
    currentQuestion.current = currentQuestion.current + 1;
    mixAnswers();
  };

  const onFinish = () => {
    if (!answerSelected) {
      return;
    }
    setUserAnswers((p) => [...p, answerSelected]);
    setAnswerSelected("");
    setFinished(true);
    stopTimer();
  };

  useEffect(() => {
    if (questions) {
      mixAnswers();
      console.log(questions);
    }
  }, [questions]);

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
              {questions[currentQuestion.current - 1].question}
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        {questions[currentQuestion.current - 1].questionType === "boolean" ? (
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
        {!(parseInt(questionQuantity) === currentQuestion.current) ? (
          <Button variant="contained" onClick={onNext}>
            Siguiente
          </Button>
        ) : (
          <Button variant="contained" onClick={onFinish}>
            Finalizar
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
