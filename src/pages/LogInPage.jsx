import { useState, useEffect, useContext } from "react";
import { LayoutContextProvider } from "./../context/LayoutContext";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "../api/axios";
import { NavLink } from "react-router-dom";

const LOGIN_URL = "/login";

export default function LogInPage() {
  const { setHeaderTitle } = useContext(LayoutContextProvider);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(() => {
    setHeaderTitle("Iniciar Sesión");
  }, [setHeaderTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
   
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));

      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sin respuesta del servidor.");
      } else {
        setErrMsg("Credenciales incorrectas.");
      }
    }
  };

  return (
    <>
      {success ? (
        <Grid>
          <Card
            style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <Typography textAlign={"center"} gutterBottom variant="h5">
                ¡Inicio de sesion correcto!
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                gutterBottom
                textAlign={"center"}
              >
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Haga click aqui
                </NavLink>{" "}
                para continuar
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        <Grid>
          <Card
            style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <Typography textAlign={"center"} gutterBottom variant="h4">
                Iniciar Sesión
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                gutterBottom
                textAlign={"center"}
              >
                Ingrese sus credenciales para continuar
              </Typography>

              {errMsg !== "" ? (
                <Grid item marginBottom={1} marginTop={1}>
                  <Typography
                    style={{
                      backgroundColor: "maroon",
                      color: "white",
                      borderRadius: "5px",
                    }}
                    variant="h6"
                    gutterBottom
                    textAlign={"center"}
                  >
                    {errMsg}
                  </Typography>
                </Grid>
              ) : (
                ""
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item marginTop={1} xs={12}>
                    <TextField
                      placeholder="Ingresa un usuario "
                      label="Nombre de usuario"
                      variant="outlined"
                      type="text"
                      id="username"
                      autoComplete="off"
                      fullWidth
                      required
                      autofocus
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      id="password"
                      placeholder="Contraseña"
                      label="Contraseña"
                      variant="outlined"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Confirmar
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      gutterBottom
                      textAlign={"center"}
                    >
                      ¿No tiene una cuenta?{" "}
                      <NavLink
                        to="/register"
                        style={{ textDecoration: "none", color: "blue" }}
                      >
                        REGISTRESE AQUÍ
                      </NavLink>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
}
