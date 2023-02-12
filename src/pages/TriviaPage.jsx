import React, { useEffect, useContext, useState } from "react";
import {
  Autocomplete,
  Button,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LayoutContextProvider } from "./../context/LayoutContext";
import TriviaDialog from "../components/trivia/TriviaDialog";
import UnauthorizedPage from "./UnauthorizedPage";
import axios from "axios";
import trivialogo from "../assets/triviaLogo.png";

export default function TriviaPage() {
  const {
    setHeaderTitle,
    loggedIn,
    setSnackbarSeverity,
    setSnackbarMessage,
    setOpenSnackbar,
  } = useContext(LayoutContextProvider);

  // trivia
  const initialTriviaSettings = {
    category: "",
    difficulty: "",
    quantity: "",
  };
  const [triviaSettings, setTriviaSettings] = useState(initialTriviaSettings);
  const [settingsAvailable, setSettingsAvailable] = useState([]);

  const [categories, setCategories] = useState([]);
  const [difficulty, setDifficulty] = useState([]);
  const [disabledDifficulty, setDisabledDifficulty] = useState(true);
  const [quantity, setQuantity] = useState([]);
  const [disabledQuantity, setDisabledQuantity] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);

  const onConfirm = () => {
    //Warning si no se seleccionaron todos los datos
    if (
      triviaSettings.category === "" ||
      triviaSettings.difficulty === "" ||
      triviaSettings.quantity === ""
    ) {
      setSnackbarSeverity("warning");
      setSnackbarMessage("Faltan seleccionar datos");
      setOpenSnackbar(true);
      return;
    }
    setDialogOpen(true);
  };

  useEffect(() => {
    // Cada vez que accedemos a la pagina se settea el titulo en trivia y traemos la categoria
    setHeaderTitle("Trivia");
    axios
      .get("https://trivia-tdp-backend.herokuapp.com/question/quantity/all")
      .then((res) => {
        setSettingsAvailable(res.data);
        //Obtenemos las opciones de categorias disponibles
        var cate = [];
        res.data.forEach((e) => {
          if (!cate.includes(e.category)) {
            cate.push(e.category);
          }
        });
        cate.sort();
        setCategories(cate);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setHeaderTitle]);

  useEffect(() => {
    //Las opciones de dificultad dependen de lo disponible en la categoria seleccionada
    if (triviaSettings.category) {
      var dif = [];
      settingsAvailable.forEach((e) => {
        if (e.category === triviaSettings.category) {
          dif.push(e.difficulty);
        }
      });
      setDifficulty(dif);
      setDisabledDifficulty(false);
    } else {
      setDisabledDifficulty(true);
    }
  }, [triviaSettings.category, settingsAvailable]);

  useEffect(() => {
    //Las opciones de cantidad dependen de lo disponible en la dificultad seleccionada
    if (triviaSettings.difficulty) {
      var qua = 0;
      settingsAvailable.forEach((e) => {
        if (
          e.category === triviaSettings.category &&
          e.difficulty === triviaSettings.difficulty
        ) {
          qua = e.quantity;
        }
      });
      var i = 5;
      var newQuantity = [];
      do {
        var str = i.toString();
        newQuantity.push(str);
        qua = qua - 5;
        i = i + 5;
      } while (qua >= 5);
      setQuantity(newQuantity);
      setDisabledQuantity(false);
    } else {
      setDisabledQuantity(true);
    }
  }, [triviaSettings.difficulty, settingsAvailable, triviaSettings.category]);

  return (
    <React.Fragment>
      {loggedIn ? (
        <Grid>
          <Card
            style={{
              height: 540,
              width: 600,
              padding: "20px 5px",
              margin: "0 auto",
            }}
          >
            <Grid container>
              <Grid textAlign={"center"} item xs={12}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={trivialogo}
                  title="trivia logo"
                />
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid item xs={11} marginTop={3} marginBottom={1}>
                  <Autocomplete
                    fullWidth
                    id="category-autocomplete"
                    options={categories}
                    value={triviaSettings.category}
                    clearIcon={false}
                    freeSolo={false}
                    renderInput={(params) => (
                      <TextField {...params} label="Categoria" />
                    )}
                    onChange={(e, newValue) => {
                      setTriviaSettings({
                        ...triviaSettings,
                        category: newValue,
                        difficulty: "",
                        quantity: "",
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid item xs={11} marginTop={3} marginBottom={1}>
                  <Autocomplete
                    disabled={disabledDifficulty}
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
                        difficulty: newValue,
                        quantity: "",
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"}>
                <Grid item xs={11} marginTop={3} marginBottom={4}>
                  <Autocomplete
                    disabled={disabledQuantity}
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
                        quantity: newValue,
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item xs={11}>
                  <Button
                    onClick={onConfirm}
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
        </Grid>
      ) : (
        <UnauthorizedPage></UnauthorizedPage>
      )}
    </React.Fragment>
  );
}
