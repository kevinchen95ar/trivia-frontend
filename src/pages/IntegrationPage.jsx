import React, { useState, useEffect, useContext } from "react";
import { LayoutContextProvider } from "./../context/LayoutContext";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Grid, Paper, Typography } from "@mui/material";
import CustomizedDialog from "../components/dialog/Dialog";
import AddQuestion from "../components/AddQuestion";
import AddCategory from "../components/AddCategory";
import UnauthorizedPage from "./UnauthorizedPage";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import PostAddIcon from "@mui/icons-material/PostAdd";

const categoryColumns = [
  { field: "id", headerName: "ID" },
  {
    field: "category",
    headerName: "Categoria",
    flex: 1,
  },
];

const showCategoryColumns = { id: false, category: true };

const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "category",
    headerName: "Categoria",
    flex: 1,
  },
  {
    field: "difficulty",
    headerName: "Dificultad",
    flex: 1,
  },
  { field: "quantity", headerName: "Cantidad de preguntas", flex: 1 },
];

const showColumns = {
  id: false,
  category: true,
  dificulty: true,
  quantity: true,
};

export default function IntegrationPage() {
  const { setHeaderTitle, loggedIn, loggedInRole } = useContext(
    LayoutContextProvider
  );
  const [categoryPageSize, setCategoryPageSize] = useState(10);
  const [questionPageSize, setQuestionPageSize] = useState(10);
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [addQuestionDialogOpen, setAddQuestionDialogOpen] = useState(false);
  const [categoryRows, setCategoryRows] = useState([]);
  const [reloadCategory, setReloadCategory] = useState(true);
  const [questionRows, setQuestionRows] = useState([]);
  const [reloadQuestion, setReloadQuestion] = useState(true);

  useEffect(() => {
    setHeaderTitle("Integraciones");
  }, [setHeaderTitle]);

  useEffect(() => {
    if (reloadCategory) {
      //Obtenemos todas las categorias en caso de que se necesite recargar
      axios
        .get("http://localhost:4000/category")
        .then((res) => {
          setCategoryRows(res.data);
          setReloadCategory(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reloadCategory]);

  useEffect(() => {
    if (reloadQuestion) {
      //Obtenemos todas las preguntas disponibles por cantidad en caso de que se necesite recargar
      axios
        .get("http://localhost:4000/question/all")
        .then((res) => {
          setQuestionRows(res.data);
          setReloadQuestion(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reloadQuestion]);

  return (
    <React.Fragment>
      {loggedIn &&
      (loggedInRole === "Administrador" || loggedInRole === "Editor") ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 360,
              }}
            >
              <Grid
                marginBottom={2}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={10}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Categorias disponibles
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <IconButton
                      variant="contained"
                      fullWidth
                      onClick={() => setAddCategoryDialogOpen(true)}
                    >
                      <RefreshIcon />
                    </IconButton>
                    <CustomizedDialog
                      setDialogOpen={setAddCategoryDialogOpen}
                      dialogOpen={addCategoryDialogOpen}
                      modalTitle={"Actualizar categorias"}
                    >
                      <AddCategory
                        setDialogOpen={setAddCategoryDialogOpen}
                        setReload={setReloadCategory}
                      ></AddCategory>
                    </CustomizedDialog>
                  </Grid>
                </Grid>
              </Grid>
              <Grid style={{ height: 300, width: "100%" }}>
                <DataGrid
                  rows={categoryRows}
                  columns={categoryColumns}
                  pageSize={categoryPageSize}
                  onPageSizeChange={(newPageSize) =>
                    setCategoryPageSize(newPageSize)
                  }
                  rowsPerPageOptions={[10, 50, 100]}
                  columnVisibilityModel={showCategoryColumns}
                />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Grid
                marginBottom={2}
                marginRight={2}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={10}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Preguntas disponibles
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <IconButton
                      onClick={() => setAddQuestionDialogOpen(true)}
                      variant="contained"
                      fullWidth
                    >
                      <PostAddIcon />
                    </IconButton>
                    <CustomizedDialog
                      setDialogOpen={setAddQuestionDialogOpen}
                      dialogOpen={addQuestionDialogOpen}
                      modalTitle={"Agregar preguntas"}
                    >
                      <AddQuestion
                        categories={categoryRows}
                        setDialogOpen={setAddQuestionDialogOpen}
                      ></AddQuestion>
                    </CustomizedDialog>
                  </Grid>
                </Grid>
              </Grid>
              <Grid style={{ height: 320, width: "100%" }}>
                <DataGrid
                  rows={questionRows}
                  columns={columns}
                  pageSize={questionPageSize}
                  onPageSizeChange={(newPageSize) =>
                    setQuestionPageSize(newPageSize)
                  }
                  rowsPerPageOptions={[10, 50, 100]}
                  columnVisibilityModel={showColumns}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <UnauthorizedPage></UnauthorizedPage>
      )}
    </React.Fragment>
  );
}
