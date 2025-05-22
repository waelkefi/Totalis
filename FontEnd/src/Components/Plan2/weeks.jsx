// WeekSelector.jsx
import React from "react";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const WeekSelector = ({ date, onDateChange }) => {
  // Calculer le début et la fin de la semaine
  const startOfWeek = date.startOf("week"); // par défaut, commence le dimanche
  const endOfWeek = startOfWeek.add(6, "day");

  // Pour naviguer
  const handlePrevWeek = () => {
    onDateChange(date.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    onDateChange(date.add(1, "week"));
  };

  return (
    <div style={styles.container}>
      <Button onClick={handlePrevWeek}>
        <ArrowBackIosNewIcon />
      </Button>
      <div style={styles.text}>
        {startOfWeek.format("DD MMM")} - {endOfWeek.format("DD MMM")}
      </div>
      <Button onClick={handleNextWeek}>
        <ArrowForwardIosIcon />
      </Button>
    </div>
  );
};

export default WeekSelector;

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "300px",
    margin: "0 auto",
  },
  text: {
    margin: "0 16px",
    fontSize: "20px",
  },
};
