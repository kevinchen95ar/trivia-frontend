import React, {useState, useEffect} from "react";
import { Button, Card, Divider, Grid, Typography } from "@mui/material";


export default function Trivia(props) {
    const { currentQuestion, questions, increaseCurrentQuestion } = props;

  return (
    <Grid container style={{ backgroundColor: "grey", height: 1000 }}>
      <Card
        style={{
          height: 800,
          width: 800,
          padding: "20px 5px",
          margin: "20px auto",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item textAlign={"center"} xs={12} height={100} margin={5}>
            <Typography variant="h5">
              {questions[currentQuestion - 1].question}
            </Typography>
          </Grid>
        </Grid>
        <Divider></Divider>
        {questions[currentQuestion - 1].type === "boolean" ? (
          <Grid>
            <Grid item textAlign={"left"} xs={12} style={{ margin: "20px" }}>
              Respuesta 1
            </Grid>
            <Grid item textAlign={"left"} xs={12} style={{ margin: "20px" }}>
              Respuesta 2
            </Grid>
          </Grid>
        ) : (
          <Grid>
            <Grid item textAlign={"left"} xs={12} style={{ margin: "20px" }}>
              Respuesta 1
            </Grid>
            <Grid item textAlign={"left"} xs={12} style={{ margin: "20px" }}>
              Respuesta 2
            </Grid>
            <Grid item textAlign={"left"} xs={12} style={{ margin: "20px" }}>
              Respuesta 3
            </Grid>
            <Grid item textAlign={"left"} xs={12} style={{ margin: "20px" }}>
              Respuesta 4
            </Grid>
          </Grid>
        )}

        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            onClick={increaseCurrentQuestion}
            size="large"
            variant="contained"
          >
            Siguiente
          </Button>
        </Grid>
      </Card>
    </Grid>
  );
}
