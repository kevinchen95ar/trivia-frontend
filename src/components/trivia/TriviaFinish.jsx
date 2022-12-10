import React, { useState, useEffect } from "react";

export default function TriviaFinish(props) {
  const {
    finished,
    userAnswers,
    questions,
    quantity,
    elapsedTime,
    dialogClose,
  } = props;
  const [score, setScore] = useState(0);

  const calculateScore = () => {
    let correct = 0;
    let difFactor = 1;
    let timeFactor = 1;
    let quan = parseInt(quantity);

    // cantidad de respuestas correctas
    for (var j = 0; j < quantity; j++) {
      if (questions[j].correct_answer === userAnswers[j]) {
        correct = correct + 1;
      }
    }
    // Factor dificultad
    switch (questions[5].difficulty) {
      case "easy":
        difFactor = 1;
        break;
      case "medium":
        difFactor = 3;
        break;
      case "hard":
        difFactor = 5;
        break;
      default:
        difFactor = 0;
        break;
    }
    //  Factor tiempo
    if (elapsedTime / quan < 5) {
      timeFactor = 5;
    } else if (elapsedTime / quan < 20) {
      timeFactor = 3;
    } else {
      timeFactor = 1;
    }

    setScore((correct / quan) * difFactor * timeFactor);
  };

  //Al finalizar calculamos el puntaje
  useEffect(() => {
    if (finished) {
      calculateScore();
    }
  }, [finished]);

  //TODO: terminar la muestra de puntaje y un boton para guardar
  //TODO: hacer la request para enviar el puntaje a bd

  return <div>{score}</div>;
}
