// MonthSelector.jsx
import React from "react";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dayjs from "dayjs";

// Pour afficher les mois en français
import "dayjs/locale/fr";
dayjs.locale("fr");

const MonthSelector = ({ date, onDateChange }) => {
  const handlePrevMonth = () => {
    onDateChange(date.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    onDateChange(date.add(1, "month"));
  };

  return (
    <div style={styles.container}>
      <Button onClick={handlePrevMonth}>
        <ArrowBackIosNewIcon />
      </Button>
      <div style={styles.text}>
        {date.format("MMMM")} {/* ex: janvier, février, etc. */}
      </div>
      <Button onClick={handleNextMonth}>
        <ArrowForwardIosIcon />
      </Button>
    </div>
  );
};

export default MonthSelector;

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
    fontSize: "24px",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
};
