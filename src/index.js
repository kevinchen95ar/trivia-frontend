import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Rutas from "./rutas";
import NavigationBar from "./layout/NavigationBar";
import LayoutContext from "./context/LayoutContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES } from "@mui/material/locale";


// EL THEME NO FUNCIONAAAAAA, HAY QUE VER POR QUE
const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  esES
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <LayoutContext>
          <NavigationBar>
            <Rutas />
          </NavigationBar>
        </LayoutContext>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);