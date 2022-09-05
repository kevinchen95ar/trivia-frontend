import React, { useState, useEffect, useContext } from "react";
import { LayoutContextProvider } from "./../context/LayoutContext";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { rows, categoryRows } from "../hardcode/IntegrationHardCode";
import CustomizedDialog from "../components/dialog/Dialog";
import AddQuestion from "../components/AddQuestion";
import AddCategory from "../components/AddCategory";

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
  const { setHeaderTitle } = useContext(LayoutContextProvider);
  const [categoryPageSize, setCategoryPageSize] = useState(10);
  const [questionPageSize, setQuestionPageSize] = useState(10);
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [addQuestionDialogOpen, setAddQuestionDialogOpen] = useState(false);

  useEffect(() => {
    setHeaderTitle("Integraciones");
  }, [setHeaderTitle]);

  return (
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
                Categorias disponibles
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setAddCategoryDialogOpen(true)}
              >
                + CATEGORIA
              </Button>
              <CustomizedDialog
                setDialogOpen={setAddCategoryDialogOpen}
                dialogOpen={addCategoryDialogOpen}
                modalTitle={"Actualizar categorias"}
              >
                <AddCategory></AddCategory>
              </CustomizedDialog>
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
              <Button
                onClick={() => setAddQuestionDialogOpen(true)}
                variant="contained"
                fullWidth
              >
                + Preguntas
              </Button>
              <CustomizedDialog
                setDialogOpen={setAddQuestionDialogOpen}
                dialogOpen={addQuestionDialogOpen}
                modalTitle={"Agregar preguntas"}
              >
                <AddQuestion></AddQuestion>
              </CustomizedDialog>
            </Grid>
          </Grid>
          <Grid style={{ height: 320, width: "100%" }}>
            <DataGrid
              rows={rows}
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
  );
}
