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
import Trivia from "../components/Trivia";
import { questionsHardCode } from "../hardcode/QuestionHardCode";

//Datos Hardcodeados
const category = [
  { label: "Deporte" },
  { label: "Alimentos" },
  { label: "Ocio" },
  { label: "Juegos" },
  { label: "Peliculas" },
  { label: "Animales" },
];

const dificulty = [
  { label: "Facil" },
  { label: "Medio" },
  { label: "Dificil" },
];

const quantity = [
  { label: "10" },
  { label: "15" },
  { label: "20" },
];

const initialTriviaSettings = {category: "Deporte", dificulty: "Facil", quantity: "10"}

export default function TriviaPage() {
  const { setHeaderTitle } = useContext(LayoutContextProvider);
  const [triviaSettings, setTriviaSettings] = useState(initialTriviaSettings);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    setHeaderTitle("Trivia");
  }, [setHeaderTitle]);

  const handleClickOpen = () => {
    //iniciar los datos del trivia aca
    
    setDialogOpen(true);
  }

    const increaseCurrent = () => {
      if(currentQuestion < parseInt(triviaSettings.quantity)){
        setCurrentQuestion(currentQuestion + 1);
      } else
      // el codigo para finalizar el test
      {

      }

    };

  return (
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
                id="dificulty-autocomplete"
                options={dificulty}
                value={triviaSettings.dificulty}
                clearIcon={false}
                freeSolo={false}
                renderInput={(params) => (
                  <TextField {...params} label="Dificultad" />
                )}
                onChange={(e, newValue) => {
                  setTriviaSettings({
                    ...triviaSettings,
                    dificulty: newValue.label,
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
                onClick={handleClickOpen}
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Comenzar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      <FullScreenDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        modalTitle={
          "CATEGORIA: " +
          triviaSettings.category +
          " - DIFICULTAD: " +
          triviaSettings.dificulty +
          " - PREGUNTA: " +
          currentQuestion +
          "/" +
          triviaSettings.quantity
        }
      >
        <Trivia questions={questionsHardCode} increaseCurrentQuestion={increaseCurrent} currentQuestion={currentQuestion} quantity={triviaSettings.quantity}></Trivia>
      </FullScreenDialog>
    </Grid>
  );
}
