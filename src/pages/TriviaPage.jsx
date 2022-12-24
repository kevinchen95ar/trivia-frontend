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
import TriviaDialog from "../components/trivia/TriviaDialog";
import UnauthorizedPage from "./UnauthorizedPage";
import axios from "axios";

//Datos Hardcodeados

const difficulty = [{ label: "easy" }, { label: "medium" }, { label: "hard" }];

const quantity = [{ label: "10" }, { label: "15" }, { label: "20" }];

export default function TriviaPage() {
  const {
    setHeaderTitle,
    loggedIn,
    setSnackbarSeverity,
    setSnackbarMessage,
    setOpenSnackbar,
  } = useContext(LayoutContextProvider);

  // trivia
  const [triviaSettings, setTriviaSettings] = useState({
    category: "",
    difficulty: "",
    quantity: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const [categories, setCategories] = useState([]);

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
      .get("http://localhost:4000/category")
      .then((res) => {
        var cat = [];
        res.data.forEach((e) => {
          cat.push({ label: e.category });
        });
        setCategories(cat);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setHeaderTitle]);

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
