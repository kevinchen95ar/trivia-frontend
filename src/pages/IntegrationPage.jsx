import React, { useEffect, useContext } from "react";
import { LayoutContextProvider } from "./../context/LayoutContext";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { rows, categoryRows } from "../hardcode/IntegrationHardCode";

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
  const [pageSize, setPageSize] = React.useState(10);

  useEffect(() => {
    setHeaderTitle("Integraciones");
  }, [setHeaderTitle]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={10} lg={10}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 360,
          }}
        >
          <Grid marginLeft={2}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Categorias disponibles
            </Typography>
          </Grid>
          <Grid style={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={categoryRows}
              columns={categoryColumns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 50, 100]}
              columnVisibilityModel={showCategoryColumns}
            />
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} md={2} lg={2}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 360,
          }}
        >
          <Grid item xs={12}>
            <Button variant="contained" fullWidth size="large">
              Importar categoria
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth size="large">
              Importar pregunta
            </Button>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Grid marginLeft={2}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Preguntas disponibles
            </Typography>
          </Grid>
          <Grid style={{ height: 320, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 50, 100]}
              columnVisibilityModel={showColumns}
            />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
