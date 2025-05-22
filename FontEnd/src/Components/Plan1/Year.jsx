// YearSelector.jsx
import React from "react";
import { Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const YearSelector = ({ date, onDateChange }) => {
  const handlePrevYear = () => {
    onDateChange(date.subtract(1, "year"));
  };

  const handleNextYear = () => {
    onDateChange(date.add(1, "year"));
  };

  return (
    <div style={styles.container}>
      <Button onClick={handlePrevYear}>
        <ArrowBackIosNewIcon />
      </Button>
      <div style={styles.text}>
        {date.format("YYYY")}
      </div>
      <Button onClick={handleNextYear}>
        <ArrowForwardIosIcon />
      </Button>
    </div>
  );
};

export default YearSelector;

// Style minimal
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
  },
};
