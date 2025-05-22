import React from "react";
import { Button } from "react-bootstrap";

const YearSelector = ({ date, onDateChange }) => {
  const handlePrevYear = () => {
    onDateChange(date.subtract(1, "year"));
  };

  const handleNextYear = () => {
    onDateChange(date.add(1, "year"));
  };

  return (
    <div className="curstum-card d-flex align-items-center justify-content-center" style={{height:"50px"}}>
      <button className="custum-btn"   onClick={handlePrevYear}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5.99988C15 5.99988 9.00001 10.4188 9 11.9999C8.99999 13.581 15 17.9999 15 17.9999" stroke="#15133A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </button>
      <div style={{color:"#2E2E38", fontSize:"20px", fontWeight:'600',margin:"0 8px"}}>{date.format("YYYY")}</div>
      <button className="custum-btn" onClick={handleNextYear}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="#15133A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </button>
    </div>
  );
};

export default YearSelector;
