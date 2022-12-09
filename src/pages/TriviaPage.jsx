import React, { useEffect, useContext, useState } from "react";
import {
  Autocomplete,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LayoutContextProvider } from "./../context/LayoutContext";
import FullScreenDialog from "../components/dialog/FullScreenDialog";
import TriviaOLD from "../components/TriviaOLD";
import TriviaDialog from "../components/trivia/TriviaDialog";

import UnauthorizedPage from "./UnauthorizedPage";

//Datos Hardcodeados
const category = [
  { label: "Deporte" },
  { label: "Alimentos" },
  { label: "Ocio" },
  { label: "Juegos" },
  { label: "Peliculas" },
  { label: "Animales" },
];

const difficulty = [{ label: "easy" }, { label: "medium" }, { label: "hard" }];

const quantity = [{ label: "10" }, { label: "15" }, { label: "20" }];

const initialTriviaSettings = {
  category: "Deporte",
  difficulty: "easy",
  quantity: "10",
};

export default function TriviaPage() {
  const { setHeaderTitle, loggedIn } = useContext(LayoutContextProvider);

  // trivia
  const [triviaSettings, setTriviaSettings] = useState(initialTriviaSettings);
  const [dialogOpen, setDialogOpen] = useState(false);

  // const [currentQuestion, setCurrentQuestion] = useState(1);
  // const [reload, setReload] = useState(true);
  // const [finished, setFinished] = useState(false);
  // const [timeLeft, setTimeLeft] = useState(0);
  // const [triviaTime, setTriviaTime] = useState(0);

  useEffect(() => {
    setHeaderTitle("Trivia");
  }, [setHeaderTitle]);

  // const calculateTriviaTime = (dif, qua) => {
  //   let time = 0;
  //   switch (dif) {
  //     case "easy":
  //       time = 30 * qua;
  //       break;
  //     case "medium":
  //       time = 45 * qua;
  //       break;
  //     case "hard":
  //       time = 60 * qua;
  //       break;
  //     default:
  //       time = 0 * qua;
  //       break;
  //   }
  //   setTriviaTime(time);
  //   setTimeLeft(time);
  // };

  // const formatTime = (time) => {
  //   let hours = Math.floor((time / (60 * 60)) % 24);
  //   let minutes = Math.floor((time / 60) % 60);
  //   let seconds = Math.floor(time % 60);
  //   let formattedHours = "";
  //   let formattedMinutes = "";
  //   let formattedSeconds = "";

  //   if (hours < 10) {
  //     formattedHours = "0" + hours;
  //   } else {
  //     formattedHours = hours;
  //   }
  //   if (minutes < 10) {
  //     formattedMinutes = "0" + minutes;
  //   } else {
  //     formattedMinutes = minutes;
  //   }
  //   if (seconds < 10) {
  //     formattedSeconds = "0" + seconds;
  //   } else {
  //     formattedSeconds = seconds;
  //   }
  //   let formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} `;
  //   return formattedTime;
  // };

  // const handleClickOpen = () => {
  //   //iniciar los datos del trivia aca
  //   calculateTriviaTime(triviaSettings.difficulty, triviaSettings.quantity);
  //   setDialogOpen(true);
  // };

  // const increaseCurrent = () => {
  //   if (currentQuestion < parseInt(triviaSettings.quantity)) {
  //     setCurrentQuestion(currentQuestion + 1);
  //   }
  //   // el codigo para finalizar el test
  //   else {
  //   }
  // };

  // useEffect(() => {
  //   if (reload) {
  //     setCurrentQuestion(1);
  //     setTriviaSettings(initialTriviaSettings);
  //     setFinished(false);
  //     setReload(false);
  //   }
  // }, [reload]);

  // useEffect(() => {
  //   if (timeLeft > 0 && !finished) {
  //     setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  //   }
  // }, [timeLeft, finished]);
  return (
    <React.Fragment>
      {loggedIn ? (
        <Grid>
          <Card
            style={{
              height: 500,
              width: 600,
              padding: "20px 5px",
              margin: "0 auto",
            }}
          >
            <Grid container>
              <Grid textAlign={"center"} item xs={12}>
                <Typography
                  component="h2"
                  variant="h3"
                  color="primary"
                  gutterBottom
                >
                  Trivia
                </Typography>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid item xs={11} marginTop={3} marginBottom={1}>
                  <Autocomplete
                    fullWidth
                    id="category-autocomplete"
                    options={category}
                    value={triviaSettings.category}
                    clearIcon={false}
                    freeSolo={false}
                    renderInput={(params) => (
                      <TextField {...params} label="Categoria" />
                    )}
                    onChange={(e, newValue) => {
                      setTriviaSettings({
                        ...triviaSettings,
                        category: newValue.label,
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid item xs={11} marginTop={3} marginBottom={1}>
                  <Autocomplete
                    fullWidth
                    id="difficulty-autocomplete"
                    options={difficulty}
                    value={triviaSettings.difficulty}
                    clearIcon={false}
                    freeSolo={false}
                    renderInput={(params) => (
                      <TextField {...params} label="Dificultad" />
                    )}
                    onChange={(e, newValue) => {
                      setTriviaSettings({
                        ...triviaSettings,
                        difficulty: newValue.label,
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid item xs={11} marginTop={3} marginBottom={4}>
                  <Autocomplete
                    fullWidth
                    id="quantity-autocomplete"
                    options={quantity}
                    value={triviaSettings.quantity}
                    clearIcon={false}
                    freeSolo={false}
                    renderInput={(params) => (
                      <TextField {...params} label="Cantidad" />
                    )}
                    onChange={(e, newValue) => {
                      setTriviaSettings({
                        ...triviaSettings,
                        quantity: newValue.label,
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item xs={11}>
                  <Button
                    onClick={() => setDialogOpen(true)}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Confirmar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>

          <TriviaDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            triviaSettings={triviaSettings}
          />

          {/* <FullScreenDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            modalTitle={`PREGUNTA: ${currentQuestion}/${
              triviaSettings.quantity
            } - TIEMPO RESTANTE: ${formatTime(timeLeft)}`}
          >
            <TriviaOLD
              questions={questionsHardCode}
              increaseCurrentQuestion={increaseCurrent}
              currentQuestion={currentQuestion}
              quantity={parseInt(triviaSettings.quantity)}
              setReload={setReload}
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
              finished={finished}
              setFinished={setFinished}
              timeLeft={timeLeft}
              triviaTime={triviaTime}
              triviaSettings={triviaSettings}
            />
          </FullScreenDialog> */}
        </Grid>
      ) : (
        <UnauthorizedPage></UnauthorizedPage>
      )}
    </React.Fragment>
  );
}
