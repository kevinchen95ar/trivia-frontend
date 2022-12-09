import React, { useState, useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { AppBar, Toolbar, Typography, Grid, Card } from "@mui/material";
import { questionsHardCode } from "../../hardcode/QuestionHardCode";
import TriviaStart from "./TriviaStart";
import TriviaExam from "./TriviaExam";
import TriviaFinish from "./TriviaFinish";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TriviaDialog(props) {
  const { dialogOpen, setDialogOpen, triviaSettings } = props;

  // Trivia
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState(questionsHardCode);
  const [userAnswers, setUserAnswers] = useState([]);

  // time
  const [seconds, setSeconds] = useState(0);
  const timerId = useRef();
  const [triviaTime, setTriviaTime] = useState(0);

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
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  //Para el temporizador
  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  //Reinicia el temporizador
  const resetTimer = () => {
    stopTimer();
    if (seconds) {
      setSeconds(0);
    }
  };

  //cerrar dialog
  const dialogClose = () => {
    resetTimer();
    setDialogOpen(false);
    setStarted(false);
    setFinished(false);
    setCurrentQuestion(1);
  };

  useEffect(() => {
    if (triviaSettings) {
      calculateTriviaTime(triviaSettings.difficulty, triviaSettings.quantity);
    }
  }, [triviaSettings.difficulty, triviaSettings.quantity, triviaSettings]);

  //TODO: traer las preguntas con el triviaSettings

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
              PREGUNTA: {currentQuestion}/{triviaSettings.quantity} - TIEMPO
              RESTANTE: {formatTime(triviaTime, seconds)}
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
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
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
                  setCurrentQuestion={setCurrentQuestion}
                  stopTimer={stopTimer}
                  questionQuantity={triviaSettings.quantity}
                  questions={questions}
                  setUserAnswers={setUserAnswers}
                />
              ) : (
                <TriviaFinish />
              )}
            </Grid>
          </Card>
        </Grid>
      </Dialog>
    </div>
  );
}
// TODO: armar una box para comenzar el trivia q arranque el timer y obtenga las preguntas
