import React, { useState, useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { AppBar, Toolbar, Typography, Grid, Card } from "@mui/material";
import TriviaStart from "./TriviaStart";
import TriviaExam from "./TriviaExam";
import TriviaFinish from "./TriviaFinish";
import { questionsHardCode } from "../../hardcode/QuestionHardCode";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TriviaDialog(props) {
  const { dialogOpen, setDialogOpen, triviaSettings } = props;

  // Trivia
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const currentQuestion = useRef(1);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  // time
  const timerId = useRef();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [triviaTime, setTriviaTime] = useState(1);

  //TODO: traer las preguntas con el triviaSettings

  const formatTime = (initialTime, timer) => {
    let time = initialTime - timer;
    if (time < 0) {
      return "00:00:00";
    }

    let hours = Math.floor((time / (60 * 60)) % 24);
    let minutes = Math.floor((time / 60) % 60);
    let seconds = Math.floor(time % 60);
    let formattedHours = "";
    let formattedMinutes = "";
    let formattedSeconds = "";
    if (hours < 10) {
      formattedHours = "0" + hours;
    } else {
      formattedHours = hours;
    }
    if (minutes < 10) {
      formattedMinutes = "0" + minutes;
    } else {
      formattedMinutes = minutes;
    }
    if (seconds < 10) {
      formattedSeconds = "0" + seconds;
    } else {
      formattedSeconds = seconds;
    }
    let formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} `;
    return formattedTime;
  };

  const calculateTriviaTime = (dif, qua) => {
    let time = 0;
    switch (dif) {
      case "easy":
        time = 30 * qua;
        break;
      case "medium":
        time = 45 * qua;
        break;
      case "hard":
        time = 60 * qua;
        break;
      default:
        time = 0 * qua;
        break;
    }
    setTriviaTime(time);
  };

  //TIMER FUNCTIONS
  //Comienza el temporizador
  const startTimer = () => {
    timerId.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };
  //Detiene el temporizador
  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };
  //Reinicia el temporizador
  const resetTimer = () => {
    stopTimer();
    if (elapsedTime) {
      setElapsedTime(0);
    }
  };
  //Finalizar en caso de terminarse el tiempo
  useEffect(() => {
    if (elapsedTime === triviaTime) {
      stopTimer();
      setFinished(true);
    }
  }, [elapsedTime, triviaTime]);

  //cerrar dialog y reiniciar todos los valores
  const dialogClose = () => {
    resetTimer();
    setDialogOpen(false);
    setStarted(false);
    setFinished(false);
    currentQuestion.current = 1;
    setQuestions([]);
    setUserAnswers([]);
  };

  useEffect(() => {
    if (dialogOpen) {
      calculateTriviaTime(triviaSettings.difficulty, triviaSettings.quantity);
      setQuestions(questionsHardCode);
    }
  }, [triviaSettings.difficulty, triviaSettings.quantity, dialogOpen]);

  return (
    <div>
      <Dialog
        aria-labelledby="fullscreen-dialog-title"
        open={dialogOpen}
        onClose={dialogClose}
        TransitionComponent={Transition}
        fullScreen
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={dialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              PREGUNTA: {currentQuestion.current}/{triviaSettings.quantity} -
              TIEMPO RESTANTE: {formatTime(triviaTime, elapsedTime)}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ backgroundColor: "grey", height: "100vh" }}
        >
          <Card
            style={{
              height: "80vh",
              width: "60vw",
              minWidth: "400px",
              minHeight: "600px",
            }}
          >
            {!started ? (
              <TriviaStart
                setStarted={setStarted}
                startTimer={startTimer}
                triviaSettings={triviaSettings}
              />
            ) : !finished ? (
              <TriviaExam
                setFinished={setFinished}
                currentQuestion={currentQuestion}
                stopTimer={stopTimer}
                questionQuantity={triviaSettings.quantity}
                questions={questions}
                setUserAnswers={setUserAnswers}
              />
            ) : (
              <TriviaFinish
                finished={finished}
                quantity={triviaSettings.quantity}
                elapsedTime={elapsedTime}
                dialogClose={dialogClose}
                questions={questions}
                userAnswers={userAnswers}
              />
            )}
          </Card>
        </Grid>
      </Dialog>
    </div>
  );
}
