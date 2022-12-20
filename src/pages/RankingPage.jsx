import React, { useState, useEffect, useContext } from "react";
import { LayoutContextProvider } from "./../context/LayoutContext";
import { DataGrid } from "@mui/x-data-grid";
import { Card, Grid, Typography } from "@mui/material";
import axios from "axios";

export default function RankingPage() {
  const { setHeaderTitle } = useContext(LayoutContextProvider);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "score", headerName: "Puntaje", flex: 1 },
    {
      field: "username",
      headerName: "Nombre de usuario",
      valueGetter: (params) => {
        return params.row.User.username;
      },
      flex: 1,
    },
    { field: "triviaDate", headerName: "Fecha", flex: 1 },
    {
      field: "category",
      headerName: "Categoria",
      valueGetter: (params) => {
        return params.row.Question[0].Category.category;
      },
      flex: 1,
    },
    {
      field: "dificulty",
      headerName: "Dificultad",
      valueGetter: (params) => {
        return params.row.Question[0].Difficulty.difficulty;
      },
      flex: 1,
    },
  ];

  const showColumns = {
    id: false,
    score: true,
    username: true,
    date: true,
    category: true,
    dificulty: true,
  };

  const fetchRanking = async () => {
    axios
      .get("http://localhost:4000/trivia/get/all")
      .then((res) => {
        console.log(res.data);
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setHeaderTitle("Ranking");
    fetchRanking();
  }, [setHeaderTitle]);

  return (
    <Card
      style={{
        height: 600,
        minHeight: 400,
        width: "100%",
        minWidth: 400,
        padding: "20px 5px",
        margin: "0 auto",
      }}
    >
      <Grid marginLeft={2}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Ranking de trivia
        </Typography>
      </Grid>
      <Grid style={{ height: 530, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 50, 100]}
          columnVisibilityModel={showColumns}
        />
      </Grid>
    </Card>
  );
}
