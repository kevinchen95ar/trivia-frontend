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
import axios from "axios";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function LogInPage() {
  const { setHeaderTitle, setLoggedIn, setLoggedInRole, setUserID } =
    useContext(LayoutContextProvider);

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

    try {
      //Peticion de inicio de sesión
      const response = await axios.post("http://localhost:4000/login", {
        username: user,
        password: pwd,
      });

      //Inicio de sesion exitoso.

      //guardamos el token en el localstorage
      localStorage.setItem("token", response.data.token);
      //destructuramos el token y sacamos el role para colocarlo en el context
      const decoded = jwt_decode(response.data.token);
      setLoggedInRole(decoded.role);
      setLoggedIn(true);
      setUserID(decoded.user);
      setSuccess(true);

      //limpieza de states e inputs
      setUser("");
      setPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sin respuesta del servidor.");
      } else if (err.response?.status === 401) {
        setErrMsg(err.response.data);
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
