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

//USER_REGEX El usuario tiene que comenzar con una letra mayus o minus, continuado por letras o numeros o guion bajo, con una longitud de entre 3 a 23 caracteres.
//PWDD_REGEX la pwd tiene que tener minimo una mayuscula, una minuscula, un numero y un caracter especial, teniendo entre 8 a 24 caracteres


//IMPORTANTE
//FALTA CONECTAR EL FRONT CON EL BACK Y CHEQUEAR QUE ANDA TODO OKEY


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[._!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

export default function RegisterPage() {
  const { setHeaderTitle } = useContext(LayoutContextProvider);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [userError, setUserError] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [matchError, setMatchError] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
    setUserError(false);
    setPwdError(false);
    setMatchError(false);
  }, [user, pwd, matchPwd]);

  useEffect(() => {
    setHeaderTitle("Registrar");
  }, [setHeaderTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Datos incorrectos");
      if (!v1) { setUserError(true)}
      if (!v2) {
        setPwdError(true);
      }
      if (!(pwd === matchPwd)) {
        setMatchError(true);
      }
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
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
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Sin respuesta del servidor");
      } else if (err.response?.status === 409) {
        setErrMsg("El nombre de usuario ya esta en uso");
        setUserError(true);
      } else {
        setErrMsg("Fallo en el registro");
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
                ¡Registrado correctamente!
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                gutterBottom
                textAlign={"center"}
              >
                <NavLink
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Inicie sesión
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
                Registro de usuario
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                gutterBottom
                textAlign={"center"}
              >
                Complete los campos para registrarse
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
                      error={userError}
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      helperText={
                        !validName && userFocus
                          ? "El nombre de usuario debe contener de 4 a 24 caracteres y debe comenzar con una letra"
                          : ""
                      }
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
                      error={pwdError}
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      helperText={
                        !validPwd && pwdFocus ? (
                          <p>
                            De 8 a 24 caracteres.
                            <br />
                            Debe incluir mayuscula, minuscula, numero y caracter
                            especial.
                            <br />
                            Se aceptan caracteres especiales:{" "}
                            <span aria-label="dot">.</span>{" "}
                            <span aria-label="under score">_</span>{" "}
                            <span aria-label="exclamation mark">!</span>{" "}
                            <span aria-label="at symbol">@</span>{" "}
                            <span aria-label="hashtag">#</span>{" "}
                            <span aria-label="dollar sign">$</span>{" "}
                            <span aria-label="percent">%</span>
                          </p>
                        ) : (
                          ""
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      id="confirm_pwd"
                      placeholder="Repetir contraseña"
                      label="Repetir contraseña"
                      variant="outlined"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      value={matchPwd}
                      fullWidth
                      required
                      error={matchError}
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                      helperText={
                        !validMatch && matchFocus
                          ? "Las contraseñas no coinciden"
                          : ""
                      }
                    />
                  </Grid>
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
                      ¿Ya posee una cuenta?{" "}
                      <NavLink
                        to="/login"
                        style={{ textDecoration: "none", color: "blue" }}
                      >
                        INICIE SESIÓN AQUI
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
